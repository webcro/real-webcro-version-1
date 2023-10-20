$(function () {
	//device.isAndroidTablet();
	setCalendarInputDates();
	// We need to check ie10 and ie11 this way as it doesn't support conditional comments
	if (navigator.appVersion.indexOf('MSIE 10') !== -1){
		$('html').addClass('ie10 oldie');
	}
	// Placehoder issue for ie9
	if($('.ie9').length){
		var hasPlaceholderSupport = function() {
		  var input = document.createElement('input');
		  return ('placeholder' in input);
		};
		if(!hasPlaceholderSupport()){
			var inputs = document.getElementsByTagName('input');
			for(var i=0,  count = inputs.length;i<count;i++){
				if(inputs[i].getAttribute('placeholder')){
					inputs[i].value = inputs[i].getAttribute("placeholder");
					inputs[i].onclick = function(){
						if(this.value == this.getAttribute("placeholder")){
							this.value = '';
						}
					};
					inputs[i].onblur = function(){
						if(this.value === ''){
							this.value = this.getAttribute("placeholder");
						}
					};
				}
			}
		}
	}
	//device.isAndroidTablet(); //before setCalendarInputDates();
	//
	// 
	// --------------------------------------------------------------------------
	function setCalendarInputDates() {
		var today = new Date();
		var selectedDate = today.getDate();
		var selectedMonth = today.getMonth()+1;
		var selectedYear = today.getFullYear();

		$('[data-calendar]').each(function(i, el) {
			// Month inputs
			if ($(this).data('calendar') === 'm') {
				if (this.nodeName === 'SELECT') {
					if (this[0].innerHTML !== '') {
						this.selectedIndex = selectedMonth;
					}
				}
			}
			// Day inputs
			else if ($(this).data('calendar') === 'd') {
				if (this.nodeName === 'INPUT') {
					this.setAttribute('placeholder', ''); // Needed for IE9
					this.value = selectedDate;
				}
				else if (this.nodeName === 'SELECT') {
					if (this[0].innerHTML !== '') {
						// Find the option that matches selectedMonth
						this.selectedIndex = selectedDate-1;
					}
				}
			}
			// Year inputs
			else if ($(this).data('calendar') === 'y') {
				if (this.nodeName === 'INPUT') {
					this.setAttribute('placeholder', ''); // Needed for IE9
					this.value = selectedYear;	
				}
				else if (this.nodeName === 'SELECT') {
					if (this[0].innerHTML !== '') {
						// Find the option that matches selectedYear
						for (var x = 0; x < this.length; x++) {
							if (parseInt(this[x].value) === selectedYear) {
								this.selectedIndex = x;
							}
						}
					}
				}
			}
		});
	}
	// Create an RBC object to hold functions, etc
	// --------------------------------------------------------------------------
	window.rbc = Object.create(this);
	// Instantiates a new calendar from calendar.js and calendar_encapsulated.js
	// Takes 5 strings as the IDs of the calendar icon and its container, as well as the month, day, and year fields
	window.rbc.createCalendar = function(calendarID, containerID, monthID, dayID, yearID, language, servDate) {
		var initDate = servDate || false;
		calendarID = '#'.concat(calendarID);
		monthID = '#'.concat(monthID);
		dayID = '#'.concat(dayID);
		yearID = '#'.concat(yearID);
		var selDate = new Date($(yearID).val(), $(monthID).val() - 1, $(dayID).val());

		var dictMonthsFr = {
			January: "janvier",
			February: "février",
			March: "mars",
			April: "avril",
			May: "mai",
			June: "juin",
			July: "juillet",
			August: "août",
			September: "septembre",
			October: "octobre",
			November: "novembre",
			December: "décembre"
		};
		var dictDaysFr = {
			Sunday: "Dimanche",
			Monday: "Lundi",
			Tuesday: "Mardi",
			Wednesday: "Mercredi",
			Thursday: "Jeudi",
			Friday: "Vendredi",
			Saturday: "Samedi"
		};
		var weekdaysShort = ["daySu", "dayMo", "dayTu", "dayWe", "dayTh", "dayFr", "daySa"];
		var weekdaysLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var currDateText = 'Current Date Selected';
		var langSubString = language.toLowerCase();
		var today = new Date();
		var selectedDate = today.getDate();
		var selectedMonth = today.getMonth()+1;
		var selectedYear = today.getFullYear();
		var maxYear= today.getFullYear()+3;

	
			calendar_SetVerPos(400);
			calendar_SetHorPos(500);
			calendar_SetNoGoPast();
			calendar_SetNoPastDates();
			calendar_SetStartAtReset();
			calendar_SetResetYMDDate(2015,9,9);
			calendar_TodaysDate = calendar_ResetDate;
		calendar_SetMaximumYMDDate(initDate.getFullYear()+3, 12, 31);

		// If any of these expressions are true,
		// initialDate will become a new Date object;
		// otherwise the values in the fields will be used.
		// initDate is either the servDate or
		// a new Date object from the field values
		initDate = initDate ? initDate : new Date( $(yearID).val(), $(monthID).val() - 1, $(dayID).val());

		// selDate is either input values or
		// the initDate
		if ($(yearID).val() === "" ||
			$(monthID).val() === "" ||
			$(dayID).val() === "") {
			// selDate = initDate;

			calendarPlugin.createPopupCalendar(calendarID.substring(1),
			{
				container: containerID,
				position: 'below-left',
				lang: langSubString,
				selected: initDate,
				initial: initDate,
				// createPopupCalendar() requires strings without hashtags
				day: dayID.substring(1),
				month: monthID.substring(1),
				year: yearID.substring(1),
				deny: ['past'],
				end: calendar_MaximumDate,
				//begin: initDate
			});
		}
		else {
			
			calendarPlugin.createPopupCalendar(calendarID.substring(1),
			{
				container: containerID,
				position: 'below-left',
				lang: langSubString,
				selected: selDate,
				initial: initDate,
				// createPopupCalendar() requires strings without hashtags
				day: dayID.substring(1), 
				month: monthID.substring(1),
				year: yearID.substring(1),
				deny: ['past'],
				end: calendar_MaximumDate,
				//begin: initDate
			});
		}

			if (langSubString == 'fr') {
				currDateText = 'Date sélectionée';
			}
			$('.newCalendar .calendar-1').before('<div class="calendar-info"><div class="calendar-head"><p class="current-date-text">' + currDateText + '</p></div><div class="calendar-footer"><p class="current-week-day">Thursday</p><p class="current-day">12</p><p class="current-month"></p></div>');
			// Set the .current-info data to the currently selected date
			// This is only in a try-catch because this event will also
			// fire when the user clicks to close the calendar
			try {
				var weekdayNameIndex;
				var monthNameIndex;
				var day;

			// Populate the left part of the calendar with the
			// serveDate if the fields are blank;
			// otherwise give it the currently selected date
			if ($(yearID).val() === "" ||
				$(monthID).val() === "" ||
				$(dayID).val() === "") {
				weekdayNameIndex = initDate.getDay();
				monthNameIndex = initDate.getMonth();
				day = initDate.getDate();
			}
			else {
				weekdayNameIndex = selDate.getDay();
				monthNameIndex = selDate.getMonth();
				day = selDate.getDate();
				}

				$('.current-day').html(day);
				if (langSubString == "en") {
					$('.current-week-day').html(weekdaysLong[weekdayNameIndex]);
					$('.current-month').html(monthsLong[monthNameIndex]);
				}
				else if (langSubString == "fr") {
					$('.current-week-day').html(dictDaysFr[weekdaysLong[weekdayNameIndex]]);
					$('.current-month').html(dictMonthsFr[monthsLong[monthNameIndex]]);
				}
			}
			catch(e){console.log(e);}
		
	};


	// Helper Functions
	// Prevent Default
	var rbcPreventDefault = function(event){
		event.preventDefault();
		event.stopPropagation();
		event.returnValue = false;
		return false;
	};

	// Match heights
	var equalheight = function(container){
		var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = [],
		$el,
		topPosition = 0;
		$(container).each(function() {
			$el = $(this);
			$($el).height('auto');
			topPostion = $el.position().top;

			if (currentRowStart != topPostion) {
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			}
			else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
	};
	// if ie8 or ie9 Equalize columns
	if($('.ie8, .ie9').length){
		$(window).load(function() {
			if($('#secGenProductBanner').length){
				if($('.ccadDetailsTable').length){
					$('.ccadDetailsTable').next().width($('.ccadDetailsTable').width());
				}
				else {
					$('.alignBottom').width($('.alignBottom').parent().width());
				}
				$.when(equalheight('.cardInfoCont')).then(function(){
					$('.productCardSeparator').each(function(){
						var nearLeft = $(this).prev().outerHeight();
						var nearRight = $(this).next().outerHeight();
						var tallest = (Math.max(nearLeft, nearRight));
						$(this).animate({height: tallest}, 400);
					});
				});
				$('.cardImageCont p:nth-of-type(1)').css('margin-bottom', '5px');
				$('.tableHeaderRow th:last-child, .genericTable td:last-child').css({'padding-right':'10px', 'white-space':'nowrap'});
			}
			if($('.sidebarQuickPayment').length){
				$('.sidebarQuickPayment .input-group:last').css('float','right');
			}			
			equalheight('.footerCols');
		});
	}
	// Purpose: Traverse up the hierarchy of elements, starting with the
	// element passed as an argument to this function. Will return true if
	// a matched parent element has the class "dropdown-menu". This can easily
	// be refactored to support any user-defined class name to search for.
	//
	// Note: Will only traverse up the hierarchy as far as the <body> element
	function hasParent(el) {
		if (el[0].nodeName === "BODY") {
			// The node passed to this function is the <body> element
			return false;
		}
		else {
			// The node passed as an argument is not the <body> element
			// Get the classname of the parent node, or set to undefined
			var selector = el[0].parentElement.className || undefined;

			if (selector) {
				// The current parent node has a class name
				if (selector === "dropdown-menu") {
					// The element the user is tabbing to is within a dropdown-menu
					return true;
				}
				else {
					// The parent element of this node does not have the dropdown-menu class
					return hasParent($(el).parent());
				}
			}
			else {
				// The parent element of this node does not have a class
				return hasParent($(el).parent());
			}
		}
	}
	// This solution only works on ieEdge and the rest of the browsers.  Removing temporarily
	// $('[data-toggle="tooltip"]').hover(function(){
	// 	$(this).attr({'title': $('option:selected',this).text()});
	// },function(){
	// 	$(this).attr('title', '');
	// });
	$('.tableWellBtn, .sidebarWellBtn').on('click', function tableWellBtnClick() { 
	     $(this).find('i.rbc_collapse').toggleClass('rotate180'); 
	   });

	$('.infoBtn').hover(function(){
		$(this).children('.toolTipTop').removeClass('accessible');
	},function(){
		$(this).children('.toolTipTop').addClass('accessible');
	});
	$('.toolTipTop').focus(function(){
		$(this).removeClass('accessible');
	}).blur(function(){
		$(this).addClass('accessible');
	});
	$('.closeTooltip').on('click', function(){
		$(this).parent().addClass('accessible');
	});
// Account Summary Dropdown (Quick Links)
	// Extends Bootstrap dropdown
	$.fn.rbcTooltip = function(){
		var toggle = $('.dropdown-toggle', this),
		mainParent = this,
		close = $('.closeDropdown', this),
		menu = $('.dropdown-menu', this),
		menuFirst = $('.dropdown-header');
		// This solves accessibility for top5Dropdown title
		toggle.dropdown();
		// Keypress on close button
		close.on('keypress keyup', function(event){
			// on pressing return
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				mainParent.removeClass('open');
				mainParent.find(toggle).attr('aria-expanded', 'false').focus();
				rbcPreventDefault(event);
			}
		});
		$(close).on('focusout', function(e) {
			parent = e.target.parentNode.previousSibling.previousSibling;

			if (hasParent($(e.relatedTarget)) === true) {
				$(e.relatedTarget).focus();
			}
			else {
				$(parent).focus();
			}
		});
		close.on('click', function(){
			mainParent.removeClass('open');
			mainParent.find(toggle).attr('aria-expanded', 'false').focus();
		});
		//Add focus class to first child of the dropdown-menu
		// Focus jumps to first anchor of the dropdown-menu if there's any
		// This fixes jumping issue.
		mainParent.on('shown.bs.dropdown', function(){
			if(menuFirst.length > 0){
				menuFirst.attr('tabindex', '0');
				menuFirst.focus();
			}
		});
		// On tabbing inside the menu, close when tab is out of it
		// This corrects a bug present only in Safari and provides a cross browser solution
		menu.on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			// Detect Tab on the menu
			if(keycode == '9'){
				// Detect Tab on the document and compare state
				$(document).on('keypress, keyup', function(event){
					if(keycode == '9' && menu.is(':visible')){
						if($(event.target).closest(menu).attr('class') === undefined) {
							setTimeout(function() {
								mainParent.removeClass('open');
								mainParent.find(toggle).attr('aria-expanded', 'false').focus();
							}, 0.5);
						}
					}
				});
			}
		});
		menu.on('keydown', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			// Detect when user is using arrows to navigate
			if(keycode == '37'|| keycode == '38' || keycode == '39' || keycode == '40'){
				$(document).on('keypress, keyup', function(event){
					if(keycode == '37'|| keycode == '38' || keycode == '39' || keycode == '40' && menu.is(':visible')){
						if($(event.target).closest(menu).attr('class') === undefined) {
							setTimeout(function() {
								mainParent.removeClass('open');
								mainParent.find(toggle).attr('aria-expanded', 'false').focus();
							}, 0.5);
						}
					}
				});
			}
		});
		// Prevent the dropdown to close unless click on a link
		menu.on('click', function(event){
			if(event.target.tagName.toLowerCase() === 'a'){
				event.target.returnValue = true;
				mainParent.removeClass('open');
				mainParent.find(toggle).attr('aria-expanded', 'false').focus();
			}
			else{
				rbcPreventDefault(event);
			}
		});
		// ESC key. Focus lands on trigger
		$(window).on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '27' && menu.is(':visible')){
				mainParent.removeClass('open');
				mainParent.find(toggle).attr('aria-expanded', 'false').focus();
			}
		});
	};

	//Initiate any dropdown here.  Keep html structure


	// Initiate rbcTooltip only on click (less expensive and obstrusive)
	$('.top5Dropdown').on('click keydown', function(){
		$(this).rbcTooltip();
	});
	$('.toolTip').on('click keydown', function(){
		$(this).rbcTooltip();
	});
	$('.accQuickDropdown').on('click keydown', function(){
		$(this).rbcTooltip();
		// $(this).rbcTooltip();
	});
	// Account Details Toggle
	// Different behavior than the tooltips
	$.fn.rbcDropdown = function(){
		var toggle = $('.dropdown-toggle', this),
		mainParent = this,
		close = $('.closeDropdown', this),
		menu = $('.dropdown-menu', this),
		menuFirst = $('.accToggleBank');
		toggle.dropdown();
		// Keypress on close button
		close.on('keypress keyup', function(event){
			// on pressing return
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				mainParent.removeClass('open');
				mainParent.find(toggle).removeAttr('aria-expanded').focus();
				rbcPreventDefault(event);
			}
		});
		close.on('click', function(){
			mainParent.removeClass('open');
			mainParent.find(toggle).removeAttr('aria-expanded').focus();
		});
		$(close).on('focusout', function(e) {
			parent = e.target.parentNode.previousSibling.previousSibling;

			if (hasParent($(e.relatedTarget)) === true) {
				$(e.relatedTarget).focus();
			}
			else {
				$(parent).focus();
			}
		});
		//Add focus class to first child of the dropdown-menu
		// Focus jumps to first anchor of the dropdown-menu if there's any
		// This fixes jumping issue.
		mainParent.on('shown.bs.dropdown', function(){
			if(menuFirst.length > 0){
				menuFirst.attr('tabindex', '0');
				menuFirst.focus();
			}
		});
		mainParent.on('hidden.bs.dropdown', function(){
			$(this).find(toggle).removeAttr('aria-expanded').focus();
		});
		//This prevents clicking events on the dropdown that will close it
		menu.on('click', function(event){
			if(event.target.tagName.toLowerCase() === 'a'){
				event.target.returnValue = true;
			}
			else{
				rbcPreventDefault(event);
			}
		});
		//This makes the dropdown trigger behave like an actual toggle
		toggle.on('click', function(event){
			rbcPreventDefault(event);
		});
		// On tabbing inside the menu, close when tab is out of it
		// This corrects a bug present only in Safari and provides a cross browser solution
		menu.on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			// Detect Tab on the menu
			if(keycode == '9'){
				// Detect Tab on the document and compare state
				$(document).on('keypress, keyup', function(event){
					if(keycode == '9' && menu.is(':visible')){
						if($(event.target).closest(menu).attr('class') === undefined) {
							setTimeout(function() {
								mainParent.removeClass('open');
								mainParent.find(toggle).attr('aria-expanded', 'false').focus();
							}, 0.5);
						}
					}
				});
			}
		});
		menu.on('keydown', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			// Detect when user is using arrows to navigate
			if(keycode == '37'|| keycode == '38' || keycode == '39' || keycode == '40'){
				$(document).on('keypress, keyup', function(event){
					if(keycode == '37'|| keycode == '38' || keycode == '39' || keycode == '40' && menu.is(':visible')){
						if($(event.target).closest(menu).attr('class') === undefined) {
							setTimeout(function() {
								mainParent.removeClass('open');
								mainParent.find(toggle).attr('aria-expanded', 'false').focus();
							}, 0.5);
						}
					}
				});
			}
		});
		// ESC key. Focus lands on trigger
		$(window).on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '27' && menu.is(':visible')){
				mainParent.removeClass('open');
				mainParent.find(toggle).removeAttr('aria-expanded').focus();
			}
		});
	};
	$('.accToggle').rbcDropdown();
	// Modals
	// Make the modals generic
	// Add a class of '.modalBtn' to the element that triggers the Modal
	// Keep the HTML structure.
	// The trigger can be wrapped in any tag
	// The modal needs to be sibling of the above wrapper
	//If problems, please flag and some containers need to be created
	$('.modalBtn').on('click', function(event){
		rbcPreventDefault(event);
		yepnope({
			load : ['/uos/external/modernizr/2.8.3/jquery.trap.min.js'],
			complete: function(){
				$(".trap").trap();
			}
		});
		var mainModal = $(this).closest('.modalWrapper').find('.modal');
		var modalDialog = mainModal.find('.modal-dialog');
		var header = mainModal.find('.modal-title');
		var content = mainModal.find('.modal-content');

		//Pass options to prevent default behavior
		$(mainModal).modal({
			backdrop: 'static',
			keyboard: false
		});
		// Reposition the modal function
		function reposition() {
			var modal = $(this),
				dialog = modal.find('.modal-dialog');
			modal.css('display', 'block');
			// Dividing by two centers the modal exactly, but dividing by three
			// or four works better for larger screens.
			dialog.css('margin-top', Math.max(0, ($(window).height() - dialog.height()) / 2));
		}
		// extend Modal functionality for accessibility
		function focusOnTrigger(){
			$(mainModal).modal('hide');
			$(mainModal).closest('.modalWrapper').find('.modalBtn').focus();
		}

		header.attr('id', 'modalLabel').focus();
		mainModal.attr('aria-hidden', 'false');
		content.attr('tabindex', '-1');

		$(mainModal)
			.on('show.bs.modal', reposition)
			.modal('show')
			.on('hide.bs.modal', function(){
				header.removeAttr('id');
				mainModal.attr('aria-hidden', 'true');
			});

		//Reposition when the window is resized
		$(window).on('resize', function() {
			if ($(mainModal).is(':visible'))
				$(mainModal).each(reposition);
		});
		//Add any accessibility functionality here
		//If Esc is pressed, focus on the parent btn
		$(window).on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '27' && $(mainModal).is(':visible')){
				focusOnTrigger();
			}
		});
		$('.closeModal').on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				focusOnTrigger();
			}
		}).on('click', function(){
			focusOnTrigger();
			$(this).off('click');
		});
		// Solves click outside the modal box
		$(document).on('click', function(event){
			if(!$(event.target).closest('.modal-content').length) {
				if($(mainModal).is(':visible')){
					focusOnTrigger();
					$(this).off('click');
				}
			}
		});
		// Click on data-dismiss='modal' button (Cancel Button)
		$('[data-dismiss="modal"]').on('click', function(event){
			focusOnTrigger();
		});
	});
	// Load and Prepopulate Calendar
