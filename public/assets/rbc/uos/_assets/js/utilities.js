/* UOS Version: 2.2 - May 4, 2009 */

/***********************************************************************/
/* Popups
/***********************************************************************/

function popup(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width='+ w + ', height=' + h + ',left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=yes,resizable=yes,toolbar=no,menubar=no');
	if (window.focus) {newwindow.focus()}
	return false;
}

function popupHelp(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width=600,height=516,left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=yes,resizable=yes,toolbar=no,menubar=no');
	if (window.focus) {newwindow.focus()}
	return false;
}

function popupFlash(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width=836,height=516,left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=no,resizable=yes,toolbar=no,menubar=no,statusbar=no,status=no');
	if (window.focus) {newwindow.focus()}
	return false;
}

function popupPrint(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width=710,height=516,left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=yes,resizable=yes,toolbar=no,menubar=no');
	if (window.focus) {newwindow.focus()}
	return false;
}

function popupThirdparty(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width=815,height=400,left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=yes,resizable=yes,toolbar=yes,menubar=yes,location=yes');
	if (window.focus) {newwindow.focus()}
	return false;
}


function popupNewbrowser(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width=815,height=400,left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=yes,resizable=yes,toolbar=yes,menubar=yes,location=yes,status=yes');
	if (window.focus) {newwindow.focus()}
	return false;
}

function popupNonhtml(url) {
	LeftWindowPosition = ((document.all)?window.screenLeft:window.screenX)+50;
	TopWindowPosition = ((document.all)?window.screenTop:window.screenY)+5;
	newwindow=window.open(url,'','width=836,height=516,left=' + LeftWindowPosition + ',top=' + TopWindowPosition + ',scrollbars=no,resizable=yes,toolbar=no,menubar=no,statusbar=no,status=no,status=yes');
	if (window.focus) {newwindow.focus()}
	return false;
}



/***********************************************************************/
/* Stylesheet Toggle
/***********************************************************************/

function setActiveStyleSheet(title) {
var i, a, main;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
a.disabled = true;
if(a.getAttribute("title") == title) a.disabled = false;
}
}

createCookie("stylesheetsetting", title, 365);

}

function getActiveStyleSheet() {
var i, a;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
}
return null;
}

function getPreferredStyleSheet() {
var i, a;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
if(a.getAttribute("rel").indexOf("style") != -1
&& a.getAttribute("rel").indexOf("alt") == -1
&& a.getAttribute("title")
) return a.getAttribute("title");
}
return null;
}

function createCookie(name,value,days) {
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}

window.onload = function(e) {
var cookie = readCookie("stylesheetsetting");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
}



var cookie = readCookie("stylesheetsetting");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);


function applyResizeScript() {
    if(!document.getElementById) { return; }    
    var toolTextresizeNormal = document.getElementById("tool-textresize-normal");
	var toolTextresizeLarge = document.getElementById("tool-textresize-large");
	var toolTextresizeExtralarge = document.getElementById("tool-textresize-extralarge");

    if (!toolTextresizeNormal) { return; }
	if (!toolTextresizeLarge) { return; }
	if (!toolTextresizeExtralarge) { return; }
    
  
    toolTextresizeNormal.onclick = function()
        {setActiveStyleSheet('', 1); return false;}
	toolTextresizeNormal.keypress = function()
        {setActiveStyleSheet('', 1); return false;}
	toolTextresizeLarge.onclick = function()
        {setActiveStyleSheet('textsize-large');return false;}
	toolTextresizeLarge.keypress = function()
        {setActiveStyleSheet('textsize-large');return false;}
	toolTextresizeExtralarge.onclick = function()
        {setActiveStyleSheet('textsize-extralarge');return false;}
	toolTextresizeExtralarge.keypress = function()
        {setActiveStyleSheet('textsize-extralarge');return false;}
} 


/***********************************************************************/
/* Striped Tables
/***********************************************************************/

