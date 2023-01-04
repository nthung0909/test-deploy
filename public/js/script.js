// Page Loader : hide loader when all are loaded
$(window).load(function(){
	"use strict";
    $('.wavy-wraper').addClass('hidden');
	
	
	if($("#imagelisting").length > 0){
			var maxfile = 5;
            	$("#imagelisting").fileinput({
						 'theme': 'explorer-fa5',
					 	uploadUrl: '#', // you must set a valid URL here else you will get an error
						language: 'vi',
						allowedFileExtensions: ['jpg','jpeg', 'png', 'gif','mp4'],
						showBrowse: false,
						showClose: false,
						showUpload: false,
						showCaption: false,
						showPreview: true,
						showCancel: false,
						showRemove: false,
						uploadAsync: false,
						showUploadStats: false,
						showUploadedThumbs: false,
						resizeImage:true,
					 	maxImageHeight: 600,
					 	maxFileCount: maxfile,
						maxFileSize: 95120,
						resizeIfSizeMoreThan:1024,
						maxFilePreviewSize:2048,
						browseOnZoneClick: true,
						overwriteInitial: true,
        				initialPreviewAsData: true,				
					    append: true, // whether to append content to the initial preview (or set false to overwrite)
						fileActionSettings : {
						// Disable
							showUpload : false,
							showDrag: false,
							indicatorNew: "",
							indicatorSuccess: "",
							indicatorError: ""
						},

						slugCallback : function(filename) {
							return filename.replace('(', '').replace(']', '');
						}
						
				});
	   }
	if($(".repeater").length > 0){
		 $('.repeater').repeater({
            // (Required if there is a nested repeater)
            // Specify the configuration of the nested repeaters.
            // Nested configuration follows the same format as the base configuration,
            // supporting options "defaultValues", "show", "hide", etc.
            // Nested repeaters additionally require a "selector" field.
            repeaters: [{
                // (Required)
                // Specify the jQuery selector for this nested repeater
                selector: '.inner-repeater'
            }]
        });
	}
	
});
function loadmenusub(){
	 $('.listitemmulti').each(function() {
		 	 $(this).children( "li").children( "a ").unbind();
	         $(this).children( "li").children( "a ").bind( "click", function() {
				  
				  var parent = $(this).parent();
				// console.log(parent);
				  var boxsub = $(parent).children('ul.listitemchild');
				if($(boxsub).children('li').length>0){

					if($(boxsub).css("display") == "none"){

						$(boxsub).slideToggle(500);
					}else{
						$(boxsub).slideToggle(500);
					}
				}
			});
	  });
	
}

function loaduploadfile(){
	if($('.btnupload').length>0)		{		
		$('.btnupload').click(function(event) {  
			if (!event.preventDefault) {
				event.preventDefault = function() {
					event.returnValue = false; //Internet Explorer
				};
			}
			typefile = $(this).next('input');
			typefile.click();
			var btnsave = $(this).attr("data-save");
			var fileview = $(this).attr("data-file");
			
			
			$(typefile).change(function(){
				$('#'+fileview).fadeOut();
				/* html FileRender Api */
				var oFReader = new FileReader();
				oFReader.readAsDataURL(this.files[0]);
				oFReader.onload = function (oFREvent) {
					$('#'+fileview).attr('src', oFREvent.target.result).fadeIn();
					if($('#'+btnsave).length > 0){
						$('#'+btnsave).fadeIn();
					}	
				};


			});
			
			
		});
	}
}

function loadfiletobox(){
	if($('.btnloadfiletobox').length>0)		{		
		$('.btnloadfiletobox').click(function(event) {  
			if (!event.preventDefault) {
				event.preventDefault = function() {
					event.returnValue = false; //Internet Explorer
				};
			}
			typefile = $(this).next('input');
			typefile.click();
			var fileview = $(this).attr("data-file");
			
			
			$(typefile).change(function(){
				$('#'+fileview).fadeOut();
				/* html FileRender Api */
				var oFReader = new FileReader();
				oFReader.readAsDataURL(this.files[0]);
				oFReader.onload = function (oFREvent) {
					$('#'+fileview).attr('src', oFREvent.target.result).fadeIn();
					
				};


			});
			
			
		});
	}
}

