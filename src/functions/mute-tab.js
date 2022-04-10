//toggle_mute_state

//https://developer.chrome.com/docs/extensions/reference/tabs/

function toggleMuteState(){
  chrome.runtime.sendMessage({name: 'mute_tab'}, function(response) {console.log(response)});
}

