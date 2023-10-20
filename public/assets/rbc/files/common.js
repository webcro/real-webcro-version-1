<!--
common_ValidDec =2;
common_MinAmt =0.00;
common_MaxAmt =999999999999.99;
common_MaxTabLength =0;
common_ClickFunc =null;
function common_SetAutoTabMaxLength(inLen )
{
common_MaxTabLength =inLen;
}
function common_autoTab(E)
{
for(i =0;i <event_CurrentField.form.elements.length;i++ )
{
if(event_CurrentField.value.length >=common_MaxTabLength )
{
if(E.keyCode ==0||E.keyCode ==8||E.keyCode ==9||E.keyCode ==16||E.keyCode ==17||E.keyCode ==18||E.keyCode ==35||E.keyCode ==36||E.keyCode ==37||E.keyCode ==39||E.keyCode ==46)
return true;
if(event_CurrentField.form.elements[i]==event_CurrentField )
event_CurrentField.form.elements[i+1].focus();
}
}
}
function common_EnterClick(E)
{
if ((E.keyCode ==13)&&(!browser_IE))
{
common_ClickFunc.click();
return(true);
}
}
function common_NumOnly(E)
{
if (((E.keyCode >31)&&(E.keyCode <48))||(E.keyCode >57))
return(true);
}
function common_Amount(E)
{
var Result =-1;
if (event_CurrentField)
Result =event_CurrentField.value.lastIndexOf(".");
if (Result ==-1)
{
if (((E.keyCode >31)&&(E.keyCode !=46)&&(E.keyCode <48))||(E.keyCode >57))
return(true);
}
else
{
if (((E.keyCode >31)&&(E.keyCode <48))||(E.keyCode >57))
return(true);
}
}
function common_SetMinAmount(MinAmount)
{
if (isNaN(MinAmount))
common_MinAmt =0.00;
else
common_MinAmt =MinAmount;
}
function common_MinAmount()
{
var Amount =parseFloat(event_CurrentField.value);
if (event_CurrentField.value.length ==0)
;
else
if (isNaN(event_CurrentField.value))
{
event_CurrentField.value =event_CurrentFieldValue;
alert("The amount is not numeric. Replacing with old value");
event_CurrentField.focus();
return(true);
}
else
if (Amount <common_MinAmt)
{
event_CurrentField.value =event_CurrentFieldValue;
alert("The amount is less than the minimum of " + common_MinAmt + ". Replacing with old value");
event_CurrentField.focus();
return(true);
}
}
function common_SetMaxAmount(MaxAmount)
{
if (isNaN(MaxAmount))
common_MaxAmt =999999999999.99;
else
common_MaxAmt =MaxAmount;
}
function common_MaxAmount()
{
var Amount =parseFloat(event_CurrentField.value);
if (event_CurrentField.value.length ==0)
;
else
if (isNaN(event_CurrentField.value))
{
event_CurrentField.value =event_CurrentFieldValue;
alert("The amount is not numeric. Replacing with old value");
event_CurrentField.focus();
return(true);
}
else
if (Amount >common_MaxAmt)
{
event_CurrentField.value =event_CurrentFieldValue;
alert("The amount is greater than the maximum of " + common_MaxAmt + ". Replacing with old value");
event_CurrentField.focus();
return(true);
}
}
function common_SetDecPlaces(DecPlaces)
{
if (isNaN(DecPlaces))
common_ValidDec =2;
else
common_ValidDec =parseInt(DecPlaces);
}
function common_DecPlaces()
{
var Result =event_CurrentField.value.indexOf(".");
var Result2=event_CurrentField.value.indexOf(".",Result + 1);
var Length =event_CurrentField.value.length;
if (Result2==-1)
Result2=Result + common_ValidDec + 1;
if (Result ==-1)
;
else
if ((Length - Result)>(common_ValidDec + 1))
event_CurrentField.value =event_CurrentField.value.substr(0,Result2);
}
function common_DeleteSpaces(InText)
{
var x ="";
var y ="";
InText ="" + InText;
y =InText.split(" ");
for(i =0;i <y.length;i++)
x +=y[i];
return x;
}
function common_Void()
{
event_CurrentFieldValue =event_CurrentFieldValue;
}
function common_AssignEvents()
{
if (event_CurrentField)
{
event_CurrentField.onkeypress =event_keyPress();
event_CurrentField.onkeydown =event_keyDown();
event_CurrentField.onkeyup =event_keyUp();
event_CurrentField.onmousemove =event_mouseMove();
}
}
function common_ADCharSet(E)
{
if(((E.keyCode >32)&&(E.keyCode <38))||
((E.keyCode >38)&&(E.keyCode <40))||
((E.keyCode >41)&&(E.keyCode <44))||
((E.keyCode >46)&&(E.keyCode <48))||
((E.keyCode >57)&&(E.keyCode <65))||
((E.keyCode >90)&&(E.keyCode <97))||
(E.keyCode >122) 
)
return(true);
}
//-->