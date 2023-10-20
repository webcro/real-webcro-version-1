/*********************************************
 * Expand/Collapse Drop-Down Overlay Content *
 *********************************************/

var dropDownOverlay_active = {content: '', opener: '' , position: -1};

function dropDownOverlay_findPosX(obj) 
{
	var curleft = 0;
	if (obj.offsetParent) 
	{
		while (obj.offsetParent) 
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
	{
		curleft += obj.x;
	}
	return curleft;
}

function dropDownOverlay_findPosY(obj) 
{
	var curtop = 0;
	if (obj.offsetParent) 
	{
		while (obj.offsetParent) 
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
	{
		curtop += obj.y;
	}
	return curtop;
}

function dropDownOverlay_position( content, opener )
{
	// need to fixate default size (MSIE problem)
	content.style.width = content.offsetWidth + 'px';
	content.style.height = content.offsetHeight + 'px';		

	// if tooltip is too wide, shift left to be within parent 
	var posX = 0;
	var posY = 23;
	if (posX + content.offsetWidth > opener.offsetWidth) 
		posX = opener.offsetWidth - content.offsetWidth;
	if (posX < 0 ) 
		posX = 0; 
	
	var x = dropDownOverlay_findPosX(opener) + posX;
	var y = dropDownOverlay_findPosY(opener) + posY;
	
	dropDownOverlay_active['position'] = dropDownOverlay_findPosY(opener);
	
	content.style.top = y + 'px';
	content.style.left = x + 'px';
	
	content.style.position = 'absolute';
	content.style.zIndex = 2;
}

/*********************************************
 * Expand/Collapse Drop-Down Overlay Content *
 *********************************************/

function dropDownOverlay_toggle(obj, a_id)
{
	var content = document.getElementById(obj);
	var opener = document.getElementById(a_id);	

	if ( dropDownOverlay_active['content'] && 
			dropDownOverlay_active['content'] != content )
	{
		var tmp = dropDownOverlay_active['content'];
		dropDownOverlay_active['content'] = '';
		dropDownOverlay_toggle( tmp.getAttribute('id'), a_id );
	}

	iconState = opener.lastChild.alt;
	iconState = iconState.replace('Collapse','');
	iconState = iconState.replace('Expand','');
	
	if (content.style.display != "none" ) 
	{
		dropDownOverlay_active['content'] = '';
		dropDownOverlay_active['opener'] = '';
		content.style.display = 'none';
		opener.lastChild.alt = 'Expand' + iconState;
		opener.focus();
	}
	else 
	{
		dropDownOverlay_active['content'] = content;
		dropDownOverlay_active['opener'] = opener;
		content.style.display = '';
		opener.lastChild.setAttribute( 'alt' , 'Collapse' + iconState );
		dropDownOverlay_position( content, opener );
	}
} 

function dropDownOverlay_toggleFrench(obj, a_id) 
{
	var content = document.getElementById(obj);
	var opener = document.getElementById(a_id);	

	if ( dropDownOverlay_active['content'] && 
			dropDownOverlay_active['content'] != content )
	{
		var tmp = dropDownOverlay_active['content'];
		dropDownOverlay_active['content'] = '';
		dropDownOverlay_toggleFrench( tmp.getAttribute('id'), a_id );
	}

	iconState = opener.lastChild.alt;
	iconState = iconState.replace('R\u00E9duire','');
	iconState = iconState.replace('D\u00E9velopper','');
	
	if (content.style.display != "none" ) 
	{
		dropDownOverlay_active['content'] = '';
		dropDownOverlay_active['opener'] = '';
		content.style.display = 'none';
		opener.lastChild.alt = 'D\u00E9velopper' + iconState;
		opener.focus();
	}
	else 
	{
		dropDownOverlay_active['content'] = content;
		dropDownOverlay_active['opener'] = opener;
		content.style.display = '';
		opener.lastChild.setAttribute( 'alt' , 'R\u00E9duire' + iconState );
		dropDownOverlay_position( content, opener );
	}
}


/*****************************************************************************
 * Hooks into the toggleIcon functions for repositioning drop-down overlays. *
 *****************************************************************************/
var dropDownOverlay_originalToggleIcon = toggleIcon;
toggleIcon = function (obj, a_id)
{
	dropDownOverlay_originalToggleIcon( obj, a_id );

	if (dropDownOverlay_active['content'] && 
			dropDownOverlay_active['position'] != 
				dropDownOverlay_findPosY(dropDownOverlay_active['opener']))
		dropDownOverlay_position(dropDownOverlay_active['content'], 
				dropDownOverlay_active['opener']);
}

var dropDownOverlay_originalToggleIconFrench = toggleIconFrench;
toggleIconFrench = function (obj, a_id)
{
	dropDownOverlay_originalToggleIconFrench( obj, a_id );

	if (dropDownOverlay_active['content'] && 
			dropDownOverlay_active['position'] != 
				dropDownOverlay_findPosY(dropDownOverlay_active['opener']))
		dropDownOverlay_position(dropDownOverlay_active['content'], 
				dropDownOverlay_active['opener']);
}
