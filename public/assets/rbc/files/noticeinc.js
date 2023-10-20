function setupCommenceDate(datestr)
{
var date =new Date();
date.setFullYear(datestr.substring(0,4),datestr.substring(4,6)-1,
datestr.substring(6,8));
date.setHours(0,0,0);
return date;
}
function setupExpiryDate(datestr)
{
var date =new Date();
date.setFullYear(datestr.substring(0,4),datestr.substring(4,6)-1,
datestr.substring(6,8));
date.setHours(23,59,59);
return date;
}
function isRightDate(start,finish)
{
var now =new Date();
var startDt =new Date();
var finishDt =new Date();
if(start ==null &&finish !=null)
{
finishDt =setupExpiryDate(finish);
if(finishDt >=now)
return true;
}
else if(start !=null &&finish ==null)
{
startDt =setupCommenceDate(start);
if(startDt <=now)
return true;
}
else if(start ==null &&finish ==null)
{
return true;
}
else
{
startDt =setupCommenceDate(start);
finishDt =setupExpiryDate(finish);
if(startDt <=now &&finishDt >=now)
return true;
}
return false;
}
function filter(notices)
{
var indecies =new Array();
var q =0;
var i =0;
for(;i<notices.length;i++)
{
if(isRightDate(notices[i].start,notices[i].expiry))
indecies[q++]=i;
}
return indecies;
}
if(numberofnotices >0)
{
var noticeIndecies =new Array();
noticeIndecies =filter(notices);
if(noticeIndecies.length >0)
{
document.write('<table width="100%" border="0" cellspacing="0" cellpadding="2" bordercolor="#ffcc00" bgcolor="#ffcc00">');
document.write('<tr class="noticeTableHeaderRow">');
document.write('<td width="5%"><img src="/uos/3m/images/information.gif" alt="Information" /></td>');
if(lang)
document.write('<td valign="middle" width="95%" class="noticeTableHeaderText">&#160;Avis importants</td>');
else
document.write('<td valign="middle" width="95%" class="noticeTableHeaderText">&#160;Important Notices</td>');
document.write('</tr>');
document.write('<tr>');
document.write('<td colspan="2">');
document.write('<table width="100%" border="0" cellspacing="0" cellpadding="4" bgcolor="#ffffff">');
for(i=0;i<noticeIndecies.length;i++)
{
notice =notices[noticeIndecies[i]];
document.write('<tr class="noticeTableRow"><td class="noticeTableText">');
if(notice.ispublic)
{
if(notice.iskiosk)
document.write('<p><a href="javascript:kiosk_OpenWinRTB(\''+pubContURL+notice.url+'\', \'RTB\', 40, 50, kiosk_Type1R)">'+notice.text+'</a></p>');
else
document.write('<p><a href="'+pubContURL+notice.url+'">'+notice.text+'</a></p>');
}
else
{
if(notice.iskiosk)
document.write('<p><a href="javascript:kiosk_OpenWinRTB(\''+notice.url+'\', \'RTB\', 40, 50, kiosk_Type1R)">'+notice.text+'</a></p>');
else
document.write('<p><a href="'+notice.url+'">'+notice.text+'</a></p>');
}
document.write('</td></tr>');
}
document.write('</table>');
document.write('</td>');
document.write('</tr>');
document.write('</table>');
}
}