var stripe = function() {
	var tables = document.getElementsByTagName("table");	

	for(var x=0;x!=tables.length;x++){
		var table = tables[x];
		if (! table) { return; }
		
		var tbodies = table.getElementsByTagName("tbody");
				
			for (var h = 0; h < tbodies.length; h++) {
			if (tbodies[h].className == "contentframework-stripedtable"){
				var odd = true;
				var trs = tbodies[h].getElementsByTagName("tr");	
				
				for (var i = 1; i < trs.length; i++) {
					
					trs[i].onmouseover=function(){
						
						this.className += " contentframework-hoveredrow"; return false
						
					}
					
					trs[i].onmouseout=function(){
					
						this.className = this.className.replace("contentframework-hoveredrow", ""); return false
						
					}
					
					if(odd)
						
						trs[i].className += " contentframework-altrow";
						
										
					odd = !odd;
				
			}
			}
		}
	}
}


/***********************************************************************/
/* Get Element by Class
/***********************************************************************/

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


/***********************************************************************/
/* Expand/Collapse Content (Expands/Collapses a class, i.e. multiple elements)
/***********************************************************************/

function toggleIcon(obj, a_id) {
	var opener = document.getElementById(a_id);
	var content = getElementsByClass(obj);
	
	iconState = opener.firstChild.alt;
	iconState = iconState.replace("Collapse","");
	iconState = iconState.replace("Expand","");
	
	for ( i=0;i<content.length;i++ ) {
		if (content[i].style.display != "none" ) {
			content[i].style.display = 'none';
			opener.firstChild.src = opener.firstChild.src.replace("collapse","expand");
			opener.firstChild.alt = 'Expand' + iconState;
			opener.focus();
		} else {
		content[i].style.display = '';
           	opener.firstChild.src = opener.firstChild.src.replace("expand","collapse");
			opener.firstChild.alt = 'Collapse' + iconState;
		}	
		
	}
}


/***********************************************************************/
/* Expand/Collapse Content - French (Expands/Collapses a class, i.e. multiple elements)
/***********************************************************************/

function toggleIconFrench(obj, a_id) {
	var opener = document.getElementById(a_id);
	var content = getElementsByClass(obj);
	
	iconState = opener.firstChild.alt;
	iconState = iconState.replace("R\u00E9duire","");
	iconState = iconState.replace("D\u00E9velopper","");
	
	for ( i=0;i<content.length;i++ ) {
		if (content[i].style.display != "none" ) {
			content[i].style.display = 'none';
			opener.firstChild.src = opener.firstChild.src.replace("collapse","expand");
			opener.firstChild.alt = 'D\u00E9velopper' + iconState;
			opener.focus();
		} else {
		content[i].style.display = '';
           	opener.firstChild.src = opener.firstChild.src.replace("expand","collapse");
			opener.firstChild.alt = 'R\u00E9duire' + iconState;
		}	
		
	}
}


/***********************************************************************/
/* Expand/Collapse Inline Help Content
/***********************************************************************/

function toggleHelpInline(obj, a_id) {
	var content = document.getElementById(obj);
	var opener = document.getElementById(a_id);
	
	iconState = opener.lastChild.alt;
	iconState = iconState.replace("Collapse","");
	iconState = iconState.replace("Expand","");
	
		if (content.style.display != "none" ) {
			content.style.display = 'none';
			opener.lastChild.alt = 'Expand' + iconState;
			opener.focus();
		} else {
		content.style.display = '';
			opener.lastChild.alt = 'Collapse' + iconState;
		}
	
}


/***********************************************************************/
/* Expand/Collapse Inline Help Content - French
/***********************************************************************/

function toggleHelpInlineFrench(obj, a_id) {
	var content = document.getElementById(obj);
	var opener = document.getElementById(a_id);
	
	iconState = opener.lastChild.alt;
	iconState = iconState.replace("R\u00E9duire","");
	iconState = iconState.replace("D\u00E9velopper","");
	
		if (content.style.display != "none" ) {
			content.style.display = 'none';
			opener.lastChild.alt = 'D\u00E9velopper' + iconState;
			opener.focus();
		} else {
		content.style.display = '';
			opener.lastChild.alt = 'R\u00E9duire' + iconState;
		}
	
}



