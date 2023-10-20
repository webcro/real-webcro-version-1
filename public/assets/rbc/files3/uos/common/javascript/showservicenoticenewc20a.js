function setupCommenceDate(datestr)
{
    var date =new Date();
    date.setFullYear(datestr.substring(0,4),datestr.substring(4,6)-1,
    datestr.substring(6,8));
    date.setHours(datestr.substring(8,10),datestr.substring(10,12),datestr.substring(12,14));
    //date.setHours(0,0,0);
    return date;
}

function setupExpiryDate(datestr)
{
    var date =new Date();
    date.setFullYear(datestr.substring(0,4),datestr.substring(4,6)-1,
    datestr.substring(6,8));
    date.setHours(datestr.substring(8,10),datestr.substring(10,12),datestr.substring(12,14));
    //date.setHours(23,59,59);
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
    var html = "";
    
    if(noticeIndecies.length >0)
    {

        if (language)
        {
          html+='<div tabindex="-1" role="region" aria-label="Mise en garde" class="serviceNotice">';
          html+='  <div class="serviceNotice_head">';
          html+='    <div class="serviceNotice_head_iconWrapper"><i aria-hidden="true" title="Attention" class="rbc-icon2019 rbc_warning32"></i><img src="/uos/3m/images/icons/warning-32.svg" alt="Attention" class="accessible"></div>';
          html+='    <div class="serviceNotice_head_text">Avis de service</div>';
        }
        else
        { 
          html+='<div tabindex="-1" role="region" aria-label="Warning" class="serviceNotice">';
          html+='  <div class="serviceNotice_head">';
          html+='    <div class="serviceNotice_head_iconWrapper"><i aria-hidden="true" title="Warning message" class="rbc-icon2019 rbc_warning32"></i><img src="/uos/3m/images/icons/warning-32.svg" alt="Warning Message" class="accessible"></div>';
          html+='    <div class="serviceNotice_head_text">Service Notices</div>'; 
        }

        html+='  </div>';
        html+='  <div class="serviceNotice_body">';
        for(i=0;i<noticeIndecies.length;i++)
        {
            notice =notices[noticeIndecies[i]];
     
            if(notice.ispublic)
            {
                if(notice.iskiosk)
                {
                    if(language)
                        html+='<div class="serviceNotice_body_links notice_body_item"><a title="'+notice.text+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+notice.url+'\', \'TAB\', 40, 50, kiosk_Type1R)">'+notice.text+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible">(Ouvre un nouvel onglet)</span></a></div>';
                    else
                        html+='<div class="serviceNotice_body_links notice_body_item"><a title="'+notice.text+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+notice.url+'\', \'TAB\', 40, 50, kiosk_Type1R)">'+notice.text+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible">(Opens new tab)</span></a></div>';
                }
                else
                    html+='<div class="serviceNotice_body_links notice_body_item"><a href="'+pubContentURL+notice.url+'">'+notice.text+'</a></div>';
            }
            else
            {
                if(notice.iskiosk)
                {
                    if(language)
                        html+='<div class="serviceNotice_body_links notice_body_item"><a title="'+notice.text+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+notice.url+'\', \'TAB\', 40, 50, kiosk_Type1R)">'+notice.text+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible">(Ouvre un nouvel onglet)</span></a></div>';
                    else
                        html+='<div class="serviceNotice_body_links notice_body_item"><a title="'+notice.text+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+notice.url+'\', \'TAB\', 40, 50, kiosk_Type1R)">'+notice.text+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible">(Opens new tab)</span></a></div>';
                }
                else
                    html+='<div class="serviceNotice_body_links notice_body_item"><a href="'+notice.url+'">'+notice.text+'</a></div>';
            }
        }
        html+='  </div>';    
        html+='</div>';    

    }
	document.getElementById('serviceNotice').innerHTML = html;
}