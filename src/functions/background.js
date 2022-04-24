//background

let activeTabURL = null,
activeTabId = null,
activeTabTitle = null,
activeTabChange = null;


chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, activeTabInfo => {
    activeTabURL = activeTabInfo.url;
    activeTabId = activeTabInfo.id;
    activeTabTitle = activeTabInfo.title;
  });
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab){
    activeTabURL = tab.url;
    activeTabId = tabId;
    activeTabTitle = tab.title;
    activeTabChange = changeInfo;
  }
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.name){
    case "create_tab" : onCreateTab(); break;
    case "close_tab" : onCloseTab(); break;
    case "minimize_window" : onMinimizeWindow(sender); break;
    case "refresh_tab" : onRefreshTab(); break;
    case "switch_to_right_tab" : onSwitchToRightTab(); break;
    case "switch_to_left_tab" : onSwitchToLeftTab(); break;
    case "mute_tab" : onMuteTab(); break;
    case "screenshot" : onScreenshot(sendResponse); break;
    case "toggle_bookmark" : onToggleBookmark(); break;
    case "color_picker" : onColorPicker(sendResponse); break;
    
    default : return;
  }
  return true;
});

function onCreateTab(){
  chrome.tabs.create({ 
    //url: "https://www.youtube.com" 
  });
}

function onCloseTab(){
  chrome.tabs.query({activeWindow: true, active: true}, function(tabs){
    let activeTab = tabs[0];
    console.log(activeTab);
    chrome.tabs.remove(activeTab.id);
  });
}

function onMinimizeWindow(sender){
  let activeWindowId = sender.tab.windowId;
  console.log(activeWindowId);
  chrome.windows.update(activeWindowId, { state: 'minimized' });
}

//https://stackoverflow.com/questions/32570100/how-to-reload-active-tab-from-within-a-chrome-extension-popup-html

function onRefreshTab(){
  chrome.tabs.query({active: true, activeWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}

//https://stackoverflow.com/questions/46285381/change-chrome-tab-with-javascript

function onSwitchToRightTab(){
  chrome.tabs.query({activeWindow: true}, function(tabsArray) {
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

function onSwitchToLeftTab(){
  chrome.tabs.query({activeWindow: true}, function(tabsArray) {
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

function onMuteTab(){
  chrome.tabs.query({}, function(tabs) {
    console.log(tabs);
    for (let i=0; i<tabs.length; i++){
      let tab = tabs[i];
      let tabId = tab.id;
      
      chrome.tabs.get(tabId, async (tab) => {
        let muted = !tab.mutedInfo.muted;
        await chrome.tabs.update(tabId, { muted });
      });
    }
  });  
}

//https://louisrli.github.io/blog/2013/01/16/javascript-canvas-screenshot/#.YkyLKihByUl

function onScreenshot(sendResponse){
  chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {
    sendResponse({ screenshotUrl: dataUrl });
  });  
}

function onOpenRMBookmark(num){
  let index = num-1;
  chrome.tabs.create({ 
    url : configRMBookmarks[index]
  });
}

https://github.com/mdn/webextensions-examples/blob/master/bookmark-it/background.js

//Possibly remove all bookmarks in search result array?

function onToggleBookmark(){

  function onFulfilled(bookmarkItems) {
    console.log(activeTabURL);
    if (bookmarkItems.length) {

      console.log("active tab is bookmarked. Removing bookmark...");
      console.log(bookmarkItems);
      console.log(bookmarkItems.length);
      let currentBookMarkId = bookmarkItems[0].id;
      
      chrome.bookmarks.remove(currentBookMarkId);

    } else {
      console.log("active tab is not bookmarked");
      let myBookmark = chrome.bookmarks.create({
        'title': activeTabTitle,
        'url': activeTabURL,
      });
      console.log(myBookmark);
    }
  }
  
  function onRejected(error) {
    console.log(`An error: ${error}`);
  }
  
  let searching = chrome.bookmarks.search({url: activeTabURL});
  searching.then(onFulfilled, onRejected);
}

function onColorPicker(sendResponse){
  chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {
    sendResponse({ screenshotUrl: dataUrl });
  });  
}
