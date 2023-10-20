<!--

function event_fix(e, eNew)
{
 eNew.type = event.type;
 eNew.cursorX = event.x;
 eNew.cursorY = event.y;
 eNew.objectX = event.srcElement.clientWidth;
 eNew.objectY = event.srcElement.clientHeight;
 eNew.clientX = event.clientX;
 eNew.clientY = event.clientY;
 eNew.keyCode = event.keyCode;
 eNew.button = event.button;
 eNew.modKey = event_BaseKey;
 if (event.altKey)
    eNew.modKey += event_AltKey;
 if (event.ctrlKey)
    eNew.modKey += event_CtrlKey;
 if (event.shiftKey)
    eNew.modKey += event_ShiftKey;
 eNew.offsetX = event.offsetX + 2;
 eNew.offsetY = event.offsetY + 2;
 eNew.screenX = event.screenX;
 eNew.screenY = event.screenY;
 eNew.scrollX = 0;
 eNew.scrollY = 0;
 eNew.id = null;
 if ((event.srcElement) &&
     (event.srcElement.parentElement) &&
     (event.srcElement.parentElement.id))
 {
  eNew.id = event.srcElement.parentElement.id;
  eNew.scrollX = event.srcElement.parentElement.scrollLeft;
  eNew.scrollY = event.srcElement.parentElement.scrollHeight;
 }
}

//-->

