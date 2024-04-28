function log(msg) {
     //print("VDOnPrimary: " + msg);
}


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

    const primaryScreen = workspace.screens[0];
    var currentScreen = window.output;
    var previousScreen = window.previousOutput;
    window.previousOutput = currentScreen;

    if (currentScreen != primaryScreen) {
        window.onAllDesktops = true;
        log("Window " + window.internalId + " has been pinned");
    } else if (previousScreen != primaryScreen){
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
