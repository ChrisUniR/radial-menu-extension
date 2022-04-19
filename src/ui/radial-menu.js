//radial-menu

let radialMenuContainer,
xPos,
yPos,
xRMCenter = xPos-250,
yRMCenter = yPos-250;

function loadMenu(){
    fetch(chrome.runtime.getURL('assets/radial-menu.html')).then(r => r.text()).then(r => initMenu(r));
}
  
function initMenu(r){
  
    hideContextMenu = true;
  
    radialMenuContainer = document.createElement("div");
    radialMenuContainer.innerHTML = r;
  
    xRMCenter = xPos - (config.RADIAL_MENU_SIZE/2);
    yRMCenter = yPos - (config.RADIAL_MENU_SIZE/2);
  
    radialMenuContainer.style.width = config.RADIAL_MENU_SIZE + "px";
    radialMenuContainer.style.height = config.RADIAL_MENU_SIZE + "px";
    radialMenuContainer.id = "radial-menu-container";
    radialMenuContainer.style.position = "absolute";
    radialMenuContainer.style.left = xRMCenter + "px";
    radialMenuContainer.style.top = yRMCenter + "px";
    radialMenuContainer.style.zIndex = "999";
  
    body.appendChild(radialMenuContainer);
  
    radialMenuIsDisplayed = true;
  
    setupMenuListeners();
}
  
//MENU LISTENERS
function setupMenuListeners(){

    for(let i = 0; i<radialMenuContainer.querySelectorAll(".item").length; i++){
        let currentSegment = radialMenuContainer.querySelectorAll(".item")[i];
        currentSegment.addEventListener("mouseup", () => mapSegmentId(i));
    }
}

function mapSegmentId(segment_id){

    let selectedFunction = "default";
    switch(segment_id){

        //inner ring
        case 0 : selectedFunction = configFunctions.FUNCTION_0; break;
        case 1 : selectedFunction = configFunctions.FUNCTION_1; break;
        case 2 : selectedFunction = configFunctions.FUNCTION_2; break;
        case 3 : selectedFunction = configFunctions.FUNCTION_3; break;

        //outer ring
        case 4 : selectedFunction = configFunctions.FUNCTION_4; break;
        case 5 : selectedFunction = configFunctions.FUNCTION_5; break;
        case 6 : selectedFunction = configFunctions.FUNCTION_6; break;

        case 7 : selectedFunction = configFunctions.FUNCTION_7; break;
        case 8 : selectedFunction = configFunctions.FUNCTION_8; break;
        case 9 : selectedFunction = configFunctions.FUNCTION_9; break;

        case 10 : selectedFunction = configFunctions.FUNCTION_10; break;
        case 11 : selectedFunction = configFunctions.FUNCTION_11; break;
        case 12 : selectedFunction = configFunctions.FUNCTION_12; break;

        case 13 : selectedFunction = configFunctions.FUNCTION_13; break;
        case 14 : selectedFunction = configFunctions.FUNCTION_14; break;
        case 15 : selectedFunction = configFunctions.FUNCTION_15; break;

        default : return false;
    }
    executeSegmentFunction(selectedFunction)
}

function executeSegmentFunction(selectedFunction){

    removeRadialMenu();
    switch(selectedFunction){

        case "new_tab" : console.log("new_tab"); createTab(); break;
        case "to_right_tab" : console.log("to_right_tab"); switchToRightTab(); break;
        case "close_tab" : console.log("close_tab"); closeTab(); break;
        case "to_left_tab" : console.log("to_left_tab"); switchToLeftTab(); break;

        case "add_bookmark" : console.log("add_bookmark"); break;
        case "refresh" : console.log("refresh"); refreshTab(); break;
        case "color_picker" : console.log("color_picker"); break;

        case "screenshot" : console.log("screenshot"); break;
        case "go_forward" : console.log("go_forward"); break;
        case "bookmark_4" : console.log("bookmark_4"); break;

        case "bookmark_3" : console.log("bookmark_3"); break;
        case "minimize" : console.log("minimize"); minimizeWindow(); break;
        case "bookmark_2" : console.log("bookmark_2"); break;

        case "bookmark_1" : console.log("bookmark_1"); break;
        case "go_back" : console.log("go_back"); break;
        case "toggle_mute_state" : console.log("toggle_mute_state"); toggleMuteState(); break;

        default : console.log("default");
    }
}

new ClickAndHold(clickHoldArea, () => {});

/*
  //adjacentHTML

  radialMenuContainer = document.createElement("div");
  document.body.insertAdjacentHTML('beforeend', html);
  radialMenu = document.getElementById("radial-menu");
  radialMenuContainer.appendChild(radialMenu);
*/



