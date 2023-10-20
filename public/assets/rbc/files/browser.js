<!--
var browser_DOM =false;
var browser_NS4=false;
var browser_IE =false;
var browser_IE4=false;
var browser_MAC =false;
var browser_IE4M =false;
var browser_Path ="";
var browser_BaseDir ="/uos/common/javascript/";
var browser_PathDOM =browser_BaseDir + "dom/";
var browser_PathNS4=browser_BaseDir + "ns4/";
var browser_PathIE =browser_BaseDir + "ie/";
var browser_PathIE4=browser_BaseDir + "ie4/";
var browser_PathMAC =browser_BaseDir + "mac/";
var browser_PathIE4M =browser_BaseDir + "ie4m/";
var browser_PathALL =browser_BaseDir;
var browser_JSArray =new Array();
function browser_IncludeJS(JS)
{
if (!browser_ExistJS(JS))
{
var FullJS ="";
FullJS +=browser_PathALL;
FullJS +=JS;
browser_AddJS(JS);
document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='" + FullJS + "' TYPE='text/javascript'><\/SCR" + "IPT>");
}
}
function browser_AddJS(JS)
{
var size =browser_JSArray.length;
browser_JSArray[size]=new Array();
browser_JSArray[size]=JS;
}
function browser_ExistJS(JS)
{
for (var i =0;i <browser_JSArray.length;i++)
{
if (browser_JSArray[i]==JS)
return(true);
}
return(false);
}
document.write("");
browser_DOM =(document.getElementById)?true :false;
browser_NS4=(document.layers)?true :false;
browser_IE =(document.all)?true :false;
browser_IE4=browser_IE &&!browser_DOM;
if(navigator.appVersion.indexOf("Mac")!=-1)
browser_MAC =true;
browser_IE4M =browser_IE4&&browser_MAC;
//-->