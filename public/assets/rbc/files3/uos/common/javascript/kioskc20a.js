<!--
var kiosk_Type1X =40;
var kiosk_Type1Y =50;
var kiosk_Type1W =600;
var kiosk_Type1H =400;
var kiosk_Type1R ="menubar=yes,toolbar=yes,hotkeys=yes,status=yes,resizable=yes,scrollbars=yes,width=600,height=400";
var kiosk_Type1C ="menubar=yes,toolbar=yes,hotkeys=yes,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type2X =50;
var kiosk_Type2Y =50;
var kiosk_Type2W =500;
var kiosk_Type2H =500;
var kiosk_Type2R ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes,width=500,height=500";
var kiosk_Type2C ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes";
var kiosk_Type3X =50;
var kiosk_Type3Y =50;
var kiosk_Type3W =500;
var kiosk_Type3H =500;
var kiosk_Type3R ="menubar=no,toolbar=yes,hotkeys=no,status=no,resizable=yes,scrollbars=yes,width=500,height=500";
var kiosk_Type3C ="menubar=no,toolbar=yes,hotkeys=no,status=no,resizable=yes,scrollbars=yes";
var kiosk_Type4X =50;
var kiosk_Type4Y =50;
var kiosk_Type4W =630;
var kiosk_Type4H =375;
var kiosk_Type4R ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes,width=630,height=375";
var kiosk_Type4C ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes";
var kiosk_Type5X =50;
var kiosk_Type5Y =50;
var kiosk_Type5W =630;
var kiosk_Type5H =420;
var kiosk_Type5R ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes,width=630,height=420";
var kiosk_Type5C ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes";
var kiosk_Type6X =30;
var kiosk_Type6Y =30;
var kiosk_Type6W =750;
var kiosk_Type6H =375;
var kiosk_Type6R ="menubar=no,toolbar=yes,hotkeys=no,status=yes,resizable=yes,scrollbars=yes,width=750,height=375";
var kiosk_Type6C ="menubar=no,toolbar=yes,hotkeys=no,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type7X =25;
var kiosk_Type7Y =0;
var kiosk_Type7W =660;
var kiosk_Type7H =450;
var kiosk_Type7R ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes,width=660,height=450";
var kiosk_Type7C ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type8X =75;
var kiosk_Type8Y =0;
var kiosk_Type8W =660;
var kiosk_Type8H =450;
var kiosk_Type8R ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes,width=660,height=450";
var kiosk_Type8C ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type9X =100;
var kiosk_Type9Y =0;
var kiosk_Type9W =660;
var kiosk_Type9H =450;
var kiosk_Type9R ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes,width=660,height=450";
var kiosk_Type9C ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type10X =50;
var kiosk_Type10Y =75;
var kiosk_Type10W =600;
var kiosk_Type10H =500;
var kiosk_Type10R ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes,width=600,height=500";
var kiosk_Type10C ="menubar=no,toolbar=no,hotkeys=no,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type11X =50;
var kiosk_Type11Y =75;
var kiosk_Type11W =540;
var kiosk_Type11H =500;
var kiosk_Type11R ="menubar=yes,toolbar=yes,hotkeys=no,status=yes,resizable=yes,scrollbars=yes,width=540,height=500";
var kiosk_Type11C ="menubar=yes,toolbar=yes,hotkeys=no,status=yes,resizable=yes,scrollbars=yes";
var kiosk_Type12C ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=no";
var kiosk_Type13R ="menubar=no,toolbar=no,hotkeys=no,status=no,resizable=yes,scrollbars=yes,width=500,height=250";
var kiosk_Type14X =50;
var kiosk_Type14Y =50;
var kiosk_Type14R ="menubar=no,toolbar=yes,hotkeys=no,status=no,resizable=yes,scrollbars=yes,width=815,height=515";
function kiosk_SetPropsRTS()
{
this.properties ="";
this.properties +=this.otherprops;
var Left =this.left;
var Top =this.top;
if (document.all)
this.properties +=",LEFT="+ Left+ ",TOP="+Top;
else
this.properties +=",screenX="+ Left+ ",screenY="+Top;
}
function kiosk_SetPropsRTB()
{
this.properties ="";
this.properties +=this.otherprops;
var Left =0;
var Top =0;
if (document.all)
{
Left =window.screenLeft + this.left;
Top =window.screenTop + this.top;
this.properties +=",LEFT="+ Left+ ",TOP="+Top;
}
else
{
Left =window.screenX + this.left + window.outerWidth - window.innerWidth;
Top =window.screenY + this.top + window.outerHeight - window.innerHeight;
this.properties +=",screenX="+ Left+ ",screenY="+Top;
}
}
function kiosk_SetPropsVCTS()
{
this.properties ="";
this.properties +=this.otherprops;
var Left =this.left;
var Top =this.top;
var Width =screen.availWidth - (2* Left);
var Height =screen.availHeight - (2* Top);
if (document.all)
this.properties +=",width="+Width+",height="+Height+",LEFT="+Left+",TOP="+Top;
else
this.properties +=",width="+Width+",height="+Height+",screenX="+Left+",screenY="+Top;
}
function kiosk_SetPropsVCTB()
{
this.properties ="";
this.properties +=this.otherprops;
var Left =0;
var Top =0;
var Width =0;
var Height =0;
if (document.all)
{
Left =window.screenLeft + this.left;
Top =window.screenTop + this.top;
Width =screen.availWidth - (2* Left);
Height =screen.availHeight - (2* Top);
this.properties +=",width="+Width+",height="+Height+",LEFT="+Left+",TOP="+Top;
}
else
{
Left =window.screenX + this.left + window.outerWidth - window.innerWidth;
Top =window.screenY + this.top + window.outerHeight - window.innerHeight;
Width =window.innerWidth - (2* this.left);
Height =window.innerHeight - (2* this.top)- ((window.outerHeight - window.innerHeight)/ 2);
this.properties +=",width="+Width+",height="+Height+",screenX="+Left+",screenY="+Top;
}
}
function kiosk_SetPropsCTS()
{
this.properties ="";
this.properties +=this.otherprops;
var Width =this.left;
var Height =this.top;
var Left =(screen.availWidth - Width)/ 2;
var Top =(screen.availHeight - Height)/ 2;
if (document.all)
this.properties +=",width="+Width+",height="+Height+",LEFT="+Left+",TOP="+Top;
else
this.properties +=",width="+Width+",height="+Height+",screenX="+Left+",screenY="+Top;
}
function kiosk_SetPropsCTB()
{
this.properties ="";
this.properties +=this.otherprops;
var Left =0;
var Top =0;
var Width =this.left;
var Height =this.top;
if (document.all)
{
Left =window.screenLeft + (screen.availWidth - Width - window.screenLeft)/ 2;
Top =window.screenTop + (screen.availHeight - Height - window.screenTop)/ 2;
this.properties +=",width="+Width+",height="+Height+",LEFT="+Left+",TOP="+Top;
}
else
{
Left =window.screenX + (window.outerWidth - Width)/ 2;
Top =window.screenY + (window.outerHeight - Height)/ 2;
this.properties +=",width="+Width+",height="+Height+",screenX="+Left+",screenY="+Top;
}
}
function kiosk_Open()
{
this.close();
this.setProps();
if (this.id == "TAB")
{
 this.win =window.open(this.url,"_blank");
}
else
{
 this.win =window.open(this.url,this.id,this.properties);
}
this.win.focus();
}
function kiosk_Close()
{
if (this.win)
{
if (this.win.closed)
this.win =0;
else
{
this.win.close();
this.win =0;
}
}
}
function kiosk_Win(url,id,left,top,otherprops)
{
this.win =null;
this.url =url;
this.id =id;
this.top =top;
this.left =left;
this.otherprops =otherprops;
this.properties =null;
this.setProps =null;
this.open =kiosk_Open;
this.close =kiosk_Close;
}
function kiosk_OpenWinRTS(url,id,left,top,otherprops)
{
var Kiosk =new kiosk_Win(url,id,left,top,otherprops);
Kiosk.setProps =kiosk_SetPropsRTS;
Kiosk.open();
}
function kiosk_OpenWinRTB(url,id,left,top,otherprops)
{
var Kiosk =new kiosk_Win(url,id,left,top,otherprops);
Kiosk.setProps =kiosk_SetPropsRTB;
Kiosk.open();
}
function kiosk_OpenWinVCTS(url,id,left,top,otherprops)
{
var Kiosk =new kiosk_Win(url,id,left,top,otherprops);
Kiosk.setProps =kiosk_SetPropsVCTS;
Kiosk.open();
}
function kiosk_OpenWinVCTB(url,id,left,top,otherprops)
{
var Kiosk =new kiosk_Win(url,id,left,top,otherprops);
Kiosk.setProps =kiosk_SetPropsVCTB;
Kiosk.open();
}
function kiosk_OpenWinCTS(url,id,width,height,otherprops)
{
var Kiosk =new kiosk_Win(url,id,width,height,otherprops);
Kiosk.setProps =kiosk_SetPropsCTS;
Kiosk.open();
}
function kiosk_OpenWinCTB(url,id,width,height,otherprops)
{
var Kiosk =new kiosk_Win(url,id,width,height,otherprops);
Kiosk.setProps =kiosk_SetPropsCTB;
Kiosk.open();
}
function kiosk_AreYouSure(Lang,Text,Form)
{
var pageName ="areyousure.html";
var EnglishURL ="https://www1.royalbank.com/common/html/english/";
var FrenchURL ="https://www1.royalbank.com/common/html/french/";
var LangURL ="";
var TextVar ="?popT1=";
var FormVar ="&popF1=";
var FullURL ="";
if (Lang)
LangURL =FrenchURL;
else
LangURL =EnglishURL;
FullURL =LangURL + pageName + TextVar + Text + FormVar + Form;
kiosk_OpenWinCTB(FullURL,"AYS",300,300,kiosk_Type2C);
}
//-->