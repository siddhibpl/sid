var login = storagegetItem("login");
console.log(login);
if ((login == null) || (login == "") || (login == undefined)) {
  $('.adminRedioDiv').addClass('hide');
  $('.bodyloading').addClass('hide');
  $('#formCompany').removeClass('hide');
} else {
  $('.bodyloading').addClass('hide');
  $('#formCompany').removeClass('hide');
}
$.validator.addMethod("onlyLatters", function(value) {
  return /^[a-zA-Z\s]+$/i.test(value)
});
$.validator.addMethod("emailformat", function(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value)
});
$(document).ready(function() {
$('#comName').focus().select();
$("#companyForm").validate({
  rules: {
    comName: {
      required: true,
      onlyLatters: true,
      maxlength: 25,
    },
    comReg: {
      required: true,
      maxlength: 25,
    },
    comLand: {
      required: true,
      digits: true,
      maxlength: 18,
    },
    comEmail: {
      required: true,
      emailformat: true,
      maxlength: 25,
    },
    comWeb: {
      required: true,
      maxlength: 18,
    },
    comYear: {
      required: true,
      maxlength: 4,
    },
    comAddress: {
      required: true,
      maxlength: 25,
    },
    comCity: {
      required: true,
      onlyLatters: true,
      maxlength: 18,
    },
    comState: {
      required: true,
      onlyLatters: true,
      maxlength: 18,
    },
    comPincode: {
      required: true,
      digits: true,
      minlength: 6,
      maxlength: 6,
    },
    comDistrict: {
      required: true,
      onlyLatters: true,
      maxlength: 18,
    },
    comHRName: {
      required: true,
      onlyLatters: true,
      maxlength: 18,
    },
    comHREmail: {
      required: true,
      emailformat: true,
      maxlength: 25,
    },
    comHRMobile: {
      required: true,
      digits: true,
      minlength: 10,
      maxlength: 10,
    },
    comLogo: {
      required: true,
    },
  },
  messages: {
    comName: {
      required: "Please enter Company Name",
      onlyLatters: "Name should be text only",
      maxlength: "Field should not more then 25 characters",
    },
    comReg: {
      required: "Please provide Company Registration Number",
      maxlength: "Field should not more then 25 characters",
    },
    comLand: {
      required: "Please provide Company office Number",
      digits: "office Number should be digits only",
      maxlength: "Field should not more then 18 Numbers",
    },
    comEmail: {
      required: "Please provide Company Email Address",
      emailformat: "Please Provide Valid Email Address",
      maxlength: "Field should not more then 25 characters",
    },
    comWeb: {
      required: "Please provide Company Website",
      maxlength: "Field should not more then 25 characters",
    },
    comYear: {
      required: "This field it mandatory",
      maxlength: "Field should not more then 4 Numbers",
    },
    comAddress: {
      required: "Please provide Company Address",
      maxlength: "Field should not more then 25 characters",
    },
    comCity: {
      required: "Please provide Company City Name",
      onlyLatters: "City Name should be text only",
      maxlength: "Field should not more then 18 characters",
    },
    comState: {
      required: "Please provide Company State Name",
      onlyLatters: "State Name should be text only",
      maxlength: "Field should not more then 18 characters",
    },
    comPincode: {
      required: "Please provide Company PinCode",
      digits: "Please enter a valid Pin Code Number",
      minlength: "Please put 6 digit Pin number",
      maxlength: "Please put 6 digit pin number"
    },
    comDistrict: {
      required: "Please provide Company District Name",
      onlyLatters: "District Name Name should be text only",
      maxlength: "Field should not more then 18 characters",
    },
    comHRName: {
      required: "Please enter Company HR Name",
      onlyLatters: "Name should be text only",
      maxlength: "Field should not more then 18 characters",
    },
    comHREmail: {
      required: "Please provide HR Email Address",
      emailformat: "Please Provide Valid Email Address",
      maxlength: "Field should not more then 25 characters",
    },
    comHRMobile: {
      required: "Please provide Company HR Mobile number",
      digits: "Please enter a valid Mobile Number",
      minlength: "Please put 10  digit mobile number",
      maxlength: "Please put 10  digit mobile number",
    },
    comLogo: {
      required: "This field it mandatory",
    },
  },
  errorElement: "em",
  errorPlacement: function(error, element) {
    // Add the `help-block` class to the error element
    error.addClass("help-block");

    if (element.prop("type") === "checkbox") {
      error.insertAfter(element.parent("label"));
    } else if (element.is(":radio")) {
      error.insertAfter(element.parent("div"));
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
