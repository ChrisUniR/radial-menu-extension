//index

//let selectedSegment = null;
let body = document.getElementsByTagName('body')[0];
let hideContextMenu = false;
let contextMenuEvent;
let clickHoldArea = document.body;



//INIT WINDOW LISTENERS

//window.addEventListener("mousedown", onMouseDown);
//window.addEventListener("mouseup", onMouseUp);

window.addEventListener("contextmenu", e => handleContextMenu(e));
window.addEventListener("mouseup", removeRadialMenu);

document.onmousemove = function(e)
{
    xPos = e.pageX;
    yPos = e.pageY;
};

/* function onMouseDown(mouseDownEvent){
  if(mouseDownEvent.which == "3"){
    console.log("down");
  }
}

function onMouseUp(mouseUpEvent){
  if(mouseUpEvent.which == "3"){
    console.log("up");
    if(selectedSegment == "2"){
      seg2Selected();
    }
    selectedSegment = null;
  } 
}*/

//HANDLE CONTEXT MENU

function handleContextMenu(e){
  if(hideContextMenu){
    e.preventDefault();
  }
  if(document.getElementById("radial-menu-container")){
    document.getElementById("radial-menu-container").remove();
  } 
  hideContextMenu = false;
}

function removeRadialMenu(){
  if(document.getElementById("radial-menu-container")){
    document.getElementById("radial-menu-container").remove();
  } 
}

//???
//SEGMENT EVENTS

function seg2Selected(){
  console.log("SEG 2 SELECTED");
}


