$(function() {

	$(".loader").fadeOut("slow");

  $("html").niceScroll({
    scrollspeed: 80,
    mousescrollstep: 60,
    cursorcolor: "#c0101a",
    smoothscroll: true,
    zindex: 120,
    cursorwidth: "8px",
    cursorborderradius: "10px",
    cursorborder: "none",
  });

  //$(".pmask").mask("+7 (999)999-99-99");

  //$(".head_menu").before($(".head_menu").clone().addClass("animateIt"));

  // var win_width = $(window).width();
  // var offset_top = $(".main_head").height();
  // var scrollTop = $(window).scrollTop();

  // $("body").toggleClass("down", (win_width > 768 && scrollTop > offset_top));

  // $(window).resize(function() {
  //   offset_top = $(".main_head").height();
  //   win_width = $(window).width();
  //   $("body").toggleClass("down", (win_width > 768 && scrollTop > offset_top));
  // });
  // $(window).scroll(function() {
  //   scrollTop = $(window).scrollTop();
  //   $("body").toggleClass("down", (win_width > 768 && scrollTop > offset_top));
  // });



  $(".menu a").click(function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1000);
    return false;
  });

  $(".show_more_actions a").click(function () {
    $(".actions_item:hidden").show();
    $(this).parent().hide();
    return false;
  });


  change_menu_class();
  $(window).resize(function() {
    change_menu_class();
  });

  function change_menu_class() {
    if ( $(window).width() < 768 ) {
      $(".menu").removeClass("head_menu");
      $(".menu").addClass("mobile_menu");
      $(".menu").hide();
      $(".sandwich").removeClass("active");
    } else {
      $(".menu").removeClass("mobile_menu");
      $(".menu").addClass("head_menu");
      $(".menu").show();
      $(".sandwich").removeClass("active");
    }
  }

  var menu_list = $(".mobile_menu ul").find("li");
  var n = 0;
  $(menu_list).each(function() {
    jQuery(this).find("a").css('animation-delay', '.'+n+'s');
    n++;
  });

  var menu_top_height = 0;
  $(".toggle_mnu").click(function() {
    $(".sandwich").toggleClass("active");
    $("header.sticky").toggleClass("mobile_menu_active");
    menu_top_height = $(window).scrollTop();
  });

  $(".mobile_menu ul a").click(function() {
    $(".mobile_menu").fadeOut(600);
    $(".sandwich").toggleClass("active");
  });

  $(".toggle_mnu").click(function() {
    if ($(".mobile_menu").is(":visible")) {
      $(".mobile_menu").fadeOut(600);
      $(".mobile_menu li a").removeClass("fadeInUp animated");
    } else {
      $(".mobile_menu").fadeIn(600);
      $(".mobile_menu li a").addClass("fadeInUp animated");

    };
  });

});