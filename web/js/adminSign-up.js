var secret = sessiongetItem("secret");
console.log(secret);
var login = sessiongetItem("login");
console.log(login);
if((secret == null)||(secret == "")||(secret == undefined)){
  if ((login == null) || (login == "") || (login == undefined)) {
    $('.bodyloading').addClass('hide');
    $('#formAdmin').removeClass('hide');
  } else {
    $('.bodyloading').addClass('hide');
    $('#formAdmin').removeClass('hide');
  }
}else{
  $.when(Posthandler("/route/aboutMe", secret, true)).done(function(res) {
    if (res.resCode == 'OK') {
      var arr = {};
      arr = res.results;
      console.log(">>>>>>admin>>>res",res);
      $('.containerload').css('min-height', '550px');
      $('#adminName').val(arr[0]["Name"]);
      $('#adminEmail').val(arr[0]["Email"]);
      $('#adminMobile').val(arr[0]["Mobile"]);
      // $('#datepicker').val(moment(arr["dob"]).format("YYYY-MM-DD"));
      $('#adminAddress').val(arr[0]["Address"]);
      $('#adminCity').val(arr[0]["City"]);
      $('#adminPincode').val(arr[0]["Pincode"]);
      $("#adminMobile").attr("disabled", "disabled");

      $('.bodyloading').addClass('hide');
      $('#formAdmin').removeClass('hide');
    } else {
      swal("Error!", res.msg, "error");
    }
  }).fail(function() {
    swal({
        title: "Error!",
        text: "fail to connect",
        type: "error"
      },
      function() {
        window.location.href = '../login.html';
      });
  });
}

$.validator.addMethod("onlyLatters", function(value) {
  return /^[a-zA-Z\s]+$/i.test(value)
});
$.validator.addMethod("emailformat", function(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value)
});
$(document).ready(function() {
  $('#adminName').focus().select();
  var validator = $("#adminForm").validate({
    rules: {
      adminName: {
        required: true,
        onlyLatters: true,
        maxlength: 20,
      },
      adminEmail: {
        required: true,
        emailformat: true,
        maxlength: 30,
      },
      adminMobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      adminAddress: {
        required: true,
        maxlength: 30,
      },
      adminCity: {
        required: true,
        onlyLatters: true,
        maxlength: 20,
      },
      adminPincode: {
        required: true,
        digits: true,
        minlength: 6,
        maxlength: 6,
      },
    },
    messages: {
      adminName: {
        required: "Please enter Your Name",
        onlyLatters: "Name should be text only",
        maxlength: "Field should not more then 20 characters",
      },
      adminEmail: {
        required: "Please provide Your Email Address",
        emailformat: "Please Provide Valid Email Address",
        maxlength: "Field should not more then 30 characters",
      },
      adminMobile: {
        required: "Please enter Your Mobile Number",
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number",
      },
      adminAddress: {
        required: "Please provide Your Address",
        maxlength: "Field should not more then 30 characters",
      },
      adminCity: {
        required: "Please provide Your City",
        onlyLatters: "City Name should be text only",
        maxlength: "Field should not more then 20 characters",
      },
      adminPincode: {
        required: "Please provide Your PinCode",
        digits: "Please enter a valid Pin Code Number",
        minlength: "Please put 6 digit Pin number",
        maxlength: "Please put 6 digit pin number"
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
