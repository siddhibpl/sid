var secret = sessiongetItem("secret");
console.log(secret);
var login = sessiongetItem("login");
console.log(login);
if ((secret == null) || (secret == "") || (secret == undefined)) {
  if ((login == null) || (login == "") || (login == undefined)) {
    $('.adminRedioDiv').addClass('hide');
    $('.bodyloading').addClass('hide');
    $('#formITI').removeClass('hide');
  } else {
    $('.bodyloading').addClass('hide');
    $('#formITI').removeClass('hide');
  }
} else {
  $.when(Posthandler("/route/aboutMe", secret, true)).done(function(res) {
    if (res.resCode == 'OK') {
      var arr = {};
      arr = res.results;
      console.log(">>>>>>formCompany>>>res", res);
      $('.containerload').css('min-height', '550px');
      $('#itiName').val(arr[0]["Name"]);
      $('#itiReg').val(arr[0]["Registration"]);
      $('#itiLand').val(arr[0]["Landline"]);
      $('#itiEmail').val(arr[0]["Email"]);
      $('#itiMobile').val(arr[0]["Mobile"]);
      // $('input[name=itiType]:checked').val(arr[0]["YOI"]);
      $("input[name=itiType][value=" + arr[0]["Type"] + "]").attr('checked', 'checked');
      $('#itiAddress').val(arr[0]["Address"]);
      $('#itiCity').val(arr[0]["City"]);
      $('#itiState').val(arr[0]["State"]);
      $('#itiPincode').val(arr[0]["Pincode"]);
      $('#itiDistrict').val(arr[0]["District"]);
      // $('#datepicker').val(moment(arr["dob"]).format("YYYY-MM-DD"));
      $('#itiTPOName').val(arr[0]["TPO_Name"]);
      $('#itiTPOEmail').val(arr[0]["TPO_Email"]);
      $('#itiTPOMobile').val(arr[0]["TPO_Mobile"]);
      $("#itiTPOMobile").attr("disabled", "disabled");

      // $('.bodyloading').addClass('hide');
      $('#formITI').removeClass('hide');
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
  $('#itiName').focus().select();
  $("#itiForm").validate({
    rules: {
      itiName: {
        required: true,
        onlyLatters: true,
        maxlength: 25,
      },
      itiReg: {
        required: true,
        maxlength: 25,
      },
      itiLand: {
        required: true,
        digits: true,
        maxlength: 18,
      },
      itiEmail: {
        required: true,
        emailformat: true,
        maxlength: 25,
      },
      itiMobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      itiType: {
        required: true,
        maxlength: 10,
      },
      itiAddress: {
        required: true,
        maxlength: 25,
      },
      itiCity: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      itiState: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      itiPincode: {
        required: true,
        digits: true,
        minlength: 6,
        maxlength: 6,
      },
      itiDistrict: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      itiTPOName: {
        required: true,
        onlyLatters: true,
        maxlength: 18,
      },
      itiTPOEmail: {
        required: true,
        emailformat: true,
        maxlength: 25,
      },
      itiTPOMobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      itiLogo: {
        required: true,
        maxlength: 18,
      },
      trade: {
        required: true,
      },
    },
    messages: {
      itiName: {
        required: "Please enter College Name",
        onlyLatters: "Name should be text only",
        maxlength: "Field should not more then 25 characters",
      },
      itiReg: {
        required: "Please provide College Registration Number",
        maxlength: "Field should not more then 25 characters",
      },
      itiLand: {
        required: "Please provide college office Number",
        digits: "office Number should be digits only",
        maxlength: "Field should not more then 18 characters",
      },
      itiEmail: {
        required: "Please provide college Email Address",
        emailformat: "Please Provide Valid Email Address",
        maxlength: "Field should not more then 25 characters",
      },
      itiMobile: {
        required: "Please provide College office Mobile Number",
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number",
      },
      itiType: {
        required: "This field it mandatory",
        maxlength: "Field should not more then 10 characters",
      },
      itiAddress: {
        required: "Please provide College Address",
        maxlength: "Field should not more then 25 characters",
      },
      itiCity: {
        required: "Please provide College City Name",
        onlyLatters: "City Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      itiState: {
        required: "Please provide College State Name",
        onlyLatters: "State Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      itiPincode: {
        required: "Please provide college PinCode",
        digits: "Please enter a valid Pin Code Number",
        minlength: "Please put 6 digit Pin number",
        maxlength: "Please put 6 digit pin number"
      },
      itiDistrict: {
        required: "Please provide College District Name",
        onlyLatters: "District Name Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      itiTPOName: {
        required: "Please enter College TPO Name",
        onlyLatters: "Name should be text only",
        maxlength: "Field should not more then 18 characters",
      },
      itiTPOEmail: {
        required: "Please provide TPO Email Address",
        emailformat: "Please Provide Valid Email Address",
        maxlength: "Field should not more then 25 characters",
      },
      itiTPOMobile: {
        required: "Please provide College TPO Mobile number",
        digits: "Please enter a valid Mobile Number",
        minlength: "Please put 10  digit mobile number",
        maxlength: "Please put 10  digit mobile number",
      },
      itiLogo: {
        required: "This field it mandatory",
        maxlength: "Field should not more then 18 characters",
      },
      trade: {
        required: "Please Select Your Trade",
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
  var obj;
  $.when(Gethandler("/route/getTradeLists", obj, true)).done(function(res) {
    if (res.resCode == 'OK') {
      $("#trade").html(" ");
      for (var i = 0; i < res.results.length; i++) {
        $("#trade").append('<option value="' + res.results[i]['trade'] + '">' + res.results[i]['trade'] + '</option>');
      }
      $('#trade').multiselect({
        maxHeight: 155,
        // enableFiltering: true,
        // includeSelectAllOption: true,
        // dropUp: true
      });
      $('.btn-group').addClass('form-control no-padding');
      $('.multiselect').addClass('width100');
      $('.multiselect-container').addClass('width100');
      multiSelectorCheck();
    } else {
      console.log(res.results);
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load Trade list. please check your internet connection", "error");
  });
});

function multiSelectorCheck() {
  if (secret.Key == "Edit") {
    $.when(Posthandler("/route/getCollegeWiseTradeLists", {
      "Name": login.Name
    }, true)).done(function(res) {
      if (res.resCode == 'OK') {
        console.log("getCollegeWiseTradeLists>>>>>>>>>>", res);
        $("#trade").append('<option selected disabled>None</option>');
        for (var i = 0; i < res.results.length; i++) {
          console.log(res.results[i]['Trade']);
          // $("#trade").append('<option value="' + res.results[i]['Trade'] + '">' + res.results[i]['Trade'] + '</option>');
          // $("input[name=trade][value=" + res.results[i]['Trade'] + "]").attr('checked', 'checked');
          $("#trade option[value=" + res.results[i]['Trade'] + "]").prop('selected', true);
        }
        $('#trade').multiselect('refresh');
        $('.bodyloading').addClass('hide');
      } else {
        swal("Error!", res.msg, "error");
      }
    }).fail(function() {
      swal("Error!", "sorry unable to load College Wise Trade list. please check your internet connection", "error");
    });
  }
};
