<!--
event_CaptureEvents(); //Turn on when event_ActivateEvents() is used!

function event_fix(e, eNew)
{
 eNew.type = e.type;
 eNew.cursorX = e.pageX;
 eNew.cursorY = e.pageY;
 eNew.objectX = e.target.width;
 eNew.objectY = e.target.height;
 eNew.clientX = e.width;
 eNew.clientY = e.height;
 eNew.keyCode = e.which;
 eNew.button = e.which;
 eNew.modKey = e.modifiers;
 eNew.offsetX = e.x;
 eNew.offsetY = e.y;
 eNew.screenX = e.screenX;
 eNew.screenY = e.screenY;
 eNew.scrollX = 0;
 eNew.scrollY = 0;
 eNew.id = null;
 if (e.target.name)
  eNew.id = e.target.name;
}

function event_CaptureEvents()
{

if (event_ListenersDone)
;
else
if (window.opener && window.opener.event_ListenersDone)
;  //Do not add listeners for child because parent has them (dom only)
else
 {
  event_ListenersDone = true;
  document.captureEvents(Event.KEYDOWN);
  document.captureEvents(Event.KEYPRESS);
  document.captureEvents(Event.KEYUP);
  document.captureEvents(Event.MOUSEDOWN);
//document.captureEvents(Event.MOUSEOVER);
  document.captureEvents(Event.MOUSEUP);
  document.captureEvents(Event.DBLCLICK);
  document.captureEvents(Event.MOUSEMOVE);
 }
}
//-->