function loadcareertrackchart(){
	 $('.treecareertrackchart').each(function() {
		 	var idchart = $(this).attr("id");
		 	var data = [{
				"label": "President",
				"name": "John Doe",
				"children": [{
					"name" : "Jane Smith",
					"label": "Vice President of Administration",
					"children": [{
						"name": "Peter West",
						"label": "Director of Finance"
					}, {
						"name" : "Sarah Jones",
						"label": "Director of Human Resources"
					}]
				}, {
					"name" : "Richard Easton",
					"label": "Vice President of Operations",
					"children": [{
						"name" : "Amy Thomas",
						"label": "Director of Distribution"
					}, {
						"name" : "Greg Li",
						"label": "Director of Customer Service",
						"children": [{
							"name" : "Laronda Phillips",
							"label": "Technical Support Manager"
						}]
					}]
				}, {
					"name" : "Alice Ozaltin",
					"label": "Vice President of Merchandising",
					"children": [{
						"name": "Zach Kwon",
						"label": "Director of Purchasing",
						"children": [
							{
								"name": "Jonathan Branham",
								"label": "Internal Purchasing Manager"}]
					}, {
						"name": "Elizabeth Norman",
						"label": "Director of Appliances"
					}, {
						"name" : "Peter Stevens",
						"label": "Director of Clothing",
						"children": [{
							"name": "Rebecca Hammond",
							"label": "Womens Clothing Planner"
						}, {
							"name": "Alex Kaplan",
							"label": "Mens Clothing Planner"
						}]
					}, {
						"name" : "Mark Hughes",
						"label": "Product Information Coordinator"
					}]
				}]
			}]
		 	OrgTree.makeOrgTree($('#'+idchart), data);
		 	
	  });
	
}
jQuery(document).ready(function($) {
	
	"use strict";
	
//----- popup display on window load	
		function delay(){
			$(".popup-wraper.subscription").fadeIn();
		}
		window.setTimeout( delay, 3000 );
		
		$('.popup-closed').on('click', function() {
		  $('.popup-wraper.subscription').addClass('closed');
		  return false;
		});
	// popup end	
	loadmenusub();
	loadcareertrackchart();
//------- Notifications Dropdowns
  $('.top-area > .setting-area > li > a').on("click",function(){
	 var $parent = $(this).parent('li');
	 $(this).addClass('active').parent().siblings().children('a').removeClass('active');
	 $parent.siblings().children('div').removeClass('active');
	 $(this).siblings('div').toggleClass('active');
	  	return false;
  });
$('.carrer-track-area > li > a').on("click",function(){
	 var $parent = $(this).parent('li');
	 $(this).addClass('active').parent().siblings().children('a').removeClass('active');
	 $parent.siblings().children('div').removeClass('active');
	 $(this).siblings('div').toggleClass('active');
	  	return false;
  });
$("body *").not('.carrer-track-area > li > a').on("click", function() {
	 $(".carrer-track-area > li > a").removeClass('active');
	
 });
  $("body *").not('.top-area > .setting-area > li > a').on("click", function() {
	 $(".top-area > .setting-area > li > a").removeClass('active');
	
 });
	
	
// New submit post box
	$(".new-postbox").click(function () {
	    $(".postoverlay").fadeIn(500);
	});
	$(".postoverlay").not(".new-postbox").click(function() {
	    $(".postoverlay").fadeOut(500);
	});
	$("[type = submit]").click(function () {
	    var post = $("textarea").val();
	    $("<p class='post'>" + post + "</p>").appendTo("section");
	});	
	
// top menu list	
	$('.main-menu > span').on('click', function () {
		$('.nav-list').slideToggle(300);
		
	});
	
	
	
	
// show comments	
	$('.comment').on('click', function () {
		$(this).parents(".post-meta").siblings(".coment-area").slideToggle("slow");
	});
	
// add / post location	
	$('.add-loc').on('click', function () {
		$('.add-location-post').slideToggle("slow");	
	});

// add popup upload from gallery	
	$('.from-gallery').on('click', function () {
		$('.already-gallery').addClass('active');
		
	});
	
	$('.canceld').on('click', function () {
		$('.already-gallery').removeClass('active');
	});
	
// Stories slide show
	$('.story-box').on('click', function () {
		$('.stories-wraper').addClass('active');
	});
		$('.close-story').on('click', function () {
		$('.stories-wraper').removeClass('active');
	});	

// add popup upload photo
	$('.edit-prof').on('click', function () {
		$('.popup-wraper').addClass('active');
	});
		$('.popup-closed').on('click', function () {
		$('.popup-wraper, .popup-wraper1').removeClass('active');
	});	
	
	// Create group friend
	$('.item-upload').on('click', function () {
		$('.popup-wraper4').addClass('active');
	});
		$('.popup-closed').on('click', function () {
		$('.popup-wraper4').removeClass('active');
	});	
	
	// Create group friend
	$('.item-upload.album').on('click', function () {
		$('.popup-wraper5').addClass('active');
	});
		$('.popup-closed').on('click', function () {
		$('.popup-wraper5').removeClass('active');
	});	
	
// popup event
	$('.event-title h4').on('click', function () {
		$('.popup-wraper7').addClass('active');
	});
	$('.popup-closed').on('click', function () {
		$('.popup-wraper7').removeClass('active');
	});
	
// chat messenger remove unread
	$('.msg-pepl-list .nav-item').on('click', function () {
		$(this).removeClass('unread');
	});	
	
// select gender on pitpoint page	
	$('.select-gender > li').click( function() {
		$(this).addClass('selected').siblings().removeClass('selected');
	  });
	
// select amount on donation page	
	$('.amount-select > li').click( function() {
		$(this).addClass('active').siblings().removeClass('active');
	  });
// select pay method on donation page	
	$('.pay-methods > li').click( function() {
		$(this).addClass('active').siblings().removeClass('active');
	  });	

// popup add user
	$('.user-add').on('click', function () {
		$('.popup-wraper6').addClass('active');
	});
	$('.popup-closed').on('click', function () {
		$('.popup-wraper6').removeClass('active');
		return false;
	});

// popup send message
	$('.send-mesg').on('click', function () {
		$('.popup-wraper1').addClass('active');
		return false;
	});
	
// popup report post
	$('.bad-report').on('click', function () {
		$('.popup-wraper3').addClass('active');
		return false;
	});
	$('.popup-closed, .cancel').on('click', function () {
		$('.popup-wraper3').removeClass('active');
		return false;
	});		
	
// comments popup
	jQuery(window).on("load", function(){
		$('.show-comt').bind('click', function () {
			$('.pit-comet-wraper').addClass('active');  
		});	
	});
// comments popup
	$('.add-pitrest > a, .pitred-links > .main-btn, .create-pst').on('click', function () {
		$('.popup-wraper').addClass('active');
		return false;
	});
	
// share post popup	
$('.share-pst').on('click', function () {
	$('.popup-wraper2').addClass('active');
	return false;
});
	$('.popup-closed, .cancel').on('click', function () {
	$('.popup-wraper2').removeClass('active');
});	
	
// messenger call popup
$('.audio-call, .video-call').on('click', function () {
		$('.call-wraper').addClass('active');
	});
		$('.decline-call, .later-rmnd').on('click', function () {
		$('.call-wraper').removeClass('active');
	});
	
// Touch Spin cart qty number
    if ($.isFunction($.fn.TouchSpin)) {
        $('.qty').TouchSpin({});
    }	
		
// drag drop widget

	$( init );
	function init() {
	  $( ".droppable-area1, .droppable-area2" ).sortable({
	      connectWith: ".connected-sortable",
	      stack: '.connected-sortable ul'
	    }).disableSelection();
	}

//--- heart like and unlike 
	var counter = 0;
	var animated = false;
		$('.heart').click(function(){
		  if(!animated){
			$(this).addClass('happy').removeClass('broken');
			animated = true;
			counter++;
			$(this).children('span').text(counter);
		  }
		  else {
			$(this).removeClass('happy').addClass('broken');
			animated = false; 
			 counter--;
			$(this).children('span').text(counter);
		  }
		});	
	
// search fadein out at navlist area	
	$('.search-data').on('click', function () {
	  $( ".searchees" ).fadeIn( "slow", function() {
	  });
		return false;
	});
	
	$('.cancel-search').on('click', function () {
	  $( ".searchees" ).fadeOut( "slow", function() {
	  });
		return false;
	});	

//------- remove class active on body
	$("body *").not('.top-area > .setting-area > li > a').on("click", function() {
		$(".top-area > .setting-area > li > div").not('.searched').removeClass('active');
	});


//--- user setting dropdown on topbar	
$('.user-img').on('click', function() {
	$('.user-setting').toggleClass("active");
});

	
//--- side message box	
	$('.friendz-list > li, .chat-users > li, .drops-menu > li > a.show-mesg').on('click', function() {
		$('.chat-box').addClass("show");
		return false;
	});	
	$('.close-mesage').on('click', function() {
		$('.chat-box').removeClass("show");
		return false;
	});	
	
//------ scrollbar plugin
	if ($.isFunction($.fn.perfectScrollbar)) {
		$('.dropdowns, .twiter-feed, .invition, .followers, .chatting-area, .peoples, #people-list, .chat-list > ul, .message-list, .chat-users, .left-menu, .sugestd-photo-caro, .popup.events, .related-tube-psts, .music-list, .more-songs, .media > ul, .conversations, .msg-pepl-list, .menu-slide, .frnds-stories, .modal-body .we-comet').perfectScrollbar();
	}

/*--- socials menu scritp ---*/	
	$('.trigger').on("click", function() {
	    $(this).parent(".menu").toggleClass("active");
	});
	
/*--- left menu full ---*/	
	$('.menu-small').on("click", function() {
	    $(".fixed-sidebar.left").addClass("open");
		
	  });
	$('.closd-f-menu').on("click", function() {
	    $(".fixed-sidebar.left").removeClass("open");
		
	  });

/*--- emojies show on text area ---*/	
	$('.add-smiles > span, .smile-it').on("click", function() {
	    $(this).siblings(".smiles-bunch").toggleClass("active");
	});
	
	$('.smile-it').on("click", function() {
	    $(this).children(".smiles-bunch").toggleClass("active");
	});
	
//save post click	
$('.save-post, .bane, .get-link').on("click", function() {
	    $(this).toggleClass("save");
	});
	
// delete notifications
	$('.notification-box > ul li > i.del').on("click", function(){
	    $(this).parent().slideUp();
		return false;
	}); 	

/*--- socials menu scritp ---*/	
	$('.f-page > figure i').on("click", function() {
	    $(".drop").toggleClass("active");
	});

	
//select photo in upload photo popup	
	$('.sugestd-photo-caro > li').on('click', function() {
		$(this).toggleClass('active');			
		return false;
	});
	
//--- pitred point adding
	$('.minus').click(function () {
		var $input = $(this).parent().find('input');
		
		$('.minus').on("click", function() {
			$(this).siblings('input').removeClass("active");
			$(this).siblings('.plus').removeClass("active");
			
		});
		
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 0 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	
   $('.plus').click(function () {
		var $input = $(this).parent().find('input');
		
		$('.plus').on("click", function() {
			$(this).addClass("active");
			$(this).siblings('input').addClass("active");
		});
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

//Link copied on click 	

	$(".get-link").click(function (event) {
		event.preventDefault();
		CopyToClipboard("This is some test value.", true, "Link copied");
	});

	function CopyToClipboard(value, showNotification, notificationText) {

		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(value).select();
		document.execCommand("copy");
		$temp.remove();

		if (typeof showNotification === 'undefined') {
			showNotification = true;
		}
		if (typeof notificationText === 'undefined') {
			notificationText = "Copied to clipboard";
		}

		var notificationTag = $("div.copy-notification");
		if (showNotification && notificationTag.length == 0) {
			notificationTag = $("<div/>", { "class": "copy-notification", text: notificationText });
			$("body").append(notificationTag);

			notificationTag.fadeIn("slow", function () {
				setTimeout(function () {
					notificationTag.fadeOut("slow", function () {
						notificationTag.remove();
					});
				}, 1000);
			});
		}
	}

	
//===== Search Filter =====//
	(function ($) {
	// custom css expression for a case-insensitive contains()
	jQuery.expr[':'].Contains = function(a,i,m){
	  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

	function listFilter(searchDir, list) { 
	  var form = $("<form>").attr({"class":"filterform","action":"#"}),
	  input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"Search Contacts..."});
	  $(form).append(input).appendTo(searchDir);

	  $(input)
	  .change( function () {
		var filter = $(this).val();
		if(filter) {
		  $(list).find("li:not(:Contains(" + filter + "))").slideUp();
		  $(list).find("li:Contains(" + filter + ")").slideDown();
		} else {
		  $(list).find("li").slideDown();
		}
		return false;
	  })
	  .keyup( function () {
		$(this).change();
	  });
	}

//search friends widget
	$(function () {
	  listFilter($("#searchDir"), $("#people-list"));
	});
	}(jQuery));	

//progress line for page loader
	$('body').show();
	NProgress.start();
	setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 2000);
	
//--- bootstrap tooltip and popover	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover();
	});
	
// Sticky Sidebar & header
	if($(window).width() < 981) {
		$(".sidebar").children().removeClass("stick-widget");
	}

	if ($.isFunction($.fn.stick_in_parent)) {
		$('.stick-widget').stick_in_parent({
			parent: '#page-contents',
			offset_top: 60,
		});

		
		$('.stick').stick_in_parent({
		    parent: 'body',
            offset_top: 0,
		});
		
	}
	
/*--- topbar setting dropdown ---*/	
	$(".we-page-setting").on("click", function() {
	    $(".wesetting-dropdown").toggleClass("active");
	});	
	  
/*--- topbar toogle setting dropdown ---*/	
$('#nightmode').on('change', function() {
    if ($(this).is(':checked')) {
        // Show popup window
        $(".theme-layout").addClass('black');	
    }
	else {
        $(".theme-layout").removeClass("black");
    }
});

//chosen select plugin
	if ($.isFunction($.fn.chosen)) {
		$("select.choosen").chosen();
	}

//----- add item plus minus button
	if ($.isFunction($.fn.userincr)) {
		$(".manual-adjust").userincr({
			buttonlabels:{'dec':'-','inc':'+'},
		}).data({'min':0,'max':20,'step':1});
	}	
	
if ($.isFunction($.fn.loadMoreResults)) {	
	$('.loadMore').loadMoreResults({
		displayedItems: 3,
		showItems: 1,
		button: {
		  'class': 'btn-load-more',
		  'text': 'Load More'
		}
	});	
	
	$('.load-more').loadMoreResults({
		displayedItems: 8,
		showItems: 1,
		button: {
		  'class': 'btn-load-more',
		  'text': 'Load More'
		}
	});
	
	$('.load-more4').loadMoreResults({
		displayedItems: 8,
		showItems: 1,
		button: {
		  'class': 'btn-load-more',
		  'text': 'Load More'
		}
	});
}
	
//---- calander	
	if ($.isFunction($.fn.jalendar)) { 
	 $('#yourId').jalendar({
			customDay: '11/01/2015',
			color: '#577e9a', // Unlimited Colors
			color2: '#57c8bf', // Unlimited Colors
			lang: 'EN',
			sundayStart: true
		});
	}
	
//---- responsive header
if ($.isFunction($.fn.mmenu)) {
	$(function() {

		//	create the menus
		

		//	fire the plugin
		$('.mh-head.first').mhead({
			scroll: {
				hide: 200
			}

		});
		$('.mh-head.second').mhead({
			scroll: false
		});
	});	
}

//**** Slide Panel Toggle ***//
	$("span.main-menu").on("click", function(){
	     $(".side-panel").toggleClass('active');
		  $(".theme-layout").toggleClass('active');
		  return false;
	});

	$('.theme-layout').on("click",function(){
		  $(this).removeClass('active');
	     $(".side-panel").removeClass('active');
	});

	  
// login & register form
	$('button.signup').on("click", function(){
		$('.login-reg-bg').addClass('show');
		return false;
	});
	  
	$('.already-have').on("click", function(){
		$('.login-reg-bg').removeClass('show');
		return false;
	});
	
//----- count down timer		
	if ($.isFunction($.fn.downCount)) {
		$('.countdown').downCount({
			date: '11/12/2021 12:00:00',
			offset: +10
		});
	}
	
//counter for funfacts
		if ($.isFunction($.fn.counterUp)) {
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});
		}	
