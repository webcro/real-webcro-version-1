function selectRandIndex(highnum)
{
	return Math.floor(Math.random()* highnum);
}

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

function filter(commence,terminate,items)
{
	var indecies =new Array();
	var q =0;
	var i =0;
	for(;i<items;i++)
	{
		if(isRightDate(commence[i],terminate[i]))
			indecies[q++]=i;
	}
	return indecies;
}
	
var URLOLBpart;
if(language)
URLOLBpart ="/banqueendirect";
else
URLOLBpart ="/onlinebanking";
if (numberOfTopLinks > 0) //This comes from MarketingNew.js.
{
  if(numberOfStaySafeLinks >0)
  {
  	var topIndecies =new Array();
	topIndecies =filter(staySafeStart,staySafeExpiry,numberOfStaySafeLinks);
	var html = document.getElementById('newsupdfaq').innerHTML;
	if(topIndecies.length >0)
	{
		html+='';
		html+='              <section class="signin_content2_col-right">';
		html+='                <div class="signin_content2_head">';

		if(language)
			html+='   <h3>Foire aux questions</h3>';
		else
			html+='   <h3>Frequently Asked Questions</h3>';
		html+='                </div>'
                html+='                <div class="signin_content2_body">'		
		var i=0,k=0;
		for(;i<Math.min(topIndecies.length,10);i++)
		{
			k=topIndecies[i];
			html+='';
			html+='';
			if(staySafeLinkPub[k])
			{
			
				if(staySafeKiosk[k])
				{
					if(language)
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Ouvre un nouvel onglet)</span></a></div>';
					else
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Opens new tab)</span></a></div>';
				}
				else
					html+='<div class="signin_content2_body_links"><a href="'+pubContentURL+staySafeLinkURL[k]+'">'+staySafeLinkText[k]+'</a></div>';
			}
			else
			{
				if(staySafeKiosk[k])
				{
					if(language)
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Ouvre un nouvel onglet)</span></a></div>';
					else
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Opens new tab)</span></a></div>';
				}
				else
					html+='<div class="signin_content2_body_links"><a href="'+staySafeLinkURL[k]+'">'+staySafeLinkText[k]+'</a></div>';
			}
			html+='';
			html+='';
		}
		html+='</div>';
		html+='</section>';

	}
	document.getElementById('newsupdfaq').innerHTML = html;
  }
}
else
{
  if(numberOfStaySafeLinks >0)
  {
  	var topIndecies =new Array();
  	var numPerCol = numberOfStaySafeLinks / 2;
  	var secondColFound = false;
	topIndecies =filter(staySafeStart,staySafeExpiry,numberOfStaySafeLinks);
	var html = "";
	if(topIndecies.length >0)
	{
		html+='';
		html+='              <section class="signin_content2_full-width">';
		html+='                <div class="signin_content2_head">';

		if(language)
			html+='   <h3>Foire aux questions</h3>';
		else
			html+='   <h3>Frequently Asked Questions</h3>';
		html+='                </div>'
                html+='                <div class="signin_content2_body signin_content2_body_colx2">'		
                html+='                  <div class="signin_content2_body_colx2-left">'		

		var i=0,k=0;
		for(;i<Math.min(topIndecies.length,10);i++)
		{
			if ( i <= numPerCol )
			{
			  k=topIndecies[i];
			  html+='';
			  html+='';
			  if(staySafeLinkPub[k])
		  	  {
			
				if(staySafeKiosk[k])
				{
					if(language)
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Ouvre un nouvel onglet)</span></a></div>';
					else
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Opens new tab)</span></a></div>';
				}
				else
					html+='<div class="signin_content2_body_links"><a href="'+pubContentURL+staySafeLinkURL[k]+'">'+staySafeLinkText[k]+'</a></div>';
			  }
			  else
			  {
			  	if(staySafeKiosk[k])
				{
					if(language)
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Ouvre un nouvel onglet)</span></a></div>';
					else
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Opens new tab)</span></a></div>';
				}
				else
					html+='<div class="signin_content2_body_links"><a href="'+staySafeLinkURL[k]+'">'+staySafeLinkText[k]+'</a></div>';
			  }
			  html+='';
			  html+='';
			}
			else
			{
			  if (!secondColFound)
			  {	
			    html+='                  </div>'	
			    html+='                  <div class="signin_content2_body_colx2-right">'	
			    secondColFound = true;
			  }

			  k=topIndecies[i];
			  html+='';
			  html+='';
			  if(staySafeLinkPub[k])
		  	  {
			
				if(staySafeKiosk[k])
				{
					if(language)
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Ouvre un nouvel onglet)</span></a></div>';
					else
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Opens new tab)</span></a></div>';
				}
				else
					html+='<div class="signin_content2_body_links"><a href="'+pubContentURL+staySafeLinkURL[k]+'">'+staySafeLinkText[k]+'</a></div>';
			  }
			  else
			  {
			  	if(staySafeKiosk[k])
				{
					if(language)
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Ouvre un nouvel onglet)" href="javascript:kiosk_OpenWinRTB(\''+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Ouvre un nouvel onglet" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Ouvre un nouvel onglet)</span></a></div>';
					else
						html+='<div class="signin_content2_body_links"><a title="'+staySafeLinkText[k]+' (Opens new tab)" href="javascript:kiosk_OpenWinRTB(\''+staySafeLinkURL[k]+'\', \'TAB\', 40, 50, kiosk_Type1R)" ga-on="click" ga-event-category="Body" ga-event-action="Click Link" ga-event-label="'+staySafeLabel[k]+'">'+staySafeLinkText[k]+'<i aria-hidden="true" title="Opens new tab" class="rbc-icon2019 rbc_new_window2019_blue"></i><span class="accessible"> (Opens new tab)</span></a></div>';
				}
				else
					html+='<div class="signin_content2_body_links"><a href="'+staySafeLinkURL[k]+'">'+staySafeLinkText[k]+'</a></div>';
			  }
			  html+='';
			  html+='';
		        }
		}
		html+='</div>';
		html+='</div>';
		html+='</section>';

	}
	document.getElementById('newsupdfaq').innerHTML = html;
  }
}