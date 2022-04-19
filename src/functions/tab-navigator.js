//tab-navigator

function createTab(){
    chrome.runtime.sendMessage({name: 'create_tab'});
}

function closeTab(){
    chrome.runtime.sendMessage({name: 'close_tab'});
}

function switchToRightTab(){
    chrome.runtime.sendMessage({name: 'switch_to_right_tab'});
}

function switchToLeftTab(){
    chrome.runtime.sendMessage({name: 'switch_to_left_tab'});
}

function refreshTab(){
    chrome.runtime.sendMessage({name: 'refresh_tab'});
}

function minimizeWindow(){
    chrome.runtime.sendMessage({name: 'minimize_window'});
}



