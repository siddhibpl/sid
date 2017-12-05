function totalStudentFunction() {
  var login = sessiongetItem("login");
  $('.anchLegend').html("Total Student");
  $(".anchPara").load("html/totalStudentValidation.html");
  $('.anchPara').removeClass('hide');
  $('.tablecontainerDiv').html('');
  $('.editDetails').addClass('hide');
  var obj = {};
if(login.Role != "College"){
  console.log('Not College Api');
  $.when(Gethandler("/route/getTradeLists", obj, true)).done(function(res) {
    $("#trade").html(" ");
    if (res.resCode == 'OK') {
      $("#trade").append('<option selected disabled>None</option>');
      for (var i = 0; i < res.results.length; i++) {
        $("#trade").append('<option value="' + res.results[i]['trade'] + '">' + res.results[i]['trade'] + '</option>');
      }
    } else {
      swal("Error!", res.results , "error");
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load Trade list. please check your internet connection", "error");
  });
}else{
  obj = {
    "Name": login.Name
  };
  console.log('College Api');
  $.when(Posthandler("/route/getCollegeWiseTradeLists", obj, true)).done(function(res) {
    $("#trade").html(" ");
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
}
  $.when(Gethandler("/route/getExperienceLists", obj, true)).done(function(res) {
    $("#studentExpYear").html(" ");
    if (res.resCode == 'OK') {
      $("#studentExpYear").append('<option selected disabled>None</option>');
      for (var i = 0; i < res.results.length; i++) {
        $("#studentExpYear").append('<option value="' + res.results[i]['Id'] + '">' + res.results[i]['experience'] + '</option>');
      }
    } else {
      console.log(res.results);
          window.location.replace("dashboard.html");
    }
  }).fail(function() {
    swal("Error!", "sorry unable to load Experience list. please check your internet connection", "error");
  });
};

function viewMoreFunctionForStudent(arr) {
  var viewMore = '<table style="width:100%" id="viewMoreTable" class="table-striped table-bordered"></table>';
  console.log(arr);
  $(".editrow").click(function(e) {
    var Name = $(this).parents('tr').find('td:first').html();
    console.log(Name);
    $('#exampleModalLongTitle').html("View More About " + Name);
    $('.modal-body').html(viewMore);
    viewMoreStudentByName = {
      "Name": Name,
    };
    $.when(Posthandler("/route/viewMoreStudentByName", viewMoreStudentByName, true)).done(function(res) {
      if (res.resCode == 'OK') {
        console.log(res.results[0]);
        $.each(res.results[0], function(key, value) {
          var body = "<tr>";
          if (key === "Dob") {
            key = "Date of Birth";
            body += "<th>" + key + "</th><td>" + moment(value).format("YYYY-MM-DD") + "</td>";
          } else if (key === "Date") {
            key = "Date of Joining in our Portel";
            body += "<th>" + key + "</th><td>" + moment(value).format("YYYY-MM-DD") + "</td>";
          } else if (key === "YOI") {
            key = "Year Of Incorporation";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (key === "POY") {
            key = "Passing Year";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (key === "Per") {
            key = "Percentage";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (key === "HSPer") {
            key = "Higher School Percentage";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (value === "NA" || value === "No") {} else if (key === "Logo") {} else {
            body += "<th>" + key + "</th><td>" + value + "</td>";
          }
          body += "</tr>";
          $("#viewMoreTable").append(body);
        });
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
          window.location.href = 'dashboard.html';
        });
    });
  });
};

function viewMoreFunctionForStudent1(arr) {
  var viewMore = '<table style="width:100%" id="viewMoreTable" class="table-striped table-bordered"></table>';
  console.log(arr);
  $(".editrow").click(function(e) {
    var Name = $(this).parents('tr').find('td:first').html();
    console.log(Name);
    $('#exampleModalLongTitle').html("View More About " + Name);
    $('.modal-body').html(viewMore);
    viewMoreStudentByName = {
      "Name": Name,
    };
    $.when(Posthandler("/route/viewMoreStudentByName", viewMoreStudentByName, true)).done(function(res) {
      if (res.resCode == 'OK') {
        console.log(res.results[0]);
        $.each(res.results[0], function(key, value) {
          var body = "<tr>";
          if (key === "Dob") {
            key = "Date of Birth";
            body += "<th>" + key + "</th><td>" + moment(value).format("YYYY-MM-DD") + "</td>";
          } else if (key === "Date") {
            key = "Date of Joining in our Portel";
            body += "<th>" + key + "</th><td>" + moment(value).format("YYYY-MM-DD") + "</td>";
          } else if (key === "YOI") {
            key = "Year Of Incorporation";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (key === "POY") {
            key = "Passing Year";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (key === "Per") {
            key = "Percentage";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (key === "HSPer") {
            key = "Higher School Percentage";
            body += "<th>" + key + "</th><td>" + value + "</td>";
          } else if (value === "NA" || value === "No") {} else if (key === "Logo") {} else {
            body += "<th>" + key + "</th><td>" + value + "</td>";
          }
          body += "</tr>";
          $("#viewMoreTable").append(body);
        });
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
          swal.close();
          window.location.href = 'dashboard.html';
        });
    });
  });
};
