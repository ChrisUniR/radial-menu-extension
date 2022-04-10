//background

//get tab

/* async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
} */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.name == 'mute_tab') {
    
    chrome.tabs.query({}, function(tabs) {
      console.log(tabs);
      for (let i=0; i<tabs.length; i++){
        let tab = tabs[i];
        let tabId = tab.id;
        
        chrome.tabs.get(tabId, async (tab) => {
          let muted = !tab.mutedInfo.muted;
          await chrome.tabs.update(tabId, { muted });
          console.log(`Tab ${tab.id} is ${ muted ? 'muted' : 'unmuted' }`);
        });
      }
    });
  }
  return true;
});

//screencap
//https://louisrli.github.io/blog/2013/01/16/javascript-canvas-screenshot/#.YkyLKihByUl
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.name == 'screenshot') {
      chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {
          sendResponse({ screenshotUrl: dataUrl });
      });  
  }
  return true;
});

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    console.log(current_tab_info.url)
  });
});