/***********************************************************************/
/* Expand/Collapse Absolute Help Content
/***********************************************************************/

function xstooltip_findPosX(obj) 
	{
	  var curleft = 0;
	  if (obj.offsetParent) 
	  {
		while (obj.offsetParent) 
			{
				curleft += obj.offsetLeft
				obj = obj.offsetParent;
			}
		}
		else if (obj.x)
			curleft += obj.x;
		return curleft;
	}
	
	function xstooltip_findPosY(obj) 
	{
		var curtop = 0;
		if (obj.offsetParent) 
		{
			while (obj.offsetParent) 
			{
				curtop += obj.offsetTop
				obj = obj.offsetParent;
			}
		}
		else if (obj.y)
			curtop += obj.y;
		return curtop;
	}

function toggleHelpAbsolute(obj, a_id) {
	var content = document.getElementById(obj);
	var opener = document.getElementById(a_id);	
	
	iconState = opener.lastChild.alt;
	iconState = iconState.replace("Collapse","");
	iconState = iconState.replace("Expand","");

	
		if (content.style.display != "none" ) {
			content.style.display = 'none';
			opener.lastChild.alt = 'Expand' + iconState;
			opener.focus();
		} else {
		content.style.display = '';
			opener.lastChild.alt = 'Collapse' + iconState;
		}
	
	
	if ((content.style.top == '' || content.style.top == 0) 
		&& (content.style.left == '' || content.style.left == 0))
	{
		// need to fixate default size (MSIE problem)
		content.style.width = content.offsetWidth + 'px';
		content.style.height = content.offsetHeight + 'px';		
	
		// if tooltip is too wide, shift left to be within parent 
		posX = 0;
		posY = 17;
		if (posX + content.offsetWidth > opener.offsetWidth) posX = opener.offsetWidth - content.offsetWidth;
		if (posX < 0 ) posX = 0; 
		
		x = xstooltip_findPosX(opener) + posX;
		y = xstooltip_findPosY(opener) + posY;
		
		content.style.top = y + 'px';
		content.style.left = x + 'px';
		
		content.style.position = 'absolute';
		content.style.zIndex = 2;
	
	}
	


}


/***********************************************************************/
/* Expand/Collapse Absolute Help Content - French
/***********************************************************************/


function toggleHelpAbsoluteFrench(obj, a_id) {
	var content = document.getElementById(obj);
	var opener = document.getElementById(a_id);	
	
	iconState = opener.lastChild.alt;
	iconState = iconState.replace("Collapse","");
	iconState = iconState.replace("Expand","");

	
		if (content.style.display != "none" ) {
			content.style.display = 'none';
			opener.lastChild.alt = 'D\u00E9velopper' + iconState;
			opener.focus();
		} else {
		content.style.display = '';
			opener.lastChild.alt = 'R\u00E9duire' + iconState;
		}
	
	
	if ((content.style.top == '' || content.style.top == 0) 
		&& (content.style.left == '' || content.style.left == 0))
	{
		// need to fixate default size (MSIE problem)
		content.style.width = content.offsetWidth + 'px';
		content.style.height = content.offsetHeight + 'px';		
	
		// if tooltip is too wide, shift left to be within parent 
		posX = 0;
		posY = 17;
		if (posX + content.offsetWidth > opener.offsetWidth) posX = opener.offsetWidth - content.offsetWidth;
		if (posX < 0 ) posX = 0; 
		
		x = xstooltip_findPosX(opener.lastChild) + posX;
		y = xstooltip_findPosY(opener.lastChild) + posY;
		
		content.style.top = y + 'px';
		content.style.left = x + 'px';
		
		content.style.position = 'absolute';
		content.style.zIndex = 2;
	
	}
	

}


