//bookmark-manager

//execute set bookmark in BG OR only send active tab (async) execute in bookmark-manager?
function setRMBookmark(slot){
    

    chrome.storage.sync.set({[slot] : "https://www.youtube.com/"}
        , () => {console.log(slot + " is set to " + "https://www.youtube.com/");}
    )
}

function openRMBookmark(slot){
    chrome.storage.sync.get([slot]
        , function(result) {
            console.log("the value of " + slot + " is " + result[slot]);
            console.log(result);
        }
    )
}
