
let queryOptions = { active: true, lastFocusedWindow: true };
let [tab] = await chrome.tabs.query(queryOptions);
const { id, url } = tab;
chrome.scripting.executeScript(
    {
        target: { tabId: id, allFrames: true },
        files: ['/popup/contentScript.js']
    });