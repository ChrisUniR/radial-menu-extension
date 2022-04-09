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

  /*   let item2 = document.getElementById("item-2");
    item2.addEventListener("mouseup", () => {console.log("ITEM 2 ACTIVATED")});
  
    let item3 = document.getElementById("item-3");
    item3.addEventListener("mouseup", () => initCustomScreenshotCanvas()); */
}

function mapSegmentId(segment_id){
    let function_code = "default";
    switch(segment_id){
        //inner ring
        case 0 : function_code = configFunctions.FUNCTION_0; break;
        case 1 : function_code = configFunctions.FUNCTION_1; break;
        case 2 : function_code = configFunctions.FUNCTION_2; break;
        case 3 : function_code = configFunctions.FUNCTION_3; break;

        //outer ring
        case 4 : function_code = configFunctions.FUNCTION_4; break;
        case 5 : function_code = configFunctions.FUNCTION_5; break;
        case 6 : function_code = configFunctions.FUNCTION_6; break;

        case 7 : function_code = configFunctions.FUNCTION_7; break;
        case 8 : function_code = configFunctions.FUNCTION_8; break;
        case 9 : function_code = configFunctions.FUNCTION_9; break;

        case 10 : function_code = configFunctions.FUNCTION_10; break;
        case 11 : function_code = configFunctions.FUNCTION_11; break;
        case 12 : function_code = configFunctions.FUNCTION_12; break;

        case 13 : function_code = configFunctions.FUNCTION_13; break;
        case 14 : function_code = configFunctions.FUNCTION_14; break;
        case 15 : function_code = configFunctions.FUNCTION_15; break;

        default : return false;
    }
    mapSegmentFunction(function_code)
}

function mapSegmentFunction(function_code){
    removeRadialMenu();
    switch(function_code){
        case "new_tab" : console.log("new tab"); break;
        case "go_forward" : console.log("go forward"); break;
        case "close_tab" : console.log("close tab"); break;
        case "go_back" : console.log("go back"); break;

        case "add_bookmark" : console.log("add bookmark"); break;
        case "custom_screencap" : console.log("custom screencap"); break;

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



