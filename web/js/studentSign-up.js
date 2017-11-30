var login = storagegetItem("login");
console.log(login);
if ((login == null) || (login == "") || (login == undefined)) {
  $('.adminRedioDiv').addClass('hide');
  $('.bodyloading').addClass('hide');
  $('#formStudent').removeClass('hide');
} else {
  $('.bodyloading').addClass('hide');
  $('#formStudent').removeClass('hide');
}
$.validator.addMethod("onlyLatters", function(value) {
  return /^[a-zA-Z\s]+$/i.test(value)
});
$.validator.addMethod("emailformat", function(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value)
});
$.validator.addMethod("validDate", function(value) {
  return moment(value,'YYYY-MM-DD',true).isValid()
});
var number = /^[0-9]+$/;
var letters = /^[a-zA-Z\s]+$/;
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

$(document).ready(function() {
  $('#studentName').focus().select();
  $("#studentForm").validate({
    rules: {
      studentName: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      studentFather: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      studentMother: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      studentEmail: {
        required: true,
        emailformat: true,
        maxlength: 25,
      },
      date: {
        required: true,
        validDate: true,
      },
      sex: {
        required: true,
        maxlength: 6,
      },
      studentAddress: {
        required: true,
        maxlength: 25,
      },
      studentCity: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      studentState: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      studentPin: {
        required: true,
        digits: true,
        minlength: 6,
        maxlength: 6,
      },
      studentMobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      studentCollege: {
        required: true,
        maxlength: 25,
      },
      trade: {
        required: true,
      },
      studentPassY: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 4,
      },
      studentPer: {
        required: true,
        digits: true,
        maxlength: 3,
      },
      studentHSPer: {
        required: true,
        digits: true,
        maxlength: 3,
      },
      jobs: {
        required: true,
      },
    },
    messages: {
      studentName: {
        required: "Please enter Your Name",
        onlyLatters: "Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      studentFather: {
        required: "Please provide Your Father's Name",
        onlyLatters: "Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      studentMother: {
        required: "Please provide Your Mother's Name",
        onlyLatters: "Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      studentEmail: {
        required: "Please provide Your Email Address",
        emailformat: "Please Provide Valid Email Address",
        maxlength: "Field should not more then 25 characters",
      },
      date: {
        required: "Please provide Your Date of Birth",
        validDate:"Please enter a valid date in the format YYYY-MM-DD",
      },
      sex: {
        required: "This field it mandatory",
        maxlength: "Field should not more then 6 characters",
      },
      studentAddress: {
        required: "Please provide Your Address",
        maxlength: "Field should not more then 25 characters",
      },
      studentCity: {
        required: "Please provide Your City",
        onlyLatters: "City Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      studentState: {
        required: "Please provide Your State",
        onlyLatters: "State Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      studentPin: {
        required: "Please provide Your PinCode",
        digits: "Please enter a valid Pin Code Number",
        minlength: "Please put 6 digit Pin number",
        maxlength: "Please put 6 digit pin number"
      },
      studentMobile: {
        required: "Please provide Your Mobile number",
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number",
      },
      studentCollege: {
        required: "Please provide Your College Name",
        maxlength: "Field should not more then 25 characters",
      },
      trade: {
        required: "Please Select Your Trade",
      },
      studentPassY: {
        required: "Please provide Year of Passing",
        digits: "Please enter a valid Year Code Number",
        minlength: "year should not be less then 4 digits",
        maxlength: "year should not be more then 4 digits",
      },
      studentPer: {
        required: "Please provide Your Percentage",
        digits: "Enter valid Percentage and (.) not allow",
        maxlength: "Field should not more then 3 Numbers",
      },
      studentHSPer: {
        required: "Please provide Your High School Percentage",
        digits: "Enter valid Percentage and (.) not allow",
        maxlength: "Field should not more then 3 Numbers",
      },
      jobs: {
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
  var end = new Date();
  var date_input = $('input[name="date"]'); //our date input has the name "date"
  var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
  var options = {
    format: 'yyyy-mm-dd',
    endDate: '2010-01-01',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  // redio button for Experience
  $('input:radio[name="jobs"]').change(function() {
    if ($(this).val() == 'Yes') {
      $('.showExperienceCheckbox').removeClass('hide');

    } else {
      $('.showExperienceCheckbox').addClass('hide');
    }
  });
  var $subscribeInput = $('input[name="checkedEx"]');
  $subscribeInput.on('click', function() {
    if ($(this).is(':checked')) {
      $('.showExperienceDiv').removeClass('hide');
    } else {
      $('.showExperienceDiv').addClass('hide');
    }
  });
  var obj;
  $.when(Gethandler("/route/getCollegeLists", obj, true)).done(function(res) {
    $("#studentCollege").html(" ");
    if (res.resCode == 'OK') {
      $("#studentCollege").append('<option selected disabled>None</option>');
      for (var i = 0; i < res.results.length; i++) {
        $("#studentCollege").append('<option value="' + res.results[i]['Name'] + '">' + res.results[i]['Name'] + '</option>');
      }
    } else {
      console.log(res.results);
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load College list. please check your internet connection", "error");
  });

  $('#studentCollege').on('change', function() {
    var x = $(this).val();
    $("#trade").html(" ");
    $.when(Posthandler("/route/getCollegeWiseTradeLists", {
      "Name": x
    }, true)).done(function(res) {
      if (res.resCode == 'OK') {
        $("#trade").append('<option selected disabled>None</option>');
        for (var i = 0; i < res.results.length; i++) {
          $("#trade").append('<option value="' + res.results[i]['Trade'] + '">' + res.results[i]['Trade'] + '</option>');
        }
      } else {
        console.log(res.results);
      }
    }).fail(function() {
      swal("Error!", "sorry unable to load College Wise Trade list. please check your internet connection", "error");
    });
  });

  $.when(Gethandler("/route/getExperienceLists", obj, true)).done(function(res) {
    $("#studentExpYear").html(" ");
    if (res.resCode == 'OK') {
      $("#studentExpYear").append('<option selected disabled>None</option>');
      for (var i = 0; i < res.results.length; i++) {
        $("#studentExpYear").append('<option value="' + res.results[i]['Id'] + '">' + res.results[i]['experience'] + '</option>');
      }
    } else {
      console.log(res.results);
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load Experience list. please check your internet connection", "error");
  });
});