/***********************************************************************/
/* Hide objects with "jshide" class (element is not seen by Screen Readers)
/***********************************************************************/

function hidejshideObject() {
	var jshidevar = getElementsByClass("jshide");
		
	for ( i=0;i<jshidevar.length;i++ ) {
		jshidevar[i].style.display = 'none';
	}
}


/***********************************************************************/
/* Hide objects with "jsaccessiblehide" class (element is seen by Screen Readers)
/***********************************************************************/

function hidejsaccessiblehideObject() {
	var jsaccessiblehidevar = getElementsByClass("jsaccessiblehide");
		
	for ( j=0;j<jsaccessiblehidevar.length;j++ ) {
		jsaccessiblehidevar[j].style.position = 'absolute';
		jsaccessiblehidevar[j].style.left = '-5000px';
	}
}

/***********************************************************************/
/* Tab Script
/***********************************************************************/

//** Tab Content script v2.0- © Dynamic Drive DHTML code library (http://www.dynamicdrive.com)

function ddtabcontent(tabinterfaceid){
	this.tabinterfaceid=tabinterfaceid //ID of Tab Menu main container
	this.tabs=document.getElementById(tabinterfaceid).getElementsByTagName("li") //Get all tab links within container
	this.enabletabpersistence=true
	this.hottabspositions=[] //Array to store position of tabs that have a "rel" attr defined, relative to all tab links, within container
	this.currentTabIndex=0 //Index of currently selected hot tab (tab with sub content) within hottabspositions[] array
	this.subcontentids=[] //Array to store ids of the sub contents ("rel" attr values)
	this.revcontentids=[] //Array to store ids of arbitrary contents to expand/contact as well ("rev" attr values)
	this.selectedClassTarget="link" //keyword to indicate which target element to assign "selected" CSS class ("linkparent" or "link")
}

ddtabcontent.getCookie=function(Name){ 
	var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
	if (document.cookie.match(re)) //if cookie found
		return document.cookie.match(re)[0].split("=")[1] //return its value
	return ""
}

ddtabcontent.setCookie=function(name, value){
	document.cookie = name+"="+value+";path=/" //cookie value is domain wide (path=/)
}