//	if($('.rbc_calendar').length){
//		yepnope.injectJs('/uos/common/javascript/calendar_encapsulated_new.js');
//		yepnope.injectJs('/uos/common/javascript/calendar_new.js');
//	
//		//rbc.createCalendar('Calc1', 'calendar-container', 'MONTH', 'DAY', 'YEAR');
//		//rbc.createCalendar('Calc1-r1', 'calendar-container-r1', 'MONTH', 'DAY', 'YEAR');
//		//rbc.createCalendar('Calc1-recurring', 'calendar-container-r', 'MMONTH', 'MDAY', 'MYEAR');
//	}
	
	
	// Smooth Scroll for account summary products banner
	$.fn.rbcScrollTo = function(target){
		// Accessibility Extension for productCards
		// Make them Focusable
		$(this).attr('tabindex', '0');
		$(target).find('h3').attr('tabindex', '-1');
		function scrollToTarget(){
			$('html, body').animate({
					scrollTop: $(target).offset().top
			}, 600);
			$(target).find('h3').focus();
		}
		// Trigger a click event or keyboard event
		$(this).on('click', function(){
			scrollToTarget();
		}).on('keypress keyup', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				scrollToTarget();
			}
		});
	};

	// Sign in accessibility tab issue when critical error messages are present
	if($('.redNotice').length){
	 $('.redNotice').focus();   
		$('.redNotice').each(function(){
			$(this).find('a').attr('tabindex','0');
		});
	}
	else {
		// Focus when page loads
		if($('.ccUsername').length){
			$('.ccUsername').focus();
		}
		if($('.selectAccount').length){
			$('.selectAccount').focus();
		}
	}
	
	// Solves on focus for firefox.
	$('.errorLink').on('click', function(event){
		rbcPreventDefault(event);
		var link = $(this).attr('href');
		setTimeout(function() {
			$(link).focus();
		}, 200);
	}).on('keypress keyup', function(event){
		var link = $(this).attr('href');
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			rbcPreventDefault(event);
			setTimeout(function() {
				$(link).focus();
			}, 200);
		}
	});
	// Pay Multiple Bills
	// --------------------------------------------------------------------------
	// Expand leftNav animation details, would be paired with Bootstrap data-toggle="collapse" on element
	// Without data-toggle, transition would be accomplished by toggling .active, .leftNav-parent--collapsed like below,
	// and .in, aria-expanded attribute, on nearby elements
	// $('.leftNav-parent--active > span > a').on('click', function(e) {
	//  	$(this).find('i').toggleClass('active');

	// 	// Give background colour and border to parent li
	// 	$(this).parent().parent().toggleClass('leftNav-parent--collapsed');
	// });

	// pbtf Recurring Payment input boxes only appear when "Once" isn't selected
	// Assuming first option is most reliably the single-payment option
	$('#paytransfer').on('change', function(e) {
		if ($(this).children('option:first-child').is(':selected')) {
			$('.input-group--recurring').slideUp('fast');
		} else {
			$('.input-group--recurring').slideDown('fast');
		}
	});
	// US62516 Enhance Printout of Account Summary
	  var prepForPrint = function prepForPrint() {
	    var products = $('.accProductDetail');
	    products.map(function fn() {
	      // if non tables are found in a product section, add noprint class
	      if ($(this).find('table').length === 0) {
	        $(this).addClass('noprint');
	      }
	    });
	  };
	  prepForPrint();

	  // US52088 Hide Messagebar when dismissed / closed
	  window.rbc.closeMessageBar = function closeMessageBar() {
	    var messageBar = $('.msgbar');
	    messageBar.addClass('msgbar__hidden');
	  };
	  window.rbc.showMessageBar = function showMessageBar() {
	    var messageBar = $('.msgbar');
	    messageBar.removeClass('msgbar__hidden');
	  };
	  
	// Strip markup formatting from accToggle tooltip
	  var $accToggleButton = $('.accToggle .dropdown-toggle');
	  if ($accToggleButton && $accToggleButton.prop('title')) {
	    $accToggleButton.prop('title', $accToggleButton.prop('title').replace(/ ?<sup>.*?<\/sup> ?/g, ' '));
	  }
	    // Dynamically set positioning of accQuickDropdown "Close" relative to an element outside its container
	    // "Close" is supposed to cover "Options" toggle text but doesn't replace that element, to keep delicate current tabbing, focus, screen reader behaviour in place
	  function adjustCloseDropdownPosition() {
	      var closeDropdown = $('.accQuickDropdown .closeDropdown');
	      closeDropdown.each(function adjustPosition() {
	       var close = $(this);
	        var toggle = close.parent().siblings('.dropdown-toggle');
	        var fontAndPadding = 25;
	        close.css('top', -(toggle.height() / 2 + fontAndPadding));
	     });
	    }
	    adjustCloseDropdownPosition();
	    
	  // Fires just before the smart app banner shows.  
	// Cancel the showing of the banner for Android tablets.  
	window.addEventListener('beforeinstallprompt', function beforeInstallPrompt(e) {  
	if (device.isAndroidTablet()) {  
		e.preventDefault();  
		return false;  
	}  
	return true;  
  });  
 
// Create a Device object and have it hold an isAndroidTablet() method  
// Will deem a device as a "tablet" if its pixel ratio is above 1.5  
// and the width of the device (halved) is greater than 600.  
var device = {} || window.device;  
device.isAndroidTablet = function isAndroidTablet() {  
 var isAndroid = /Android/;  
 var notMobile = /Mobile/;  
 
 if (isAndroid.test(navigator.userAgent) && !notMobile.test(navigator.userAgent)) {  
   return true;  
 }  
 return false;  
};  

});

