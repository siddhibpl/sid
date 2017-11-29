$(document).ready(function() {
  var obj;
  $.when(Gethandler("/route/total", obj, true)).done(function(res) {
    console.log(res);
    if (res.resCode == "OK") {
      $('.total-company').html(res.Total_Company);
      $('.total-iti').html(res.Total_ITI);
      $('.total-student').html(res.Total_Student);
      $('.bodyloading').addClass('hide');
      $('#containerDiv').removeClass('hide');
    } else {
      swal("Error!", res.msg, "error");
      $('.bodyloading').addClass('hide');
      $('#containerDiv').removeClass('hide');
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load Data. please check your internet connection", "error");
    $('.bodyloading').addClass('hide');
    $('#containerDiv').removeClass('hide');
  });

  $(".contactUs").click(function() {
    // $('.iti-ftitle').html("Chat With Us");
    // $('.carousel').carousel('pause');
    // $('.iti-fdoc').html(x);
    $('#exampleModalLongTitle').html("Chat With Us");
    // $('.listComDetailsDiv').removeClass('hide');
    $('.modal-body').html(x);
    $('.modal-footer').removeClass('hide');
  })
  $(".home").click(function() {
    // $('.iti-ftitle').html("");
    // $('.iti-fdoc').html("");
    // $('.carousel').carousel({
    //   interval: 10
    // });
  });
  $(".aboutIti").click(function() {
    // $('.iti-ftitle').html("About ITI Jobs");
    // $('.iti-fdoc').html("");
    $('#exampleModalLongTitle').html("About ITI Jobs");
    // $('.listComDetailsDiv').removeClass('hide');
    $('.modal-body').html(y);
    $('.modal-footer').addClass('hide');
  });
  $(".nav-item").click(function() {
    $('.nav-item').removeClass("active")
    $(this).addClass("active");
    // var s = $(this).attr('name');
    // if (s == 1) {
    //   $('.carouselImage').addClass('opacityP1');
    //   $('.carouselImage').css("border", "solid 2px red");
    // } else {
    //   $('.carouselImage').removeClass('opacityP1');
    //   $('.carouselImage').css("borderStyle", "none");
    // }
  });

  /* Password Image settings*/
  $('.img').addClass('hide');
  $('#password').hover(function() {
    $('.img').removeClass('hide');
  }, function() {
    $('.img').addClass('hide');
  });
  $('.img').hover(function() {
    $('.img').removeClass('hide');
  }, function() {
    $('.img').removeClass('hide');
  });

  // Validation
  $.validator.addMethod("pwcheckspechars", function(value) {
    return /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/.test(value)
  });
  $.validator.addMethod("pwchecknumber", function(value) {
    return /\d/.test(value) // has a digit
  });
  $("#signupForm").validate({

    rules: {
      mobi: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 12,
      },

    },
    messages: {
      mobi: {
        required: "Please enter Your Mobile Number",
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number"
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
        maxlength: "Your password must be at most 12 characters long",
      },

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
  password.type = 'text';
}

function mUp() {
  password.type = 'password';
}

function myFunction() {
  var em1 = document.getElementById("mobi").value;
  var pas1 = document.getElementById("password").value;
  var encodePass = btoa(pas1).toString();
  var decodedString = atob(encodePass);
  var obj = {
    "username": em1,
    "password": decodedString
  };
  console.log(obj);
  $.when(Posthandler("/route/login", obj, true)).done(function(res) {
    console.log(res);
    if (res.resCode == 'OK') {
      var role = res.role;
      var name = res.name;
      var number = res.number;
      login = {
        "Role": role,
        "Name": name,
        "Number": number
      };
      // storagesetItem("login", login);
      sessionsetItem("login", login);
      window.location.replace("dashboard.html");
    } else if (res.resCode == 'Error') {
      console.log(res.msg);
      swal("Error!", res.msg, "error");
    }
  }).fail(function() {
    swal("Error!", "sorry unable to LogIn. please check your internet connection", "error");
  });
}

$.validator.setDefaults({
  submitHandler: function() {
    myFunction();
  }
});

var x = '<div class="formTitle border iti-Padding5"><div class="row no-margin headerDiv2"><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation1">Name<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation1" placeholder="Your Name" value="" required=""></div><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation2">Mobile<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation2" placeholder="Your Number" value="" required=""></div><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation2">Email<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation2" placeholder="Your Email" value="" required=""></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 no-padding"><label for="validation2">Message<i class="red"> &#42</i></label><textarea class="form-control" rows="2" id="comment" placeholder="Enter Your Message"></textarea></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 padding5"></div></div></div>';

var y = 'ITI Jobs is a portal. We will provide contact between student and comapany who have passed ITI trade and registered with the ITI Jobs Portal. On this portal registerd company find the cadidate in our database according to the trade and select a valid candidate. we are not a typical job provider we are only provide the way to candidate and companies. ITI Jobs Portal initiative is provide the skills candidate to company and company grab skills candidate.';
