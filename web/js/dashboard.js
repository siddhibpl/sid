$(document).ready(function() {
  $('#example').DataTable();
  $('#example_wrapper').addClass('no-margim padding5');
  // initial loading script role wise dynamic append
  var login = sessiongetItem("login");
  console.log(login);
  var uname = login.Name;
  var unumber = login.Number;
  var urole = login.Role;
  if (urole == "Admin") {
    $('.addNewUser').removeClass('hide');
  } else {
    $('.addNewUser').addClass('hide');
  }
  $('.page-header').html("<div>" + urole + " - <span class='username'>" + uname + "</span></div>");
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
  if (login.Role == 'Admin') {
    $('#insertMyCard').append(admMyCard);
  } else if (login.Role == 'Company') {
    $('#insertMyCard').append(camMyCard);
  } else if (login.Role == 'College') {
    $('#insertMyCard').append(colMyCard);
  } else if (login.Role == 'Student') {
    $('#insertMyCard').append(stuMyCard);
  }
  // for dashboard click function
  $('#dashboard').click(function() {
    $('.viewDetailsDiv').addClass('hide');
  });
  // for addNewUser click function
  $('#addNewUser').click(function() {
    window.location.replace("html/sign-up.html");
  });
  // for help click function open modal
  $('.help').click(function() {
    $('#exampleModalLongTitle').html("Help");
    // $('.listComDetailsDiv').removeClass('hide');
    $('.modal-body').html(x);

  });
  // for profile click function open modal
  $('.profile').click(function() {
    $('#exampleModalLongTitle').html("Profile");
    // $('.listComDetailsDiv').removeClass('hide');
    $('.modal-body').html("<div style='text-align: center';><img src='img/student.png' style='border-radius: 50%' alt='Profile Image' height='102' width='102'><br><br><table class='myTable table-striped table-bordered'><tr><td>Name</td><td>" + uname + "</td></tr><tr><td>Number</td><td>" + unumber + "</td></tr><tr><td>Role</td><td>" + urole + "</td></tr><table></div>");

  });
  // for dashboard click function
  $('.logout').click(function() {
    // $('.listComDetailsDiv').addClass('hide');
    var obj = {};

    $.when(Posthandler("/route/logout", obj, true)).done(function(res) {
      console.log(res);
      if (res.resCode === "OK") {
        sessionremoveItem("login");
        sessionremoveItem("newAdmin");
        window.location.replace("login.html");
      } else {
        console.log(res.msg + "else");
        window.location.replace("login.html");
      }
    }).fail(function() {
      swal("Error!", "sorry unable to logout. please check your internet connection", "error");
      window.location.replace("login.html");
    });
  });
  // for add activeA class in comman list component in Navbar on-click function
  // $('.listCom').click(function() {
  //   $('.listCom').removeClass('activeA');
  //   $(this).addClass('activeA');
  // });
  // for add activeA class in comman list component in Sidebar on-click function
  $('.listComA').click(function() {
    $('.viewDetailsDiv').removeClass('hide');
    $('.listComA').removeClass('activeA');
    // alert(this.className.split(" ")[0]);
    $(this).addClass('activeA');
  });
  // for Sidebar anch0 click function About ME button
  $('.anch0').click(function() {
    aboutMeFunction();
  });
  // for Sidebar anch1 click function
  $('.anch1').click(function() {
    $('.anchLegend').html("Total Companies");
    $('.anchPara').html("We have registered more then 30 company.<br>Some of them are below.");
    $('.headerId').html("company ID");
    $('.headerName').html("company Name");
    $('.headerArea').html("company Location");
    $('.headerDetails').html("Year of Establishment");
    $('#tableBody').html("<tr><td>1,001</td><td>Aakash India Pvt Ltd</td><td>Bhopal</td><td>2011</td></tr><tr><td>1,002</td><td>Raj industries</td><td>Bhopal</td><td>1989</td></tr><tr><td>1,003</td><td>Vijay construction</td><td>Vidish</td><td>2007</td></tr><tr><td>1,004</td><td>Malvin India</td><td>Jabalpur</td><td>2017</td></tr><tr><td>1,005</td><td>Shiva industries</td><td>Indore</td><td>2015</td></tr>");
  });
  // for Sidebar anch2 click function
  $('.anch2').click(function() {
    $('.anchLegend').html("Total ITI Listed");
    $('.anchPara').html("We have registered more then 100 ITI.<br>Some of them are below.");
    $('.headerId').html("college ID");
    $('.headerName').html("college Name");
    $('.headerArea').html("college Location");
    $('.headerDetails').html("Course");
    $('#tableBody').html("<tr><td>2,001</td><td>SGS collage</td><td>Bhopal</td><td>1 year cource</td></tr><tr><td>2,002</td><td>Raah collage</td><td>Itarsi</td><td>6 Month course</td></tr><tr><td>2,003</td><td>Gov ITI collage</td><td>Vidish</td><td>2 year PG-Diploma coure</td></tr><tr><td>2,004</td><td>Laxmipati institute</td><td>Jabalpur</td><td>! year ITI course</td></tr><tr><td>2,005</td><td>Ashoka collage</td><td>Indore</td><td>1 year course</td></tr>");

  });
  // for Sidebar anch3 click function
  $('.anch3').click(function() {
    $('.anchLegend').html("Total Students");
    $('.anchPara').html("We have register more then 500 students.<br>Some of them are below.");
    $('.headerId').html("Student ID");
    $('.headerName').html("Student Name");
    $('.headerArea').html("Student Address");
    $('.headerDetails').html("Student Qualification");
    $('#tableBody').html("<tr><td>3,001</td><td>Aakash</td><td>Bhopal</td><td>Diploma</td></tr><tr><td>3,002</td><td>Rahul</td><td>Bhopal</td><td>Diploma</td></tr><tr><td>3,003</td><td>Ajay</td><td>Vidish</td><td>PG-Diploma</td></tr><tr><td>3,004</td><td>Ravi</td><td>Jabalpur</td><td>ITI</td></tr><tr><td>3,005</td><td>Shiva</td><td>Indore</td><td>12th</td></tr>");

  });
  // for Sidebar anch4 click function
  $('.anch4').click(function() {
    $('.anchLegend').html("Total Placements");
    $('.anchPara').html("20 Student got placed by ITI Jobs Portal.<br>Some of them are below.");
    $('.headerId').html("Student ID");
    $('.headerName').html("Student Name");
    $('.headerArea').html("Student Address");
    $('.headerDetails').html("Student Qualification");
    $('#tableBody').html("<tr><td>4,001</td><td>Anita</td><td>Bhopal</td><td>Diploma</td></tr><tr><td>4,002</td><td>Rishabh</td><td>Indore</td><td>PG-Diploma</td></tr><tr><td>4,003</td><td>Ajay</td><td>Vidish</td><td>PG-Diploma</td></tr><tr><td>4,004</td><td>Ravi</td><td>Jabalpur</td><td>ITI</td></tr><tr><td>4,005</td><td>Shivendra</td><td>Indore</td><td>12th</td></tr>");
  });
});

