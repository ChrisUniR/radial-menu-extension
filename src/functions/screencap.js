//screencap

function initCustomScreenshotCanvas(){

    //DRAW RECT
    //https://stackoverflow.com/questions/9417603/fabric-js-free-draw-a-rectangle

    var rect, isDown, origX, origY;
  
    console.log("SCREENSHOT BUTTON");
    let pageWidth = document.documentElement.scrollWidth;
    //let pageHeight = window.innerHeight;
    let pageHeight = document.documentElement.scrollHeight;
  
    let canvasEl = document.createElement("canvas");
    canvasEl.id = "canvasEl"
  
    canvasEl.width = pageWidth;
    canvasEl.height = pageHeight;
  
    body.append(canvasEl);
  
    let canvas = new fabric.Canvas("canvasEl");
    canvas.setWidth(pageWidth);
    canvas.setHeight(pageHeight);
    canvas.defaultCursor = "crosshair";
  
    let canvasContainerEl = document.getElementById("canvasEl").parentElement;
    canvasContainerEl.style.position = "absolute";
    canvasContainerEl.style.left = "0px";
    canvasContainerEl.style.top = "0px";
    canvasContainerEl.style.zIndex = "999";
  
    //+
    canvas.on('mouse:down', function(o){
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = canvas.getPointer(o.e);
      rect = new fabric.Rect({
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          width: pointer.x-origX,
          height: pointer.y-origY,
          angle: 0,
          fill: 'rgba(255,255,255, .25)',
          transparentCorners: false,
          lockRotation: true,
          borderColor: 'transparent',
          cornerColor: 'red',
          cornerSize: 5,
      });
      canvas.add(rect);
  });
  
  canvas.on('mouse:move', function(o){
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      
      if(origX>pointer.x){
          rect.set({ left: Math.abs(pointer.x) });
      }
      if(origY>pointer.y){
          rect.set({ top: Math.abs(pointer.y) });
      }
      
      rect.set({ width: Math.abs(origX - pointer.x) });
      rect.set({ height: Math.abs(origY - pointer.y) });
      
      
      canvas.renderAll();
  });
  //-
  
    canvas.on('mouse:up', function(o){
        isDown = false;
        let selection = canvas.getObjects()[0];
        let selectionLeft = selection.left;
        let selectionTop = selection.top;
        let selectionWidth = selection.width;
        let selectionHeight = selection.height;
        takeScreenshot(selectionLeft, selectionTop, selectionWidth, selectionHeight);
    });
  }
  
  //https://louisrli.github.io/blog/2013/01/16/javascript-canvas-screenshot/#.YkyLKihByUl
  
  function takeScreenshot (selLeft, selTop, selWidth, selHeight) {
    chrome.runtime.sendMessage({name: 'screenshot'}, function(response) {
        var data = response.screenshotUrl;
        var canvas = document.createElement('canvas');
        canvas.id = "secondCanvas";
        var img = new Image();
  
  
        img.src = data;
        
        img.onload = function() {
          let windowWidth = document.documentElement.scrollWidth;
          //let windowHeight = document.documentElement.scrollHeight;
          let windowHeight = window.innerHeight;
  
            canvas.width = windowWidth;
            canvas.height = windowHeight;
            canvas.getContext("2d").drawImage(img, 0, 0, windowWidth, windowHeight, 0, 0, windowWidth, windowHeight);
            console.log(windowWidth);
            console.log(windowHeight);
  
            renderImage(canvas, selLeft, selTop, selWidth, selHeight);
        }      
    });
  }
  
  function renderImage(secondCanvas, rectLeft, rectTop, rectWidth, rectHeight) {
    var previewCanvas = document.createElement('canvas');
    previewCanvas.width = rectWidth;
    previewCanvas.height = rectHeight;
  
    // Calculate the correct position of the element on the canvas
  /*   var prevTop = $element.offset().top - $screenshotCanvas.data('scrollTop');
    var prevLeft = $element.offset().left - $screenshotCanvas.data('scrollLeft'); */
  
    var ctx = previewCanvas.getContext("2d");
    previewCanvas.id = "thirdCanvas";
    ctx.drawImage(secondCanvas, rectLeft, rectTop, rectWidth, rectHeight, 0, 0, rectWidth, rectHeight);
  
    //var downloadImage = previewCanvas.toDataURL("image/png");
  
    //https://tutorial.eyehunts.com/js/javascript-open-new-tab-with-content-example-code/
    //https://stackoverflow.com/questions/3916191/download-data-url-file
    //https://code-boxx.com/download-canvas-image-javascript/
  
    var anchor = document.createElement("a");
    anchor.download = "screenshot.png";
    anchor.href = previewCanvas.toDataURL("image/png");
    anchor.click();
    delete anchor;
  
    //outsource
    let fabricCanvas = document.getElementById("canvasEl").parentElement;
    fabricCanvas.remove();
  }
  