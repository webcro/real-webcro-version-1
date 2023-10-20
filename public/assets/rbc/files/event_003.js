<!--
if (browser_NS4)
browser_Path =browser_PathNS4;
else
if (browser_IE)
browser_Path =browser_PathIE;
else
if (browser_DOM)
browser_Path =browser_PathDOM;
else
if (browser_IE4)
browser_Path =browser_PathIE;
else
if (browser_IE4M)
browser_Path =browser_PathIE;
else
browser_Path =browser_PathIE;
document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='" + browser_Path + "event.js' TYPE='text/javascript'><\/SCR" + "IPT>");
event_OnLoadArray =new Array();
event_OnUnloadArray =new Array();
event_OnFocusFormArray =new Array();
event_OnBlurFormArray =new Array();
event_OnFocusArray =new Array();
event_OnBlurArray =new Array();
event_MouseDownArray =new Array();
event_MouseUpArray =new Array();
event_MouseOverArray =new Array();
event_MouseMoveArray =new Array();
event_DblClickArray =new Array();
event_KeyPressArray =new Array();
event_KeyUpArray =new Array();
event_KeyDownArray =new Array();
event_ValidationArray =new Array();
event_CurrentField =null;
event_CurrentForm =null;
event_CurrentFieldValue ="";
event_MESelect =null;
event_BaseKey =0;
event_AltKey =1;
event_CtrlKey =2;
event_ShiftKey =4;
event_ListenersDone =false;
event_addOnLoad(new Array(event_ActivateEvents));
function event_addOnLoad(FunctionArray)
{
event_addArray(event_OnLoadArray,FunctionArray);
}
function event_remOnLoad(FunctionArray)
{
event_remArray(event_OnLoadArray,FunctionArray);
}
function event_delOnLoad()
{
event_OnLoadArray.length =0;
}
function event_onLoad()
{
for (var i =0;i <event_OnLoadArray.length;i++)
{
event_OnLoadArray[i]();
}
}
function event_addOnUnload(FunctionArray)
{
event_addArray(event_OnUnloadArray,FunctionArray);
}
function event_remOnUnload(FunctionArray)
{
event_remArray(event_OnUnloadArray,FunctionArray);
}
function event_delOnUnload()
{
event_OnUnloadArray.length =0;
}
function event_onUnload()
{
for (var i =0;i <event_OnUnloadArray.length;i++)
{
event_OnUnloadArray[i]();
}
}
function event_addOnFocusForm(FunctionArray)
{
event_addArray(event_OnFocusFormArray,FunctionArray);
}
function event_remOnFocusForm(FunctionArray)
{
event_remArray(event_OnFocusFormArray,FunctionArray);
}
function event_delOnFocusForm()
{
event_OnFocusFormArray.length =0;
}
function event_onFocusForm()
{
for (var i =0;i <event_OnFocusFormArray.length;i++)
{
event_OnFocusFormArray[i]();
}
}
function event_addOnBlurForm(FunctionArray)
{
event_addArray(event_OnBlurFormArray,FunctionArray);
}
function event_remOnBlurForm(FunctionArray)
{
event_remArray(event_OnBlurFormArray,FunctionArray);
}
function event_delOnBlurForm()
{
event_OnBlurFormArray.length =0;
}
function event_onBlurForm()
{
for (var i =0;i <event_OnBlurFormArray.length;i++)
{
event_OnBlurFormArray[i]();
}
}
function event_addOnFocus(FunctionArray)
{
event_addArray(event_OnFocusArray,FunctionArray);
}
function event_remOnFocus(FunctionArray)
{
event_remArray(event_OnFocusArray,FunctionArray);
}
function event_delOnFocus()
{
event_OnFocusArray.length =0;
}
function event_onFocus()
{
for (var i =0;i <event_OnFocusArray.length;i++)
{
event_OnFocusArray[i]();
}
if (event_CurrentField)
event_CurrentFieldValue =event_CurrentField.value;
}
function event_addOnBlur(FunctionArray)
{
event_addArray(event_OnBlurArray,FunctionArray);
}
function event_remOnBlur(FunctionArray)
{
event_remArray(event_OnBlurArray,FunctionArray);
}
function event_delOnBlur()
{
event_OnBlurArray.length =0;
}
function event_onBlur()
{
for (var i =0;i <event_OnBlurArray.length;i++)
{
event_OnBlurArray[i]();
}
event_delKeyPress();
event_delKeyDown();
event_delKeyUp();
event_delMouseMove();
event_delMouseDown();
event_delMouseUp();
event_delDblClick();
event_delOnFocus();
event_delOnBlur();
event_delValidation()
if (event_CurrentField)
{
event_CurrentFieldValue =event_CurrentField.value;
}
}
function event_addMouseDown(FunctionArray)
{
event_addArray(event_MouseDownArray,FunctionArray);
}
function event_remMouseDown(FunctionArray)
{
event_remArray(event_MouseDownArray,FunctionArray);
}
function event_delMouseDown()
{
event_MouseDownArray.length =0;
}
function event_mouseDown(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_MouseDownArray.length;i++)
{
if (event_MouseDownArray[i](E))
return(false);
}
}
function event_addMouseUp(FunctionArray)
{
event_addArray(event_MouseUpArray,FunctionArray);
}
function event_remMouseUp(FunctionArray)
{
event_remArray(event_MouseUpArray,FunctionArray);
}
function event_delMouseUp()
{
event_MouseUpArray.length =0;
}
function event_mouseUp(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_MouseUpArray.length;i++)
{
if (event_MouseUpArray[i](E))
return(false);
}
}
function event_addMouseMove(FunctionArray)
{
event_addArray(event_MouseMoveArray,FunctionArray);
}
function event_remMouseMove(FunctionArray)
{
event_remArray(event_MouseMoveArray,FunctionArray);
}
function event_delMouseMove()
{
event_MouseMoveArray.length =0;
}
function event_mouseMove(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_MouseMoveArray.length;i++)
{
if (event_MouseMoveArray[i](E))
{
if (event_CurrentField)
{
event_CurrentField.blur();
event_CurrentField.focus();
}
return(false);
}
}
}
function event_addDblClick(FunctionArray)
{
event_addArray(event_DblClickArray,FunctionArray);
}
function event_remDblClick(FunctionArray)
{
event_remArray(event_DblClickArray,FunctionArray);
}
function event_delDblClick()
{
event_DblClickArray.length =0;
}
function event_dblClick(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_DblClickArray.length;i++)
{
if (event_DblClickArray[i](E))
return(false);
}
}
function event_addKeyPress(FunctionArray)
{
event_addArray(event_KeyPressArray,FunctionArray);
}
function event_remKeyPress(FunctionArray)
{
event_remArray(event_KeyPressArray,FunctionArray);
}
function event_delKeyPress()
{
event_KeyPressArray.length =0;
}
function event_keyPress(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_KeyPressArray.length;i++)
{
if (event_KeyPressArray[i](E))
return(false);
}
}
function event_addKeyUp(FunctionArray)
{
event_addArray(event_KeyUpArray,FunctionArray);
}
function event_remKeyUp(FunctionArray)
{
event_remArray(event_KeyUpArray,FunctionArray);
}
function event_delKeyUp()
{
event_KeyUpArray.length =0;
}
function event_keyUp(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_KeyUpArray.length;i++)
{
if (event_KeyUpArray[i](E))
return(false);
}
}
function event_addKeyDown(FunctionArray)
{
event_addArray(event_KeyDownArray,FunctionArray);
}
function event_remKeyDown(FunctionArray)
{
event_remArray(event_KeyDownArray,FunctionArray);
}
function event_delKeyDown()
{
event_KeyDownArray.length =0;
}
function event_keyDown(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_KeyDownArray.length;i++)
{
if (event_KeyDownArray[i](E))
return(false);
}
if (event_CurrentField)
event_CurrentFieldValue =event_CurrentField.value;
}
function event_addValidation(field,FunctionArray)
{
var size =0;
event_setCurrentField(field);
event_addArray(event_ValidationArray,FunctionArray);
event_addOnFocus(new Array(event_doValidation));
event_addOnBlur(new Array(event_doValidation));
event_addMouseMove(new Array(event_doEventValidation));
event_addKeyUp(new Array(event_doEventValidation));
event_addKeyDown(new Array(event_doEventValidation));
}
function event_remValidation(FunctionArray)
{
event_remArray(event_ValidationArray,FunctionArray);
}
function event_delValidation()
{
event_ValidationArray.length =0;
}
function event_doEventValidation(E)
{
for (var i =0;i <event_ValidationArray.length;i++)
{
if (event_ValidationArray[i]())
return(true);
}
}
function event_doValidation()
{
for (var i =0;i <event_ValidationArray.length;i++)
{
if (event_ValidationArray[i]())
return(true);
}
}
function event_event(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q)
{
this.type =a;
this.cursorX =b;
this.cursorY =c;
this.objectX =d;
this.objectY =e;
this.screenX =f;
this.screenY =g;
this.offsetX =h;
this.offsetY =i;
this.clientX =j;
this.clientY =k;
this.scrollX =l;
this.scrollY =m;
this.keyCode =n;
this.modKey =o;
this.button =p;
this.id =q;
}
function event_setCurrentField(field)
{
if (field)
event_CurrentField =field;
}
function event_setCurrentForm(form)
{
if(form)
event_CurrentForm =form;
}
function event_PostValue(Value)
{
if (event_CurrentField)
event_CurrentField.value =Value;
}
function event_addArray(EventArray,FunctionArray)
{
var size =0;
for (var i =0;i <FunctionArray.length;i++)
{
if (!event_existArray(EventArray,FunctionArray[i]))
{
size =EventArray.length;
EventArray[size]=new Array();
EventArray[size]=FunctionArray[i];
}
}
}
function event_remArray(EventArray,FunctionArray)
{
var size =0;
var match =false;
for (var i =0;i <EventArray.length;i++)
{
match =false;
for (var j =0;j <FunctionArray.length;j++)
{
if (EventArray[i]==FunctionArray[j])
{
match =true;
break;
}
}
if (match ==false)
{
EventArray[size]=EventArray[i];
size++;
}
}
EventArray.length =size;
}
function event_existArray(EventArray,Function)
{
for (var i =0;i <EventArray.length;i++)
{
if (EventArray[i]==Function)
return(true);
}
return(false);
}
function event_mouseOver(e)
{
var E =new event_event();
event_fix(e,E);
for (var i =0;i <event_MouseOverArray.length;i++)
{
if (event_MouseOverArray[i](E))
return(false);
}
}
function event_ActivateEvents()
{
document.onkeydown =event_keyDown;
document.onkeypress =event_keyPress;
document.onkeyup =event_keyUp;
document.onmousedown =event_mouseDown;
document.onmouseup =event_mouseUp;
document.ondblclick =event_dblClick;
document.onmousemove =event_mouseMove;
}
//-->