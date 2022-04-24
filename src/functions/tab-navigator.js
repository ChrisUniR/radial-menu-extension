//tab-navigator

function createTab(){
    chrome.runtime.sendMessage({name: "create_tab"});
}

function closeTab(){
    chrome.runtime.sendMessage({name: "close_tab"});
}

function switchToRightTab(){
    chrome.runtime.sendMessage({name: "switch_to_right_tab"});
}

function switchToLeftTab(){
    chrome.runtime.sendMessage({name: "switch_to_left_tab"});
}

function refreshTab(){
    chrome.runtime.sendMessage({name: "refresh_tab"});
}

function minimizeWindow(){
    chrome.runtime.sendMessage({name: "minimize_window"});
}

function goBack(){
    window.history.go(-1);
}

function goForward(){
    window.history.go(+1);
}

function toggleBookmark(){
    chrome.runtime.sendMessage({name: "toggle_bookmark"});
}

//OPTIONS ONLY (?)
/* 
function setRMBookmark(num, url){
    let index = num-1;
    configRMBookmarks[index] = url;
}

function openRMBookmark(num){
    chrome.runtime.sendMessage({name: "open_bookmark"}); 
}
 */