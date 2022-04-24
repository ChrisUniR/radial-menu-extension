//color-picker

let px,
r, g, b,
hex;

function pickPixelColor () {
  chrome.runtime.sendMessage({name: 'color_picker'}, function(response) {
      var data = response.screenshotUrl;
      var canvasEl = document.createElement('canvas');
      canvasEl.id = "color_picker_canvasEl";
      var img = new Image();

      img.src = data;
      
      img.onload = function() {
        let windowWidth = document.documentElement.scrollWidth;
        //let windowHeight = document.documentElement.scrollHeight;
        let windowHeight = window.innerHeight;

        canvasEl.width = windowWidth;
        canvasEl.height = windowHeight;
        var ctx = canvasEl.getContext("2d");
        ctx.drawImage(img, 0, 0, windowWidth, windowHeight, 0, 0, windowWidth, windowHeight);
        console.log(windowWidth);
        console.log(windowHeight);

        canvasEl.style.position = "absolute";
        canvasEl.style.left = "0px";
        canvasEl.style.top = "0px";
        //canvasEl.style.zIndex = "999";
        canvasEl.style.cursor = "crosshair";
        body.append(canvasEl);

        let colorPickerDisplayContainer = document.createElement("div");
        colorPickerDisplayContainer.id = "color-picker-display-container";
        fetch(chrome.runtime.getURL('assets/color-picker-display.html')).then(r => r.text()).then(r => colorPickerDisplayContainer.innerHTML = r);
        body.append(colorPickerDisplayContainer);

        canvasEl.addEventListener("mousemove", () => {
          px = ctx.getImageData(xPos, yPos, 1, 1).data,
          r = px[0];
          g = px[1];
          b = px[2];
          console.log("r: " + r + ", g: " + g + ", b: " + b);
          hex = RGBToHex(r, g, b);
        });

        canvasEl.addEventListener("click", () => {
          hex = RGBToHex(r, g, b);
          console.log(hex);
          canvasEl.remove();
          colorPickerDisplayContainer.remove();
        });

        document.addEventListener("mousemove", () => {
          if(document.getElementById("color-picker-display-container")){
            let colorPickerDisplayRText = document.getElementById("cp-rgb-value-r"),
            colorPickerDisplayGText = document.getElementById("cp-rgb-value-g"),
            colorPickerDisplayBText = document.getElementById("cp-rgb-value-b"),
            colorPickerDisplayRBar = document.getElementById("cp-bar-r"),
            colorPickerDisplayGBar = document.getElementById("cp-bar-g"),
            colorPickerDisplayBBar = document.getElementById("cp-bar-b"),
            selectedColor = document.getElementById("cp-current-color");

            colorPickerDisplayContainer.style.left = (xPos - 125) + "px";
            colorPickerDisplayContainer.style.top = (yPos - 100) + "px";
            //Uncaught TypeError: Cannot read properties of null (reading 'style')
            selectedColor.style.backgroundColor = "#" + hex;
            colorPickerDisplayRText.innerText = r;
            colorPickerDisplayGText.innerText = g;
            colorPickerDisplayBText.innerText = b;

            colorPickerDisplayRBar.style.width = r/255 * 100 + "%";
            colorPickerDisplayGBar.style.width = g/255 * 100 + "%";
            colorPickerDisplayBBar.style.width = b/255 * 100 + "%";
          }
        });
      }      
  });
}

function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1){r = "0" + r;}
  if (g.length == 1){g = "0" + g;}
  if (b.length == 1){b = "0" + b;}

  return r + g + b;
}