ddtabcontent.prototype={

	expandit:function(tabid_or_position){ //PUBLIC function to select a tab either by its ID or position(int) within its peers
		this.cancelautorun() //stop auto cycling of tabs (if running)
		var tabref=""
		try{
			if (typeof tabid_or_position=="string" && document.getElementById(tabid_or_position).getAttribute("rel")) //if specified tab contains "rel" attr
				tabref=document.getElementById(tabid_or_position)
			else if (parseInt(tabid_or_position)!=NaN && this.tabs[tabid_or_position].getAttribute("rel")) //if specified tab contains "rel" attr
				tabref=this.tabs[tabid_or_position]
		}
		catch(err){alert("Invalid Tab ID or position entered!")}
		if (tabref!="") //if a valid tab is found based on function parameter
			this.expandtab(tabref) //expand this tab
	},

	cycleit:function(dir, autorun){ //PUBLIC function to move foward or backwards through each hot tab (tabinstance.cycleit('foward/back') )
		if (dir=="next"){
			var currentTabIndex=(this.currentTabIndex<this.hottabspositions.length-1)? this.currentTabIndex+1 : 0
		}
		else if (dir=="prev"){
			var currentTabIndex=(this.currentTabIndex>0)? this.currentTabIndex-1 : this.hottabspositions.length-1
		}
		if (typeof autorun=="undefined") //if cycleit() is being called by user, versus autorun() function
			this.cancelautorun() //stop auto cycling of tabs (if running)
		this.expandtab(this.tabs[this.hottabspositions[currentTabIndex]])
	},

	setpersist:function(bool){ //PUBLIC function to toggle persistence feature
			this.enabletabpersistence=bool
	},

	setselectedClassTarget:function(objstr){ //PUBLIC function to set which target element to assign "selected" CSS class ("linkparent" or "link")
		this.selectedClassTarget=objstr || "link"
	},

	getselectedClassTarget:function(tabref){ //Returns target element to assign "selected" CSS class to
		return (this.selectedClassTarget==("linkparent".toLowerCase()))? tabref.parentNode : tabref
	},

	urlparamselect:function(tabinterfaceid){
		var result=window.location.search.match(new RegExp(tabinterfaceid+"=(\\d+)", "i")) //check for "?tabinterfaceid=2" in URL
		return (result==null)? null : parseInt(RegExp.$1) //returns null or index, where index (int) is the selected tab's index
	},

	expandtab:function(tabref){
		var subcontentid=tabref.getAttribute("rel") //Get id of subcontent to expand
		//Get "rev" attr as a string of IDs in the format ",john,george,trey,etc," to easily search through
		var associatedrevids=(tabref.getAttribute("rev"))? ","+tabref.getAttribute("rev").replace(/\s+/, "")+"," : ""
		this.expandsubcontent(subcontentid)
		this.expandrevcontent(associatedrevids)
		for (var i=0; i<this.tabs.length; i++){ //Loop through all tabs, and assign only the selected tab the CSS class "selected"
			this.getselectedClassTarget(this.tabs[i]).className=(this.tabs[i].getAttribute("rel")==subcontentid)? "sidetabs-currentpage primarytabs-currentpage" : ""
		}
		if (this.enabletabpersistence) //if persistence enabled, save selected tab position(int) relative to its peers
			ddtabcontent.setCookie(this.tabinterfaceid, tabref.tabposition)
		this.setcurrenttabindex(tabref.tabposition) //remember position of selected tab within hottabspositions[] array
	},

	expandsubcontent:function(subcontentid){
		for (var i=0; i<this.subcontentids.length; i++){
			var subcontent=document.getElementById(this.subcontentids[i]) //cache current subcontent obj (in for loop)
			subcontent.style.display=(subcontent.id==subcontentid)? "block" : "none" //"show" or hide sub content based on matching id attr value
		}
	},

	expandrevcontent:function(associatedrevids){
		var allrevids=this.revcontentids
		for (var i=0; i<allrevids.length; i++){ //Loop through rev attributes for all tabs in this tab interface
			//if any values stored within associatedrevids matches one within allrevids, expand that DIV, otherwise, contract it
			document.getElementById(allrevids[i]).style.display=(associatedrevids.indexOf(","+allrevids[i]+",")!=-1)? "block" : "none"
		}
	},

	setcurrenttabindex:function(tabposition){ //store current position of tab (within hottabspositions[] array)
		for (var i=0; i<this.hottabspositions.length; i++){
			if (tabposition==this.hottabspositions[i]){
				this.currentTabIndex=i
				break
			}
		}
	},

	autorun:function(){ //function to auto cycle through and select tabs based on a set interval
		this.cycleit('next', true)
	},

	cancelautorun:function(){
		if (typeof this.autoruntimer!="undefined")
			clearInterval(this.autoruntimer)
	},

	init:function(automodeperiod){
		var persistedtab=ddtabcontent.getCookie(this.tabinterfaceid) //get position of persisted tab (applicable if persistence is enabled)
		var selectedtab=-1 //Currently selected tab index (-1 meaning none)
		var selectedtabfromurl=this.urlparamselect(this.tabinterfaceid) //returns null or index from: tabcontent.htm?tabinterfaceid=index
		this.automodeperiod=automodeperiod || 0
		for (var i=0; i<this.tabs.length; i++){
			this.tabs[i].tabposition=i //remember position of tab relative to its peers
			if (this.tabs[i].getAttribute("rel")){
				var tabinstance=this
				this.hottabspositions[this.hottabspositions.length]=i //store position of "hot" tab ("rel" attr defined) relative to its peers
				this.subcontentids[this.subcontentids.length]=this.tabs[i].getAttribute("rel") //store id of sub content ("rel" attr value)
				this.tabs[i].onclick=function(){
					tabinstance.expandtab(this)
					tabinstance.cancelautorun() //stop auto cycling of tabs (if running)
					return false
				}
				if (this.tabs[i].getAttribute("rev")){ //if "rev" attr defined, store each value within "rev" as an array element
					this.revcontentids=this.revcontentids.concat(this.tabs[i].getAttribute("rev").split(/\s*,\s*/))
				}
				if (selectedtabfromurl==i || this.enabletabpersistence && selectedtab==-1 && parseInt(persistedtab)==i || !this.enabletabpersistence && selectedtab==-1 && this.getselectedClassTarget(this.tabs[i]).className=="selected"){
					selectedtab=i //Selected tab index, if found
				}
			}
		} //END for loop
		if (selectedtab!=-1) //if a valid default selected tab index is found
			this.expandtab(this.tabs[selectedtab]) //expand selected tab (either from URL parameter, persistent feature, or class="selected" class)
		else //if no valid default selected index found
			this.expandtab(this.tabs[this.hottabspositions[0]]) //Just select first tab that contains a "rel" attr
		if (parseInt(this.automodeperiod)>500 && this.hottabspositions.length>1){
			this.autoruntimer=setInterval(function(){tabinstance.autorun()}, this.automodeperiod)
		}
	} //END int() function

} //END Prototype assignment


