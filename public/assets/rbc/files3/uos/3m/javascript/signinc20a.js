$(document).ready(function signIn() {
  var $overlay = $('.dropdown-overlay');
  var $instBtn = $('#header-institutional');
  var $instDropdown = $('#institutional-dropdown');
  var $instOverlay = $('#header-overlay');
  var $instUl = $('#nav-ul');
  var $langBtn = $('#header-lang');
  var $langDropdown = $('#lang-dropdown');
  var $langOverlay = $('#lang-overlay');
  var $canEn = $('#lang-can-en');
  var $canFr = $('#lang-can-fr');
  var $searchBtn = $('.search-trigger');
  var $searchCloseBtn = $('#search-close');
  var $searchOverlay = $('#signinSearch');
  var $body = $('body');

  $overlay.hover(function instListHover(e) {
    if (e.target.id === $langOverlay.attr('id') || e.target.id === $langDropdown.attr('id') || e.target.id === $langBtn.attr('id')) {
      $langBtn.attr('aria-expanded', true);
      $langDropdown.removeClass('hidden');
    } else if (e.target.parentElement.id === $instOverlay.attr('id') || e.target.parentElement.id === $instUl.attr('id')) {
      $instBtn.attr('aria-expanded', true);
      $instDropdown.removeClass('hidden');
    }
  }, function instListBlur() {
    $langBtn.attr('aria-expanded', false);
    $langDropdown.addClass('hidden');
    $instBtn.attr('aria-expanded', false);
    $instDropdown.addClass('hidden');
  });

  $instBtn.click(function instBtnClick() {
    $instBtn.attr('aria-expanded', true);
    $instDropdown.removeClass('hidden');

    $overlay.on('keypress keyup', function menuKeypressUp(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      // Detect Tab on the menu
      if (keycode === 9) {
        // Detect Tab on the document and compare state
        $(document).on('keypress, keyup', function documentKeypressUp(event2) {
          if (keycode === 9 && $overlay.is(':visible')) {
            if ($(event2.target).closest($overlay).attr('class') === undefined) {
              $instBtn.attr('aria-expanded', false);
              $instDropdown.addClass('hidden');
            }
          }
        });
      }
    });
  });

  $langBtn.click(function instBtnClick() {
    $langBtn.attr('aria-expanded', true);
    $langDropdown.removeClass('hidden');

    $overlay.on('keypress keyup', function menuKeypressUp(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      // Detect Tab on the menu
      if (keycode === 9) {
        // Detect Tab on the document and compare state
        $(document).on('keypress, keyup', function documentKeypressUp(event2) {
          if (keycode === 9 && $overlay.is(':visible')) {
            if ($(event2.target).closest($overlay).attr('class') === undefined) {
              $langBtn.attr('aria-expanded', false);
              $langDropdown.addClass('hidden');
            }
          }
        });
      }
    });
  });

  $langBtn.on('keypress', function instBtnClick(e) {
    if (e.which === 13) {
      $langBtn.attr('aria-expanded', true);
      $langDropdown.removeClass('hidden');

      $overlay.on('keypress keyup', function menuKeypressUp(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        // Detect Tab on the menu
        if (keycode === 9) {
          // Detect Tab on the document and compare state
          $(document).on('keypress, keyup', function documentKeypressUp(event2) {
            if (keycode === 9 && $overlay.is(':visible')) {
              if ($(event2.target).closest($overlay).attr('class') === undefined) {
                $langBtn.attr('aria-expanded', false);
                $langDropdown.addClass('hidden');
              }
            }
          });
        }
      });
    }
  });

  if ($canEn.hasClass('active-lang')) {
    $canEn.attr('tabindex', '-1');
    $canEn.attr('aria-disabled', true);
  }

  if ($canFr.hasClass('active-lang')) {
    $canFr.attr('tabindex', '-1');
    $canFr.attr('aria-disabled', true);
  }

  function closeSearchOverlayCleanup() {
    $searchOverlay.find('#question').val(''); // clear previous user entered value
    $searchOverlay.addClass('hidden');
    $searchOverlay.off('keypress keydown'); // now the search overlay is closed stop listening for keypress
    $searchOverlay.attr('aria-hidden', true);
    $body.removeClass('overlay-visible-body');
    $('.signinOverlay').removeClass('overlay-visible');
    $('.signInHeader').attr('aria-hidden', 'false');
    $('#rbcWrapper').attr('aria-hidden', 'false');
    $('#signInPage').attr('aria-hidden', 'false');
    $('.main-legal').attr('aria-hidden', 'false');
  }

  function trapFocus($context) {
    var focusableElements = $context.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
    var firstItem = focusableElements[0];
    var lastItem = focusableElements[focusableElements.length - 1];

    $context.on('keypress keydown', function searchOverlayKeypressDown(e) {
      var ESC = 27;
      var TAB = 9;

      var isESC = e.keyCode === ESC;
      if (isESC) {
        closeSearchOverlayCleanup();
      }

      var isTab = e.keyCode === TAB;
      var isShiftKey = e.shiftKey;
      var currentFocus = document.activeElement;
      var isLastItem = (currentFocus === lastItem);
      var isFirstItem = (currentFocus === firstItem);

      if (isTab && !isShiftKey && isLastItem) {
        e.preventDefault();
        firstItem.focus();
      }

      if (isTab && isShiftKey && isFirstItem) {
        e.preventDefault();
        lastItem.focus();
      }
    });
  }


  function onSearchActivate() {
    $searchOverlay.removeClass('hidden');
    $searchOverlay.attr('aria-hidden', false);
    $body.addClass('overlay-visible-body');
    $('.signinOverlay')
      .addClass('overlay-visible')
      .on('click', function signinOverlayClick() {
        closeSearchOverlayCleanup();
      });
    $('.signInHeader').attr('aria-hidden', 'true');
    $('#rbcWrapper').attr('aria-hidden', 'true');
    $('#signInPage').attr('aria-hidden', 'true');
    $('.main-legal').attr('aria-hidden', 'true');
    $searchOverlay.find('#question').focus();
    trapFocus($searchOverlay);
  }


  $searchBtn.click(onSearchActivate);
  $searchBtn.on('keypress keydown', function(e) {
    var RETURN = 13;
    var isReturn = e.keyCode === RETURN;
    if (isReturn) {
      e.preventDefault();
      onSearchActivate();
    }
  });


  $searchCloseBtn.click(function closeSearchBtnClick() {
    closeSearchOverlayCleanup();
  });
});