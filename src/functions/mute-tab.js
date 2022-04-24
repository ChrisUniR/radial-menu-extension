//toggle_mute_state

function toggleMuteState(){
  chrome.runtime.sendMessage({name: 'mute_tab'}, function(response) {console.log(response)});
}