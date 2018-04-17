var scroller=jQuery.browser.webkit ? "body": "html";

/* modernize */
function modernize() {
	// placeholder
	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function() {
			$(this).watermark($(this).attr('placeholder'));
		});
	}
}


/* input only Number  */
function inputNumber(block) {
	$('input', block).keypress(function(e) {
		if (e.which >= 47 && e.which <= 57 ){}
		else return false;
	});

	$('input', block).keyup(function() {
		$inputNum = $(this);
		if ($inputNum.val == '' || $inputNum.val() == 0) {
			$inputNum.val('1');
		}
	});
}


/* u_tabs */
function u_tabs(link, block) {
	$(link).click(function(e) {
		var $currentTab = $(this);
		var tabId = $currentTab.data('utab');

		$(link).removeClass('active');
		$currentTab.addClass('active');

		$(block).hide().removeClass('active');
		$(block+'[data-utab="' + tabId + '"]').show().addClass('active');
		if($(link).is('a')){
			e.preventDefault();
		}
	});
	$(link).eq(0).click();
}

/* scrollUp */
function scrollUp(block,targetBlock) {

	$(block).click(function(e){
		var target = $(targetBlock).offset().top;

		$(scroller).animate({scrollTop:target},800);
		return false;

		e.preventDefault();
	});
}


function initScrollpane(){
	$('.scroll-pane').jScrollPane();
}


function oneHeightItems1(){

	function oneHeight(block){
		var height=0;
		block.removeAttr('style');
		block.each(function(){
			if($(this).height()>height){
				height=$(this).height();
			}
		});
		block.css('height', height);
	}
	oneHeight($('.block-new'));
}
function oneHeightItems(){

    function oneHeight(block){
        var height=0;
        block.removeAttr('style');
        block.each(function(){
            if($(this).height()>height){
                height=$(this).height();
            }
        });
        block.css('height', height);
    }
    oneHeight($('.oneHeight'));
}
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            ignore: ".ignore",
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form.submit();
                }
            },
            rules: {
                "hiddenRecaptcha" : {
                    required: function() {
                        if(grecaptcha.getResponse() == '') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });

        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        };

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        };
        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:1,
                    equalTo:"#password",
                    messages:{

                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })

    }
}


function sliderTop(){
	// $('.header-slider-wrap-main').slick({
	// 	infinite:true,
	// 	arrows:false,
	// 	autoplay:true,
	// 	autoplaySpeed:2000,
	// 	fade:true,
	// 	cssEase:'linear',
	// 	dots:true
	// });
};

function deviceSlider(){
    if($(window).width()<768){
        if($('.header-slider-wrap-main.slick-initialized').length!=0){
            $('.header-slider-wrap-main').slick('unslick');
        }
        if($('.hot-slider.slick-initialized').length!=0){
            $('.hot-slider').slick('unslick');
        }
    }
    else{
        if($('.header-slider-wrap-main.slick-initialized').length==0){
            sliderTop();
        }
    }
}

function sendwichMenu(){

    $('.header-navigation-device-icon').click(function(){
        $('.header-navigation .mbox').slideDown(300);
        $('body, html').css('overflow','hidden');
    });

    $('.header-navigation-wrap-top-right').click(function(){
        $('.header-navigation .mbox').slideUp(300);
        $('body, html').removeAttr('style');
    });

    $(window).resize(function(){
        if($(window).width()>767){
            $('.header-navigation .mbox').removeAttr('style');
        }
    });
};

