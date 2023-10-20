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
        document.write('	<div class="callout callout-yellow-withtitle callout-notice"><span class="callout-top"><span>&nbsp;</span></span>');
        document.write('	<div class="callout-content clear">');
        if(lang)
            document.write('	<h5><img src="/uos/common/images/icons/attention.gif" alt="Mise en garde"  class="callout-titleicon" />Attention: Renseignements importants</h5>');
        else
            document.write('	<h5><img src="/uos/common/images/icons/attention.gif" alt="Warning"  class="callout-titleicon" />Warning: Important Information</h5>');

        document.write('	<ul class="bullets-arrow">');
        for(i=0;i<noticeIndecies.length;i++)
        {
            notice =notices[noticeIndecies[i]];
            if (i>0)
                document.write('   <p class="divider-dash" style="margin-top:16px;" >&nbsp;</p>');
            if(notice.ispublic)
            {
                if(notice.iskiosk)
                {
                    if(lang)
                        document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+pubContURL+notice.url+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+notice.text+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(ouvre une nouvelle fen&ecirc;tre)" class="icon" /></a></li>');
                    else
                        document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+pubContURL+notice.url+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+notice.text+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(opens new window)" class="icon" /></a></li>');
                }
                else
                    document.write('<li><a href="'+pubContURL+notice.url+'">'+notice.text+'</a></li>');
            }
            else
            {
                if(notice.iskiosk)
                {
                    if(lang)
                        document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+notice.url+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+notice.text+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(ouvre une nouvelle fen&ecirc;tre)" class="icon" /></a></li>');
                    else
                        document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+notice.url+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+notice.text+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(opens new window)" class="icon" /></a></li>');
                }
                else
                    document.write('<li><a href="'+notice.url+'">'+notice.text+'</a></li>');
            }
        }
        document.write('</ul>');
        document.write('	</div>');
        document.write('	<span class="callout-bottom"><span>&nbsp;</span></span>');
        document.write('</div>');
    }
}
