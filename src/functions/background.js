//background

//screencap
//https://louisrli.github.io/blog/2013/01/16/javascript-canvas-screenshot/#.YkyLKihByUl
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.name == 'screenshot') {
    console.log("request sent");
      chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {
        console.log(dataUrl);
          sendResponse({ screenshotUrl: dataUrl });
      });  
  }
  return true;
});

/*
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    console.log(current_tab_info.url)
  });
});
*/

let color = '#3aa757';