/** Post a Comment **/
jQuery(".post-comt-box textarea").on("keydown", function(event) {

	if (event.keyCode == 13) {
		var comment = jQuery(this).val();
		var parent = jQuery(".showmore").parent("li");
		var comment_HTML = '<li><div class="comet-avatar"><img alt="" src="images/resources/comet-2.jpg"></div><div class="we-comment"><h5><a title="" href="time-line.html">Sophia</a></h5><p>'+comment+'</p><div class="inline-itms"><span>1 minut ago</span><a title="Reply" href="#" class="we-reply"><i class="fa fa-reply"></i></a><a title="" href="#"><i class="fa fa-heart"></i></a></div></div></li>';
		$(comment_HTML).insertBefore(parent);
		jQuery(this).val('');
	}
}); 
	
//inbox page 	
//***** Message Star *****//  
    $('.message-list > li > span.star-this').on("click", function(){
    	$(this).toggleClass('starred');
    });


//***** Message Important *****//
    $('.message-list > li > span.make-important').on("click", function(){
    	$(this).toggleClass('important-done');
    });

    

// Listen for click on toggle checkbox
	$('#select_all').on("click", function(event) {
	  if(this.checked) {
	      // Iterate each checkbox
	      $('input:checkbox.select-message').each(function() {
	          this.checked = true;
	      });
	  }
	  else {
	    $('input:checkbox.select-message').each(function() {
	          this.checked = false;
	      });
	  }
	});
