/* LOAD READY FUNCTIONS */
var CreditCardHomepage = 0;
$(document).ready(function() {
	if((navigator.userAgent.indexOf('MSIE 6') >= 0) ? true : false) { }
	else {
		CheckLoadPreference();
		if ($('.footer-pullup-wpr').length > 0) {
			//FooterTrigger();
			WidthChange();
		}
	}
	// IntelliResponse form submission opens new window
    $('.ir-form').unbind('submit.ir').bind('submit.ir', function() {
        var url = this.action + "?" + $(this).serialize();
        popup(url, w=815, h=516);
        return false;
    });
    
    $('.globalfooter-tool').click(function(){ WidthChange(); });
});

function CheckLoadPreference() {
	var PageType = $('#globalheader').attr('class');
	var CurrentURL = window.location.pathname;
	var CurrentQuery = window.location.search;
	
	if (PageType == 'clear' && $('#header').length != 0) {
		if (CurrentURL.indexOf('http://www.rbcroyalbank.com/business/') >= 0 || CurrentURL.indexOf('http://www.rbcroyalbank.com/commercial/') >= 0 || CurrentURL.indexOf('http://www.rbcroyalbank.com/franchise/') >= 0 || CurrentURL.indexOf('business-select.html') >= 0 || CurrentQuery.indexOf('?business') >= 0 ) {	}
		else {
			$('#globalheader-logo').css({'position':'absolute', 'top':'12px', 'left':'12px', 'z-index':'1050'});
			$('#globalheader').css('padding','0');
			$('.tool-textresize-class, #tool-totop, #globalfooter-searchbar').hide();
			$('#header, #tool-totop-standard, .footer-pullup-wpr, #FooterTabTrigger').show();
			CreditCardSelectCallOutTrigger();
		}
	}
	if ($('#mainnav-overlay').length != 0) { OverlayTrigger(); }
}

/**** **** HEADER STARTS **** ***/
/**** **** HEADER OVERLAY STARTS **** ***/
function OverlayTrigger() {
	var MainMenuStart;
	$('#mainnav-overlay ul li').mouseover(function() {
		var ThisElement = $(this);
		var MouseTabPosition = ThisElement.index();
	
		// timed event starts //
		MainMenuStart = setTimeout(function() {
			$('#mainnav-overlay ul li').removeClass('hover');
			if (!ThisElement.hasClass('nodd')) {
				ThisElement.addClass('hover');
				$('.mainnav-overylay-category-wpr').show();
				$('ul#mainnavOverlay').children('li').hide().eq(MouseTabPosition).fadeTo(200, 1);
		
				$('ul#mainnavOverlay li .buttonfloatright').hide(); // IE7 issue fix //
				$('ul#mainnavOverlay').children('li').eq(MouseTabPosition).find('.buttonfloatright').show(); // IE7 issue fix //
			}
			if (ThisElement.hasClass('nodd')) {
				$('.mainnav-overylay-category-wpr').hide();
				$('ul#mainnavOverlay').children('li').hide().eq(MouseTabPosition).fadeTo(200, 1);
			}

			// Credit Card Interactive Callout Box //
			$('#choose_card_go_btn_id').hide();
			$('#choose_card_dd_id').val('');
		}, 50);
		// timed event ends //
	});
	$('#mainnav-overlay ul li, .mainnav-overylay-category-wpr').mouseover(function(event) { event.stopPropagation(); });
	$('#mainnav-overlay ul li, .mainnav-overylay-category-wpr').mouseout(function() { clearTimeout(MainMenuStart); });
	$(document).mouseover(function(){ MainNavRemoveHoverState(); });
}

function MainNavRemoveHoverState() {
	$('#mainnav-overlay ul li').removeClass('hover');
	$('.mainnav-overlay-header p.buttonfloatright').hide();
	$('.mainnav-overylay-category-wpr').hide(); /* IE7 issue fix */
}

/**** **** CREDIT CARD DROPDOWN STARTS **** ***/
function CreditCardSelectCallOutTrigger() {
	$('#choose_card_go_btn_id').hide();
	$('#choose_card_dd_id').val('');
	$('#choose_card_go_btn_id').click(function () {
		var GetValue = $('#choose_card_dd_id').val();
		if(CreditCardHomepage == 1 && CreditCardUserType == 0) { TriggerSelector(GetValue); }
		else { 
			if(GetValue == "personal") window.location = 'http://www.rbcroyalbank.com/credit-cards/all-credit-cards/'; 
			else window.location = '/credit-cards/all-credit-cards/#/' + GetValue; 
		}
	});
	$('#choose_card_dd_id').change(function () {
		if ($('#choose_card_dd_id').val() == '') {
			$('#choose_card_go_btn_id').hide();
			$('#choose_card_go_btn_disabled_id').show();
		}
		else {
			$('#choose_card_go_btn_id').show();
			$('#choose_card_go_btn_disabled_id').hide();
		}
	});
}

