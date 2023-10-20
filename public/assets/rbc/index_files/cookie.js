function rbcSetCookie(name,value,expires,path,domain,secure)
{
document.cookie=name+"="+value
+ ((expires)?"; expires="+expires:"")
+ ((path)?"; path="+path:"")
+ ((domain)?"; domain="+domain :"")
+ ((secure)?"; secure="+secure :"");
}
function rbcDeleteCookie(name,path)
{
rbcSetCookie(name,null,"Tue, 01 Jan 1980 00:00:00 GMT",path);
}
function rbcGetCookie(Name,defaultVal)
{
var CookieStart=0;
while (CookieStart<document.cookie.length)
{
var CookiePiece;
var CookieName;
var CookieValue;
var charloc=document.cookie.indexOf(';',CookieStart);
if (charloc==-1)charloc =document.cookie.length;
CookiePiece=document.cookie.substring(CookieStart,charloc);
CookieStart=charloc+1;
charloc=CookiePiece.indexOf('=');
CookieName=CookiePiece.substring(0,charloc);
CookieValue=CookiePiece.substring(charloc + 1,CookiePiece.length);
while (CookieName.substring(0,1)==' ')
CookieName=CookieName.substring(1,CookieName.length);
while (CookieValue.substring(0,1)==' ')
CookieValue=CookieValue.substring(1,CookieValue.length );
if (CookieName.toUpperCase()==Name.toUpperCase())return CookieValue;
}
return defaultVal;
}