function validationCall(form){

    var v = grecaptcha.getResponse();
    if(v.length != 0){

        $('.loader-move').addClass('class-move-tototo');
        $('.x-close').css('display','none');
        $('.header-top-buttons-wrap').css('z-index', '1');

    var timer = null;
      var thisForm = $(form);
      var formSur = $('.contact-form-in-foo').serialize();

        $.ajax({
            url : ajaxurl,
            data: formSur,
            method:'POST',
            success : function(data){
                if ( data.trim()=='true') {
                    $('.contact-form-in-foo').trigger('reset');
                    $('.footer_placeholder').height($('.footer').outerHeight());
                    setTimeout(function(){
                        $('.x-close').css('display','none');
                    }, 500);
                }
                else {
                    $('.contact-form-in-foo').trigger('reset');
                }

                 popNext();
                 $('.loader-move').removeClass('class-move-tototo');
            }
        }).done(function() {

                $('.contact-form-in-foo').trigger('reset');
                timer = setTimeout(function(){
                    $.fancybox.close("#call_success");
                    $('.wsplivashka').removeClass('move-nigga');
                    $('.header-top-buttons-wrap').css('z-index', '3');
                    $('.x-close').css('display','none');
                },2000);
            });;

        function popNext(){
            $.fancybox.open("#call_success",{
                padding:0,
                fitToView:true,
                autoSize:true,
                wrapCSS:"call-popup",
                autoSize:true,
                'helpers': {
                            'overlay' : {'closeClick': false}
                            },
                afterClose: function(){
                    clearTimeout(timer);
                }
            });
        }
        grecaptcha.reset();
    }
}

function validationCall1(form){

  var thisForm = $(form);
  var formSur = $('.call-form').serialize();

    $.ajax({
        url : ajaxurl,
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim()=='true') {
                thisForm.trigger("reset");
                //popNext();
            }
            else {
               $(this).trigger('reset');
            }

        }
    });

    function popNext(){
        $.fancybox.open("#call_success",{
            padding:0,
            fitToView:true,
            autoSize:true,
            wrapCSS:"call-popup",
            autoSize:true,
            afterClose: function(){
                clearTimeout(timer);
            }
        });
        var timer = null;

        timer = setTimeout(function(){
            $.fancybox.close("#call_success");
        },2000);

        $('form').trigger("reset");
    }
}

function langValueClick(){

    $('.header-top-langChange-value').click(function(){
        /*if($(this).is('.active')){
            $(this).removeClass('active');
        }
        else{
            $(this).addClass('active');
        }*/
    });

    $(document).mouseup(function(e) {
        var container = $(".header-top-langChange");
        if (container.has(e.target).length === 0){
            $(".header-top-langChange-value").removeClass('active');
        }
        else{

            if($('.header-top-langChange-value').is('.active')){
                $('.header-top-langChange-value').removeClass('active');
            }
            else{
                $('.header-top-langChange-value').addClass('active');
            }
        }
    });



};
$(window).resize(function(){
    $('.block-new').css('height','auto');
    setTimeout(function(){
        if($(window).width()>767){
            oneHeightItems1();
            console.log('move');
            console.log($(window).width());

            $('.header-top-langChange-value').removeClass('active');
        }
        if($(window).width()<=767){
            $('.block-new').css('height','auto');
        }
     }, 500);
});

function menuHover(){
    $('.header-navigation-wrap li').hover(
        function(){
            $('.header-navigation-wrap li').removeClass('hovered');
            $(this).addClass('hovered');
        },
        function(){
            $('.header-navigation-wrap li').removeClass('hovered');
        }
    );

}

/* DOCUMENT READY  */
$(document).ready(function() {
    if($(window).width()>767){
        oneHeightItems1();
    }
     if($(window).width()<=767){
        $('.block-new').css('height','auto');
    }
	modernize();
	$('.footer_placeholder').height($('.footer').outerHeight());

	oneHeightItems();

	deviceSlider();
	validate('.header-form',{submitFunction:validationCall1});
    validate('.footer-form-main',{submitFunction:validationCall1});
    validate('.contact-form-in-foo',{submitFunction:validationCall});
    sendwichMenu();
    langValueClick();

    menuHover();
});

$(window).load(function(){
$('.footer_placeholder').height($('.footer').outerHeight());
});


$(window).resize(function() {
    animationBlock($('.animate-section'));
    modernize();
    deviceSlider();
    $('.footer_placeholder').height($('.footer').outerHeight());
    $('.footer_placeholder').height($('.footer').outerHeight());
});