/**** **** DOMAIN SWITCH STARTS **** ***/
function DomainSwitchToggle() {
	var DomainSwitchTopPosition = $('#DomainSwitchTabTrigger').offset();
	var DomainSwitchHeight = $('#DomainSwitchTabTrigger').height();
	$('#DomainSwitchContentWpr').css('top', (DomainSwitchHeight + DomainSwitchTopPosition.top + 4) + 'px');
	if($('#DomainSwitchContentWpr').css('display') == 'none') {
		$('#DomainSwitchContentWpr').show();
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger span').css('background-position','bottom left');
	}
	else {
		$('#DomainSwitchContentWpr').hide();
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger span').css('background-position','top left');
	}
}

/**** **** LANGUAGE TOGGLE STARTS **** ***/
function LanguageToggle() {
	if($('#LanguageToggleWpr').css('display') == 'none') { $('#LanguageToggleWpr').show(); }
	else { $('#LanguageToggleWpr').hide(); }
}

/**** **** FIXES Z-INDEX IE7 STARTS **** ***/
$(function() {
	var zIndexNumber = 1000;
	$('#wrapper').children('div').each(function() {
		$(this).css('zIndex', zIndexNumber);
		zIndexNumber -= 10;
	});
});

/**** **** FOOTER STARTS **** ***/
function ChangeTextareaText() {
	if ($('#questionCallOut').html() == 'Enter your question here...') { $('#questionCallOut').html('').css('color','#000'); }
	else { $('#questionCallOut').select(); }
}

function InputSelect() {
	if ($('.askFields #question').val() == 'Enter your question here...') { $('.askFields #question').val('').css('color','#000'); }
	if ($('.askFields #question').val() != '' && $('.askFields #question').val() != 'Enter your question here...') { $('.askFields #question').select(); }
}

/* Switching between Ask and Search */
function AskSearchToggle() {
	if ($('input#showfield_search_id').attr('checked')) {
		$('.askFields').hide(); $('.searchFields').show();
		$('.radio-ask-wpr label').css('font-weight','normal'); $('.radio-search-wpr label').css('font-weight','bold');
	}
	else {
		$('.askFields').show(); $('.searchFields').hide();
		$('.radio-ask-wpr label').css('font-weight','bold'); $('.radio-search-wpr label').css('font-weight','normal');
	}
}

function checkQ() {
	var fields = $('.askFields #question').val();
	
	if (fields.indexOf('href=') >= 0) {
		$('.askFields #question').val('');
		return false;
	}
	else if (fields.indexOf('url=') >= 0) {
		$('.askFields #question').val('');
		return false;
	}
	else if (fields.indexOf('Enter your question here...') >= 0) {
		$('.askFields #question').val('');
		return false;
	}
	else {
	
	$('.ir-form').submit();
	
	}
}

/* Open Top Ten window and adjust position */
function ToggleTopTen() {
	var PositionDiv = $('.topTenList').height() - 9;
	if ($('.topTenList').css('display') == 'none') { $('.topTenList').css({'margin-top':'-' + (PositionDiv) + 'px','margin-right': ($('.askFields .btn-wrp-area').width() + 12) + 'px'}).fadeTo('fast', 1); }
	else { $('.topTenList').fadeOut('fast'); }
}

/* Adjust Footer's position */
function FooterAdjust() { 
	if ($('.footer-pullup-wpr').css('bottom') != '0px') { $('.footer-pullup-wpr').css('bottom','-' + ($('.footer-pullup-content-wpr').height() + 18) + 'px'); }
}

/* Toggle between footer state */
function FooterToggle() {
	if ($('.footer-pullup-wpr').css('bottom') != '0px') {
		$('.footer-pullup-wpr').animate({bottom:'0'}, 300);
		$('#FooterTabTrigger').animate({bottom: $('.footer-pullup-wpr').height() + 'px'}, 300);
		$('.footer-pullup-link').html('Hide<img src="/uos/_assets/images/overlays/icon-collapse.gif" alt="" />').attr('title','Hide');
	}
	else {
		$('.footer-pullup-wpr').animate({bottom: '-' + ($('.footer-pullup-content-wpr').height() + 18) + 'px'}, 300);
		$('#FooterTabTrigger').animate({bottom: 0}, 300);
		$('.footer-pullup-link').html('Show<img src="/uos/_assets/images/overlays/icon-expand.gif" alt="" />').attr('title','Show');
	}
}

