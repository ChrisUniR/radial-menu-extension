//background

//get tab

/* async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
} */

chrome.runtime.onMessage.addListener(function(request){
  if (request.name == 'create_tab'){
    chrome.tabs.create({ 
      //url: "https://www.youtube.com" 
    });
  }
});

chrome.runtime.onMessage.addListener(function(request){
  if (request.name == 'close_tab') {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      let currentTab = tabs[0];
      console.log(currentTab);
      chrome.tabs.remove(currentTab.id);
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  let currentWindowId = sender.tab.windowId;
  console.log(currentWindowId);
  if (request.name == 'minimize_window') {
    console.log("minimizing window");
    chrome.windows.update(currentWindowId, { state: 'minimized' })
  }
  return true;
})

//https://stackoverflow.com/questions/32570100/how-to-reload-current-tab-from-within-a-chrome-extension-popup-html

chrome.runtime.onMessage.addListener(function(request) {
  if (request.name == 'refresh_tab') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }
  return true;
});

//https://stackoverflow.com/questions/46285381/change-chrome-tab-with-javascript

chrome.runtime.onMessage.addListener(function(request) {
  if (request.name == 'switch_to_right_tab') {
    console.log("switch to right");
    chrome.tabs.query({currentWindow: true}, function(tabsArray) {
      console.log(tabsArray.length);
      if(tabsArray.length < 2) return;

      let activeTabIndex = null;
      tabsArray.forEach(function (tab, index) {
        if (tab.active === true)
          activeTabIndex = index;
        });
        
      chrome.tabs.update(tabsArray[(activeTabIndex + 1) % tabsArray.length].id, {active: true});
    });
  }
  return true;
});

chrome.runtime.onMessage.addListener(function(request) {
  if (request.name == 'switch_to_left_tab') {
    console.log("switch to left");
    chrome.tabs.query({currentWindow: true}, function(tabsArray) {
      console.log(tabsArray.length);
      if(tabsArray.length < 2) return;

      let activeTabIndex = null;
      tabsArray.forEach(function (tab, index) {
        if (tab.active === true)
          activeTabIndex = index;
      });

      let nextTabIndex = activeTabIndex - 1;
      console.log("nextTabIndex: " + nextTabIndex);
      if (nextTabIndex < 0) {
        nextTabIndex = tabsArray.length - 1;
      }
      console.log("nextTabIndex: " + nextTabIndex);
      
      chrome.tabs.update(tabsArray[(nextTabIndex) % tabsArray.length].id, {active: true});
    });
  }
  return true;
});



chrome.runtime.onMessage.addListener(function(request) {
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
chrome.runtime.onMessage.addListener(function(request, sendResponse) {
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