var x = '<div class="formTitle border iti-Padding5"><div class="row no-margin headerDiv2"><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation1">Name<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation1" placeholder="Your Name" value="" required=""></div><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation2">Mobile<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation2" placeholder="Your Number" value="" required=""></div><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 no-padding"><label for="validation2">Email<i class="red"> &#42</i></label><input type="text" class="form-control" id="validation2" placeholder="Your Email" value="" required=""></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 no-padding"><label for="validation2">Message<i class="red"> &#42</i></label><textarea class="form-control" rows="2" id="comment" placeholder="Enter Your Message"></textarea></div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 no-padding"><button type="submit" class="btn btn-primary btn-sm" name="signup" value="Sign up">Submit</button></div></div></div>';

var admMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'>&uarr;</div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><a class='anch0 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/company.png' alt='Total Company image' width='65' height='65'><div class='total-cssD total-company'>0</div><div class='iti-dtitle'>Total Companies</div><p class='no-margin no-padding'><a class='anch1 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/itiicon.png' alt='Total ITI image' width='65' height='65'><div class='total-cssD total-iti'>0</div><div class='iti-dtitle'>Total ITI Listed</div><p class='no-margin no-padding'><a class='anch2 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/student.png' alt='Total Students image' width='65' height='65'><div class='total-cssD total-student'>0</div><div class='iti-dtitle'>Total Students</div><p class='no-margin no-padding'><a class='anch3 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div>";

var camMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'>&uarr;</div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><a class='anch0 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/itiicon.png' alt='Total ITI image' width='65' height='65'><div class='total-cssD total-iti'>0</div><div class='iti-dtitle'>Total ITI Listed</div><p class='no-margin no-padding'><a class='anch2 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/student.png' alt='Total Students image' width='65' height='65'><div class='total-cssD total-student'>0</div><div class='iti-dtitle'>Total Students</div><p class='no-margin no-padding'><a class='anch3 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div>";

var colMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'>&uarr;</div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><a class='anch0 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/company.png' alt='Total Company image' width='65' height='65'><div class='total-cssD total-company'>0</div><div class='iti-dtitle'>Total Companies</div><p class='no-margin no-padding'><a class='anch1 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/student.png' alt='Total Students image' width='65' height='65'><div class='total-cssD total-student'>0</div><div class='iti-dtitle'>Total Students</div><p class='no-margin no-padding'><a class='anch3 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div>";

var stuMyCard = "<div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/aboutMe.jpg' alt='About Me image' width='65' height='65'><div class='total-cssD'>&uarr;</div><div class='iti-dtitle'>About Me</div><p class='no-margin no-padding'><a class='anch0 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div><div class='col-sm-6 col-md-3 col-lg-3 col-xl-3 iti-Padding5'><div class='iti-DivBod iti-Padding10 iti-DivCen iti-DivCenD'><img class='img-rounded borderImage' src='img/company.png' alt='Total Company image' width='65' height='65'><div class='total-cssD total-company'>0</div><div class='iti-dtitle'>Total Companies</div><p class='no-margin no-padding'><a class='anch1 btn btn btn-secondary listComA' role='button'>View details &raquo;</a></p></div></div>";