/* Changes width of the input field and top ten trigger link - used pixel width to get more accurate width in all browser */
function WidthChange() {
	if ($('.footer-pullup-wpr').css('bottom') != '0px') { $('#FooterTabTrigger').css('bottom', '0'); }
	else { $('#FooterTabTrigger').css('bottom', $('.footer-pullup-wpr').height() + 'px'); }
	if (CurrentTextSize() == 'textsize-extralarge') {
		$('td.askFields .input-wpr input').css('width','219px');
		$('.input-wpr p.topten').css({'width':'93px', 'height':'22px'});
		$('td.askBtnBg .btn-wrp-area button').css('width','50px');
		$('td.searchFields .input-wpr input').css('width','288px');
		$('td.searchBtnBg .btn-wrp-area button').css('width','82px');
		$('.social-icon-list-wpr').css('width','300px');
		$('.topTenList').css('width','340px');
		$('#HeaderLanguageToggle_OverlayContent').css({'width':'100px','top':'31px'});
		$('#DomainSwitchWrp').css('width','360px');
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger strong').css('font-size','14px');
		$('#HeaderLanguageToggle_OverlayContent .rbc-overlay-trigger').css('margin-top','-6px');
		$('#HeaderLanguageToggle_OverlayContent .rbc-overlay-content').css('font-size','16px');
		$('.mainnav-overlay-header').css('height','38px');
		if((navigator.userAgent.indexOf('MSIE 7') >= 0) ? true : false) { 
			$('td.btn-wrp .btn-overlay .button span button').css('margin-top','0px');
			$('.social-icon-footer-wpr span.icon').css('margin-top','3px'); // center button in IE7 //
		}
		if ((navigator.userAgent.indexOf('MSIE 7') >= 0) ? true : false) { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 31; }
		else if ((navigator.userAgent.indexOf('MSIE 8') >= 0) ? true : false) { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 31; }
		else { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 33; }
	}
	else if (CurrentTextSize() == 'textsize-large') {
		$('td.askFields .input-wpr input').css('width','210px');
		$('.input-wpr p.topten').css({'width':'72px', 'height':'20px'});
		$('td.askBtnBg .btn-wrp-area button').css('width','40px');
		$('td.searchFields .input-wpr input').css('width','268px');
		$('td.searchBtnBg .btn-wrp-area button').css('width','62px');
		$('.social-icon-list-wpr').css('width','260px');
		$('.topTenList').css('width','310px');
		$('#HeaderLanguageToggle_OverlayContent').css({'width':'80px','top':'24px'});
		$('#DomainSwitchWrp').css('width','350px');
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger strong').css('font-size','13px');
		$('#HeaderLanguageToggle_OverlayContent .rbc-overlay-trigger').css('margin-top','-2px');
		$('#HeaderLanguageToggle_OverlayContent .rbc-overlay-content').css('font-size','13px');
		$('.mainnav-overlay-header').css('height','36px');
		if((navigator.userAgent.indexOf('MSIE 7') >= 0) ? true : false) { 
			$('td.btn-wrp .btn-overlay .button span button').css('margin-top','0px');
			$('.social-icon-footer-wpr span.icon').css('margin-top','1px'); // center button in IE7 //
		}
		if ((navigator.userAgent.indexOf('MSIE 7') >= 0) ? true : false) { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 30; }
		else if ((navigator.userAgent.indexOf('MSIE 8') >= 0) ? true : false) { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 30; }
		else { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 30; }
	}
	else {
		$('td.askFields .input-wpr input').css('width','200px');
		$('.input-wpr p.topten').css({'width':'62px', 'height':'20px'});
		$('td.askBtnBg .btn-wrp-area button').css('width','30px');
		$('td.searchFields .input-wpr input').css('width','248px');
		$('td.searchBtnBg .btn-wrp-area button').css('width','52px');
		$('.social-icon-list-wpr').css('width','250px');
		$('.topTenList').css('width','290px');
		$('#HeaderLanguageToggle_OverlayContent').css({'width':'80px','top':'24px'});
		$('#DomainSwitchWrp').css('width','330px');
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger strong').css('font-size','12px');
		$('#HeaderLanguageToggle_OverlayContent .rbc-overlay-trigger').css('margin-top','1px');
		$('#HeaderLanguageToggle_OverlayContent .rbc-overlay-content').css('font-size','11px');
		$('.mainnav-overlay-header').css('height','32px');
		if((navigator.userAgent.indexOf('MSIE 7') >= 0) ? true : false) {
			$('td.btn-wrp .btn-overlay .button span button').css('margin-top','1px');
			$('.social-icon-footer-wpr span.icon').css('margin-top','-1px'); // center button in IE7 //
		}
		if ((navigator.userAgent.indexOf('MSIE 7') >= 0) ? true : false) { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 26; }
		else if ((navigator.userAgent.indexOf('MSIE 8') >= 0) ? true : false) { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 26; }
		else { var FooterBorderWidth = 976 - $('.footer-pullup-tab').width() - 28; }
	}
	$('.footer-border-top').css('width',FooterBorderWidth + 'px');
	//DomainSwitch Width Fix
	$('input#showfield_ask_id').attr('checked',true);
	$('.radio-btn input').click(function () { AskSearchToggle(); });
	$(document).click(function(){
		FooterAdjust();
		$('.topTenList').fadeOut('fast');
		$('#DomainSwitchContentWpr, #LanguageToggleWpr').hide();
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger span').css('background-position','top left');
	});
	$('.topTenList, .topten a, #DomainSwitchContentWpr, #DomainSwitchWrp, #LanguageToggleWpr').click(function(event){ event.stopPropagation(); });
}

