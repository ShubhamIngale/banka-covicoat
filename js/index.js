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

        if(name === "") {
                nameError.html('Name required');
                grecaptcha.reset();
        }
        else if(phone === '') {
                phoneError.html('Phone required');
                grecaptcha.reset();
        }
        else if(email === '') {
                emailError.html('Email required');
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

onload();