/***********************************************************************/
/* Accessible script for select forms without a submit button
/***********************************************************************/

//(c)2006 Thomas Frank, Studentlitteratur

niceSelect=function(){    
  var f=document.forms;
    for (var i=0;i<f.length;i++){          // Walks all the forms in the document.
    var e=f[i].elements;
    for(var j=0;j<e.length;j++){        // Walks all the elements in the form.
      if(e[j].type=="select-one"){      // Chooses elements that are select 
                          // box (that does not allow multiple
                          // selections).
        e[j].formnu=i;
                          // Here comes the "trick" of this 
                          // script: it redefines the 
                          // event handlers of the element.
                          
        e[j].onclick=function(){      // If the selection is made
                          // with the mouse, the it
                          // behaves like a normal selectbox
                          // menu and submits). 
          this.onchange=function(){
            f[this.formnu].submit()
          }
        };
        e[j].onblur=function(){        // This "disarms" the onblur function
                          // so that it will not submit as soon
                          // as the default option is deselected
                          // (by moving down the select list with
                          // the arrow key).
          this.onchange=function(){return true}  
        };
        e[j].onkeydown=function(e){      // When keys are pressed on the keyboard...
          if (e){theEvent = e} else {theEvent=event};
          if (theEvent.keyCode==13){    // ...only submit when 'enter' is pressed.
            if((this.onchange+"").indexOf("submit")<0){
              f[this.formnu].submit()
            }
          }
        }
      }
    }
  }
}


/***********************************************************************/
/* Disclaimer page redirect
/***********************************************************************/
// Automagic disclaimer page (c) 2004 Daniel Saraga
// daniel.saraga@rbc.com 416-974-8143
// modified by Emad Jad Dec. 22, 2005 emad.jad@rbc.com
// This section separates the disclaimer URL from the destination URL

function getParams() {
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
        var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
        for (var i=0; i<pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
            }
        }
    return params;
    }
params = getParams();
// For this script to work, you must follow the below format:
// http://leonet.fg.rbc.com/english/osd/disclaimer.asp?link=http://www.rbc.com/
theURL = unescape(params["link"]);


/***********************************************************************/
/* On Load Events
/***********************************************************************/

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// Apply text resize script
addLoadEvent(applyResizeScript); 

// Apply table row banding/highlighting script
addLoadEvent(stripe); 

// Hide elements using JS
addLoadEvent(hidejshideObject); 
addLoadEvent(hidejsaccessiblehideObject); 