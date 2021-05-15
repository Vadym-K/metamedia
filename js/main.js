//--slick carousel--//

$(".carousel-slick").slick({
	infinite: true,
	dots: true,
	arrows: true,
	initialSlide: 0,
	responsive: [{
		breakpoint: 768,
		settings: {
			dots: false
		}
	}, {
		breakpoint: 639,
		settings: {
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: false
		}
	}]

});


//--anchor--//

$(document).ready(function() {
	$("a.ancLinks").click(function() {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html,body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});
});

//--fix header style--//

$(window).scroll(function() {
	var scrolled = $(this).scrollTop();
	if (scrolled >= 60) {
		$('.scroll-header').addClass('fix-header');
	}
	if (scrolled <= 60) {
		$('.scroll-header').removeClass('fix-header');
	}
});

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


//--circle--//

function circleInit() {
	$('.circle').circleProgress({
		value: 0.97,
		size: 130,
		startAngle: -Math.PI / 6 * 3
	}).on('circle-animation-progress', function(event, progress) {
		$(this).find('strong').html(Math.round(99 * progress) + '<i>%</i>');
	});
	marker = false;
}

var marker = true;

$(window).on('scroll', function() {
	if (isScrolledIntoView('.circle')) {
		if (marker) {
			circleInit();
		}
	}
});


//--active link sticky header--//

$(document).ready(function($) {
	var sections = $("section");
	var navigation_links = $("#nav a");

	sections.waypoint({

		handler: function(event, direction) {

			var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '17%'

	});
});


//--btn up--//

$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 800) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});

	$('#toTop').click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	});
});


//--recaptcha--//

function reCaptcha(selector) {
	var $wg = $(selector);
	$wg.$.each(function() {
		var id = randomString(10),
			$form = $(this).closest('form');
		$form.find('button[type="submit"]').prop('disabled', true);
		$(this).append($(`<div class="g-recaptcha" id="" + id + ""></div>`));
		grecaptcha.render(id, {
			sitekey: $(this).find('g-recaptcha').data('sitekey') || '',
			callback: function(response) {
				if (!!response) {
					$form.find('button[type="submit"]').prop('disabled', false);
				}
			}
		});
	});
};

function randomString(length) {
	var chars = '0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.
	split(''),
		result = '',
		length = !length ? Math.floor(Math.random() * chars.length) : length;
	for (var i = 0; i < length; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;

};

var reCaptchaOnloadCallback = function() {
	reCaptcha('.recaptcha');
};


//--form validate--//

$(function() {

	// Initialize form validation on the contact-form form.
	// It has the name attribute "contact-form"
	$("form[name='contact-form']").validate({
		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			name: "required",
			telephone: "required",
			//customermessage: "required",
			comment: "required",
			email: {
				required: true,
				// Specify that email should be validated
				// by the built-in "email" rule
				email: true
			},
			hiddenRecaptcha: {
				required: function() {
					if (grecaptcha.getResponse() == '') {
						return true;
					} else {
						return false;
					}
				}
			}
		},
		// Specify validation error messages
		messages: {
			name: "Please enter your full name",
			telephone: "Please enter a valid telephone number",
			//customermessage: "Please write your message here",
			comment: "Please write us a message",
			email: "Please enter a valid email address",
			hiddenRecaptcha: "Please tick the box"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function(form) {
			form.submit();
		}
	});

});

$.validator.setDefaults({
	ignore: [],
	// any other default options and/or rules
});

var imNotARobot = function() {
	//alert(grecaptcha.getResponse());
	if (grecaptcha.getResponse() != '') {
		$('#hiddenRecaptcha-error').hide();
	}
};

$(function() {

	$("#js-register-form").validate({

		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
		},
		messages: {
			name: {
				required: "Error"
			},
			subject: {
				required: "Error"
			},
			message: {
				required: "Error"
			},
			email: {
				required: "Error"
			}
		}
	});

});


//--btn menu--//

let openBtn = document.querySelector('.btn-menu');
let removeBtnMenu = document.querySelectorAll('.remove');
let wrapper = document.querySelector('.wrapper');
openBtn.addEventListener('click', btnMenu);

function btnMenu() {
	wrapper.classList.toggle('open-btn');
};

function removeBtn() {
	wrapper.classList.remove('open-btn');
}


for (let i = 0; i < removeBtnMenu.length; i++) {
	removeBtnMenu[i].addEventListener("click", removeBtn);
};