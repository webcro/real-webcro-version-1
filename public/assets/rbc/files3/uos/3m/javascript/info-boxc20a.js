(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {
    var $window = $(window);

    var applyStaticSizes = function() {
      $('.info-box').each(function() {
        // set widths
        if($(this).attr('data-width')) {
          $(this).find('.info-box__helper').css('width', $(this).attr('data-width'))
        }
      });
    };

    var recalcTopOffset = function() {
      $('.info-box').each(function() {
        var offsetTop = $(this).offset().top;
        var height = $(this).find('.info-box__helper').height();
        if((height + 30) > offsetTop) {
          $(this).attr('data-height-fix', 'true');
        } else {
          if($(this).attr('data-height-fix')) {
            $(this).removeAttr('data-height-fix');
          }
        }
      })
    };

    var recalcSizes = function() {
      if($window.width() < 590) {
        $('div[data-width] .info-box__helper').css('width', '100%');
      } else {
        applyStaticSizes();
      }
      recalcTopOffset();
    };

    recalcSizes();
    $window.on('resize', recalcSizes);

    $window.on('keyup', function(event) {
      if(event.keyCode === 27) {
        $('.info-box').addClass('info-box--hidden').removeAttr('data-open')
      }
    });


    // Show and hide info boxes
    $('.info-box__trigger').on('click', function() {
      if (!$(this).hasClass('info-box__trigger')) {
        return;
      }

      var currentInfo = $(this).closest('.info-box');

      function closeInfoBox() {
        currentInfo.removeAttr('data-open');
        currentInfo.addClass('info-box--hidden');
        currentInfo.find('.info-box__trigger').removeAttr('aria-describedby').focus();
      }
      if (currentInfo.attr('data-open')) {
        closeInfoBox();
        return false;
      }

      $('.info-box').addClass('info-box--hidden').removeAttr('data-open');
      currentInfo.removeClass('info-box--hidden').attr('data-open', 'true');

      var helper = currentInfo.find('.info-box__helper');
      if (helper.prop('id')) {
        $(this).attr('aria-describedby', helper.prop('id'));
      }
      var header = currentInfo.find('h2');
      if (header.length) {
        header.focus();
      }
      else {
        helper.focus();
      }

      recalcTopOffset();

      currentInfo.find('.info-box__close').on('click', function() {
        closeInfoBox();
        $(this).off('click');
        return false;
      });

      return false;
    });

});

},{}]},{},[1])