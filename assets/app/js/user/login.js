//== Class Definition
var SnippetLogin = function() {

    var login = $('#m_login');

    var textToID = function(){
		//var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/login/login.json',
            'dataType': "json",
            'success': function (data) {
                $.each(data, function (i, v) {
						$("#"+v.id).text(v.text).addClass(v.class);
						return;
                });
                
			}
			
        });
	}


    var showErrorMsg = function(form, type, msg) {
        var alert = $('<div class="m-alert m-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
			<span></span>\
		</div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        //alert.animateClass('fadeIn animated');
        mUtil.animateClass(alert[0], 'fadeIn animated');
        alert.find('span').html(msg);
    }

    //== Private Functions

      var displaySignInForm = function() {
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signup');

        login.addClass('m-login--signin');
        mUtil.animateClass(login.find('.m-login__signin')[0], 'flipInX animated');
        //login.find('.m-login__signin').animateClass('flipInX animated');
    }

   

   

    var handleSignInFormSubmit = function() {
        $('#m_login_signin_submit').click(function(e) {
            e.preventDefault();
            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    Username: {
                        required: true
                        //username: true
                    },
                    password: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '',
                success: function(response, status, xhr, $form) {
                    // similate 2s delay
                    window.location.href= 'index.html';
                	// setTimeout(function() {
	                //     btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
	                //     showErrorMsg(form, 'danger', 'Incorrect username or password. Please try again.');
                    // }, 2000);
                }
            });
        });
    }

   

    

    //== Public Functions
    return {
        // public functions
        init: function() {
            handleSignInFormSubmit();
            textToID();
        }
    };
}();

//== Class Initialization
jQuery(document).ready(function() {
    SnippetLogin.init();
});