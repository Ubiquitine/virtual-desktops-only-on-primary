function log(msg) {
     //print("VDOnPrimary: " + msg);
}
var busy = false;
var primaryOutputIndex = readConfig("primaryOutputIndex", 0);
var numberOfScreens = readConfig("numberOfScreens", 2);

function bindWindow(window) {
    if (window.specialWindow || (window.normalWindow && window.skipTaskbar) || !window.normalWindow || !window.moveableAcrossScreens) {
        return;
    }
    window.outputChanged.connect(window, updateWindow);
    log("Window " + window.resourceName + ":"  + window.internalId + " has been bound");
}

function updateWindow(window) {
    var window = window || this;
    
    if (window.specialWindow || (window.normalWindow && window.skipTaskbar) || !window.normalWindow || !window.moveableAcrossScreens) {
        return;
    }

    var primaryScreen = workspace.screens[primaryOutputIndex];
    if(primaryScreen == null) {
        log("No defined primary screen is present. Not updating");
        return;
    }
    var currentScreen = window.output;

    if (currentScreen != primaryScreen) {
        window.onAllDesktops = true;
        log("Window " + window.resourceName + ":" + window.internalId + " has been pinned");
    } else if ( window.onAllDesktops ) {
        //window.desktops = [workspace.currentDesktop];
        window.onAllDesktops = false;
        log("Window " + window.resourceName + ":"  + window.internalId + " has been unpinned");
    }
}

function bindUpdate(window) {
    bindWindow(window);
    updateWindow(window);
}

function updateAll() {
    if (busy) {
        return;
    }
    busy = true;
    var primaryScreen = workspace.screens[primaryOutputIndex];
    if(primaryScreen == null) {
        log("Primary display is missing. Not updating.");
        return;
    }
    if (workspace.screens.length < numberOfScreens) {
        log("Not all isplays are present. Not updating");
        return;
    }
    workspace.windowList().forEach(updateWindow);
    busy = false;
}

function update() {
    var timer = new QTimer();
    timer.interval = 100;
    timer.singleShot = true;
    timer.timeout.connect(updateAll);
    timer.start();
}

function main() {
    log("Starting")
    workspace.windowList().forEach(bindWindow);
    update();
    workspace.windowAdded.connect(bindUpdate);
    workspace.screensChanged.connect(update)
}

main();
