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
  
    radialMenuContainer.style.width = "500px";
    radialMenuContainer.style.height = "500px";
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
    let item2 = document.getElementById("item-2");
    item2.addEventListener("mouseup", () => {console.log("ITEM 2 ACTIVATED")});
  
    let item3 = document.getElementById("item-3");
    item3.addEventListener("mouseup", () => initCustomScreenshotCanvas());
}

new ClickAndHold(clickHoldArea, () => {});

/*
  //adjacentHTML

  radialMenuContainer = document.createElement("div");
  document.body.insertAdjacentHTML('beforeend', html);
  radialMenu = document.getElementById("radial-menu");
  radialMenuContainer.appendChild(radialMenu);
*/



