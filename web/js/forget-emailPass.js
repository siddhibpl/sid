$.validator.setDefaults({
  submitHandler: function() {
    var em1 = document.getElementById("email").value;
    // console.log(em1);
    adminlogin = {
      "Email": em1
    };
    // console.log(adminlogin);
    storagesetItem("adminlogin", adminlogin);
    var objemail = {
      "email": em1
    };
    // console.log(objemail);
    // $.post({
    //   url: "/forgot_password",
    //   type: "POST",
    //   data: objemail,
    //   success: function(res) {
    //     console.log(res.resCode);
    //     if (res.resCode == 'OK') {
    //       console.log(res.msg);
    //       if (res.msg != "user not found create new user") {
    //         paswordValidationScript();
    //         window.location.replace("forgot-Password.html");
    //       }
    //     } else {
    //       console.log(res.msg);
    //     }
    //   },
    //   error: function() {
    //     console.log("fail login");
    //   }
    // });
    window.location.replace("forgot-Password.html");
  }
});

$(document).ready(function() {
  $('.img').addClass('hide');
  $('.img1').addClass('hide');
  $('#password').hover(function() {
    // alert("TEST");
    $('.img').removeClass('hide');
  }, function() {
    $('.img').addClass('hide');
  });
  $('.img').hover(function() {
    $('.img').removeClass('hide');
  }, function() {
    $('.img').removeClass('hide');
  });
  $('#Confirm_Password').hover(function() {
    // alert("TEST");
    $('.img1').removeClass('hide');
  }, function() {
    $('.img1').addClass('hide');
  });
  $('.img1').hover(function() {
    $('.img1').removeClass('hide');
  }, function() {
    $('.img1').removeClass('hide');
  });
  $("#emailvalid").validate({
    rules: {
      email: {
        required: true,
        email: true
      },

    },
    messages: {
      email: "Please enter a valid email address",

    },
    errorElement: "em",
    errorPlacement: function(error, element) {
      // Add the `help-block` class to the error element
      error.addClass("help-block");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
    }

  });
});
function mDown() {
    password.type='text';
}

function mUp() {
    password.type='password';
}
function mDown1() {
    Confirm_Password.type='text';
}

function mUp1() {
    Confirm_Password.type='password';
}

function paswordValidationScript(){

};
