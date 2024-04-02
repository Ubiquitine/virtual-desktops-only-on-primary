function log(msg) {
     //print("VDOnPrimary: " + msg);
}

var primaryScreen = readConfig("primaryScreen", "Virtual-1");

function bind(window) {
    window.previousOutput = window.output;
    window.outputChanged.connect(window, update);
    window.desktopsChanged.connect(window, update);
    log("Window " + window.internalId + " has been bound");
}

function update(window) {
    var window = window || this;
    
    if (window.specialWindow || (!window.normalWindow && window.skipTaskbar)) {
        return;
    }

    //var primaryScreen = 0;
    var currentScreen = window.output;
    var previousScreen = window.previousOutput;
    window.previousOutput = currentScreen;

    if (currentScreen.name != primaryScreen) {
        window.onAllDesktops = true;
        log("Window " + window.internalId + " has been pinned");
    } else if (previousScreen.name != primaryScreen){
        window.desktops = [workspace.currentDesktop];
        log("Window " + window.internalId + " has been unpinned");
    }
}

function bindUpdate(window) {
    bind(window);
    update(window);
}

function main() {
    workspace.windowList().forEach(bind);
    workspace.windowList().forEach(update);
    workspace.windowAdded.connect(bindUpdate);
}

main();
