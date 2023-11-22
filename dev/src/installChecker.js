chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        console.log(`This is a first install of ${chrome.runtime.getManifest().name}!`);
        chrome.storage.local.set({ enabled: true }, function () { });
    }
});