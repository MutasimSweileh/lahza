/*!
 *
 * Copyright (c) 2017 Trillim.
 */

(function($) {

  // Using strict mode
  "use strict";

  var body = $('body');
  var preloader = $('.preloader');

  // ----------------------------------------------------------------------
  // Hide .preloader if content of page is loaded
  // ----------------------------------------------------------------------
  preloader.fadeOut('slow');
  body.css('overflow-y', 'visible');

  // ----------------------------------------------------------------------
  // Change logo when scrolling and class .navbar-stick is active
  // ----------------------------------------------------------------------
  /*$(window).on('load scroll', function() {
    if($('.navbar').hasClass('navbar-stick')) {
      $('.brand-logo').attr('src', 'assets/img/brand/logo-stick.png');
    }else {
      $('.brand-logo').attr('src', 'assets/img/brand/logo.png');
    }
    // IE FIX
    if($('.navbar').offset().top < 70) {
      $('.brand-logo').attr('src', 'assets/img/brand/logo.png');
    }
  });*/

  // ----------------------------------------------------------------------
  // Add navbar-stick class on scroll
  // ----------------------------------------------------------------------
  $(window).on('scroll', function() {
    var nav = $('.navbar-fixed-top');

    if (!nav.length) return; // Check if class is exist

    var navFixedPosition = nav.offset().top; // Get the position of navbar
    var scrollTop = $(window).scrollTop(); // Get the space between top of page and position of navbar

    if (navFixedPosition > 100) { // If user is scrolled
      if ($('.collapse.in').length > 0) return;
      nav.addClass('navbar-stick');
    } else {
      nav.removeClass('navbar-stick');
    }

  });

  // ----------------------------------------------------------------------
  // Smooth page scroll
  // ----------------------------------------------------------------------
  $('#header a[href^="#"], #hero a[href^="#"], #cta a[href^="#"]').on("click", function(event) {
    event.preventDefault();
    // remove old .active classes
    $(this).parent().parent().children().removeClass('active');

    $(this).parent().addClass('active');
    if (this.hash != '') {
      $('html, body').animate({
          scrollTop: $(this.hash).offset().top - 70
        },
        1000);
    }

    console.log($(this).parent().parent().children('.active'));

  });


  // ----------------------------------------------------------------------
  // Scroll Spy
  // ----------------------------------------------------------------------
  $('body').scrollspy({
    'target': '#navbar',
    'offset': 100
  });

  // ----------------------------------------------------------------------
  // If navbar Mobile Menu is showed add a dark background to #navbar
  // Or if .navbar-stick is active then add light background
  // ----------------------------------------------------------------------
  $('#header').on('show.bs.collapse', function() {
    if ($('.navbar-stick').length == 0) {
      $(this).addClass('dark');
    } else {
      $(this).addClass('light');
    }
  });

  $('#header').on('hide.bs.collapse', function() {
    $(this).removeClass('dark light');
  });

  // ----------------------------------------------------------------------
  // If faq section .panel-body is showed add a dark dark shadow to .panel
  // ----------------------------------------------------------------------
  $('#faq .panel').on('show.bs.collapse', function() {
    $(this).addClass('dark-shadow');
  });

  $('#faq .panel').on('hide.bs.collapse', function() {
    $(this).removeClass('dark-shadow');
  });


  // ----------------------------------------------------------------------
  // Newsletter Subscribe Handling
  // ----------------------------------------------------------------------

  /**
   * Email Validation.
   * @param {string} email address.
   * @return {boolean} true if email is valid, otherwise return false.
   */
  function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }

  var newsletterForm = $('#newsletter-form');
  var newsletterFormUrl = newsletterForm.attr('action');
  var newsletterFormEmail = $('.newsletter-email');
  newsletterForm.submit(function(event) {
    event.preventDefault();
    // disable submit button
    $( newsletterForm ).find( 'button[type="submit"]' ).attr( 'disabled', 'disabled' );

    // Check if value of field is correct email address
    if (validateEmail(newsletterFormEmail.val())) {
      $('#newsletter-response').addClass('alert alert-info');
      $('#newsletter-response').html('خاصية اشتراك معطلة في العرض التجريبي للقالب.');
      // reset form
      setTimeout( function () {
        $( '#newsletter-response' ).html( '' );
        $( '#newsletter-response' ).removeClass('alert alert-info');
        $( newsletterForm ).get( 0 ).reset();
        $(newsletterForm).find( 'button[type="submit"]' ).removeAttr('disabled')
      }, 4000 );

    } else {
      // Show error message
      $('#newsletter-response').removeClass('alert alert-info');
      $('#newsletter-response').addClass('alert alert-danger');
      $('#newsletter-response').html('صيغة البريد إلكتروني غير صحيحة');
    }
  });


})(jQuery);
