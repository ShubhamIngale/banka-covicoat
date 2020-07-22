var onloadCallback = function(){
        grecaptcha.render("emplacementRecaptcha",{
        "sitekey": "6Ld4C7QZAAAAADHH0FdwovtA0snefc7ZE-txFrh5",
        "badge": "inline",
        "type": "image",
        "size": "invisible",
        "callback": onSubmit
        });
};

var onSubmit = function(token) {

        var contactForm = $('#ajaxForm');
        var name = $("#name").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var message = $("#message").val();

        var nameError = $('.nameError');
        var emailError = $('.emailError');
        var phoneError = $('.phoneError');
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if(name === "") {
                nameError.html('Please enter your name');
                grecaptcha.reset();
        }
        else if(phone === '') {
                phoneError.html('Please enter your phone number');
                grecaptcha.reset();
        }
        else if(phoneReg.test(phone) == false) {
                phoneError.html('Entered phone number is incorrect');
                grecaptcha.reset();
        }
        else if(email === '') {
                emailError.html('Please enter your email Id');
                grecaptcha.reset();
        }
        else if(reg.test(email) == false) {
                emailError.html('Entered email Id is incorrect');
                grecaptcha.reset();
        }
        else {
                nameError.html('');
                phoneError.html('');
                emailError.html('');

        $('.btn').html('<img src="./media/loader.svg" width="20px" />');

        $.ajax({
                url: 'https://fistbumpmailer.herokuapp.com',
                type: 'POST',
                // data:$(form).serialize(),
                data: {
                        name: name,
                        phone: phone,
                        email: email,
                        message: message,
                        captcha: token
                },
                // processData: false,
                success: function(data) {
                        $(contactForm).trigger('reset');
                        $('.btn').html('SEND');
                        console.log(data);
                        Swal.fire(
                                'Sent!',
                                'Thank you for showing interest. We will get back to you',
                                'success'
                        )
                },
                error: function(e) {
                        $(contactForm).trigger('reset');
                        $('.btn').html('SEND');
                        Swal.fire('Oops...', 'Something went wrong!', 'error')
                }
        })

        grecaptcha.reset();

        }

}


function validate(event){
        event.preventDefault();
        grecaptcha.execute();
}

function onload(){
        var element = document.getElementById("submit");
        element.onclick = validate;
}

var nameI = $("#name");
        var phoneI = $("#phone");
        var emailI = $("#email"); 
        var nameError = $('.nameError');
        var emailError = $('.emailError');
        var phoneError = $('.phoneError');

        nameI.change(function() {
                nameError.html('')
        });
        phoneI.change(function() {
                phoneError.html('')
        });
        emailI.change(function() {
                emailError.html('')
        });


onload();