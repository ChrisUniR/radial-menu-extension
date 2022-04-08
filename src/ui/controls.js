//controls

  //HANDLE CLICK AND HOLD
  //https://www.youtube.com/watch?v=A95mIE2HdcY
  
  class ClickAndHold {
  
    constructor(target, callback) {
        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;
  
        ["mousedown"].forEach(type => {
          this.target.addEventListener(type, this.onHoldStart.bind(this));
        });
  
        ["mouseup", "mouseleave", "mouseout"].forEach(type => {
            this.target.addEventListener(type, this.onHoldEnd.bind(this));
        });     
    }
  
    onHoldStart(type) {
      if(type.which == "3"){
        this.isHeld = true;
  
        this.activeHoldTimeoutId = setTimeout(() => {
            if (this.isHeld) {
                this.callback();
            }
        }, config.RM_CLICK_HOLD_INTERVAL)
      }   
    }
  
    onHoldEnd(type) {
        this.isHeld = false;
        clearTimeout(this.activeHoldTimeoutId);
        if(type.which == "3"){
        }
    }
  
    static apply(target, callback) {
      new ClickAndHold(target, callback);
    }
  }
  
  //HANDLE CLICK AND HOLD
  //MENU INITIALIZATION
  
  ClickAndHold.apply(clickHoldArea, () => {  
    loadMenu();
  });