// delete email from messages
	$(".delete-email").on("click",function(){
		$(".message-list .select-message").each(function(){
			  if(this.checked) {
			  	$(this).parent().slideUp();
			  }
		});
	});

// change background color on hover
	/*$('.category-box').hover(function () {
		$(this).addClass('selected');
		$(this).parent().siblings().children('.category-box').removeClass('selected');
	});*/
	
	
// Responsive nav dropdowns
	$('li.menu-item-has-children > a').on('click', function () {
		$(this).parent().siblings().children('ul').slideUp();
		$(this).parent().siblings().removeClass('active');
		$(this).parent().children('ul').slideToggle();
		$(this).parent().toggleClass('active');
		return false;
	});
	
// Slider box
	$(function() {
	  $("#price-range").slider({
		range: "max",
		min: 18, // Change this to change the min value
		max: 65, // Change this to change the max value
		value: 18, // Change this to change the display value
		step: 1, // Change this to change the increment by value.
		slide: function(event, ui) {
		  $("#priceRange").val(ui.value + " Years");
		}
	  });
	  $("#priceRange").val( $("#price-range").slider("value") + " Years");
	});
//--- range slider 	
 $( function() {
		$( "#slider-range" ).slider({
		  range: true,
		  min: 0,
		  max: 500,
		  values: [ 75, 300 ],
		  slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		  }
		});
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		  " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	  } );
		
	
});//document ready end

/*--- progress circle with percentage ---*/
(function() {
	
	window.onload = function() {
    var totalProgress, progres;
		const circles = document.querySelectorAll('.progres');
		for(var i = 0; i < circles.length; i++) {
			totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
			progress = circles[i].parentElement.getAttribute('data-percent');
      circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
      
		}
	};
})();


	





