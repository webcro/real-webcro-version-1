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
if(numberOfTopLinks >0)
{
	var topIndecies =new Array();
	topIndecies =filter(topStart,topExpiry,numberOfTopLinks);
	if(topIndecies.length >0)
	{
                document.write('    <div class="homepagelinkgrid" style="vertical-align:top">');
                document.write('    <div class="clear">');
                document.write('        <div class="homepagelinkgrid-block" style="width:auto; padding-top:0px">');


		if(language)
			document.write('   <h2>En vedette</h2>');
		else
			document.write('   <h2>In the Spotlight</h2>');
		document.write('   <ul class="bullets-arrow">');
		var i=0,k=0;
		for(;i<topIndecies.length;i++)
		{
			k=topIndecies[i];
			if(topLinkPub[k])
			{
				if(topKiosk[k])
				{
					if(language)
						document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+topLinkURL[k]+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+topLinkText[k]+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(ouvre une nouvelle fen&ecirc;tre)" class="icon" /></a></li>');
					else
						document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+pubContentURL+topLinkURL[k]+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+topLinkText[k]+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(opens new window)" class="icon" /></a></li>');
				}
				else
					document.write('       <li><a href="'+pubContentURL+topLinkURL[k]+'">'+topLinkText[k]+'</a></li> ');
			}
			else
			{
				if(topKiosk[k])
				{
					if(language)
						document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+topLinkURL[k]+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+topLinkText[k]+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(ouvre une nouvelle fen&ecirc;tre)" class="icon" /></a></li>');
					else
						document.write('<li><a class="linkedtextandicon" href="javascript:kiosk_OpenWinRTB(\''+topLinkURL[k]+'\', \'RTB\', 40, 50, kiosk_Type1R)"><span>'+topLinkText[k]+'</span> <img src="/uos/common/images/icons/newwindow.gif" alt="(opens new window)" class="icon" /></a></li>');
				}
				else
					document.write('       <li><a href="'+topLinkURL[k]+'">'+topLinkText[k]+'</a></li> ');
			}
		}
		document.write('  </ul> ');
                document.write('        </div>');
                document.write('    </div>');
                document.write('    <div class="divider-gradient" style="vertical-align: bottom;">&nbsp;</div>');
                document.write('    </div>');

	}

}