function CurrentTextSize() {
	var CurrentFontSize = readCookie("stylesheetsetting");
	return CurrentFontSize;
};

function FooterTrigger() {
	//$('#wrapper').css('padding-bottom', $('.footer-pullup-tab').height() + '42px');
	//$('#FooterTabTrigger').css('bottom', $('.footer-pullup-wpr').height() + '30px');
	$("#wrapper").css('bottom','0px');
	//$(".topTenList").css('margin-top','-242px');
	// IntelliResponse Top 10 overlay(s) //
	$.get('/cgi-bin/intelliresponse/ask.cgi/top10/popup_links', function(data){
		if (data.indexOf('sorry for the inconvenience') >= 0) {	$('.top10-wrapper').html('<p>Sorry, we are experiencing technical difficulties.</p>'); }
		else {
			$('.top10-wrapper').html(data);
			var PositionDiv = ($('.topTenList').height()) - ($('.footer-pullup-link').height()) + 5;
			$('.top10-wrapper ul li a span').click(function () { 
				var GetQuestion = $(this).html();
	
				if ($(this).parent().parent().parent().attr('id') == 'CalloutTop10') { $('#questionCallOut').html(GetQuestion).css('color','#000'); }
				else { $('#question').val(GetQuestion).css('color','#000'); }
	
				$('.topTenList, #credit-cards-ask-overlay').hide();
			});
			
			$('.topTenList').css({'margin-top':'-' + (PositionDiv) + 'px','margin-right': ($('.askFields .btn-wrp-area').width() + 12) + 'px'});
		}
	});
	$('input#showfield_ask_id').attr('checked',true);
	$('.radio-btn input').click(function () { AskSearchToggle(); });
	$(document).click(function(){
		FooterAdjust();
		$('.topTenList').fadeOut('fast');
		$('#DomainSwitchContentWpr, #LanguageToggleWpr').hide();
		$('#DomainSwitchWrp a#DomainSwitchTabTrigger span').css('background-position','top left');
	});
	$('.globalfooter-tool').click(function(){ WidthChange(); });
	$('.topTenList, .topten a, #DomainSwitchContentWpr, #DomainSwitchWrp, #LanguageToggleWpr').click(function(event){ event.stopPropagation(); });
	//Remove FooterTrigger from "Top Ten" Call
	document.getElementById("uos-footer-top-ten-button-first").href = "javascript:ToggleTopTen();";
	document.getElementById("uos-footer-top-ten-button-second").href = "javascript:ToggleTopTen();";
    // IntelliResponse form submission opens new window
    $('.ir-form').unbind('submit.ir').bind('submit.ir', function() {
        var url = this.action + "?" + $(this).serialize();
        popup(url, w=815, h=516);
        return false;
    });
}

/* Text Resize fix for the new Header/Footer */
function applyResizeScriptNew() {
    if(!document.getElementById) { return; }    	
	 var toolTextresizeNormalNew = document.getElementById("tool-textresize-normal-new");
	var toolTextresizeLargeNew = document.getElementById("tool-textresize-large-new");
	var toolTextresizeExtralargeNew = document.getElementById("tool-textresize-extralarge-new");
	
	if (!toolTextresizeNormalNew) { return; }
	if (!toolTextresizeLargeNew) { return; }
	if (!toolTextresizeExtralargeNew) { return; }
           
    toolTextresizeNormalNew.onclick = function()
        {setActiveStyleSheet('', 1); return false;}
	toolTextresizeNormalNew.keypress = function()
        {setActiveStyleSheet('', 1); return false;}
	toolTextresizeLargeNew.onclick = function()
        {setActiveStyleSheet('textsize-large');return false;}
	toolTextresizeLargeNew.keypress = function()
        {setActiveStyleSheet('textsize-large');return false;}
	toolTextresizeExtralargeNew.onclick = function()
        {setActiveStyleSheet('textsize-extralarge');return false;}
	toolTextresizeExtralargeNew.keypress = function()
        {setActiveStyleSheet('textsize-extralarge');return false;}
} 

addLoadEvent(applyResizeScriptNew);
/* Spacer for footer search bar when shown */
$(document).ready(function(){
   $("#wrapper").css('padding-bottom','21px');
 });
