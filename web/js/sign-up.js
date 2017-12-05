$(document).ready(function() {
  $('input:radio[name="inlineRadioOptions"]').change(function() {
    if ($(this).val() == 's') {
      $("#containerload").load("studentSign-up.html");
      $('.headerSpan1').html('Student Registration Form');
    } else if ($(this).val() == 'i') {
      $("#containerload").load("itiSign-up.html");
      $('.headerSpan1').html('ITI Institute Registration Form');
    } else if ($(this).val() == 'c') {
      $("#containerload").load("companySign-up.html");
      $('.headerSpan1').html('Company Registration Form');
    } else if ($(this).val() == 'a') {
      $("#containerload").load("adminSign-up.html");
      $('.headerSpan1').html('Admin Registration Form');
    }
  });
  // $('input:radio[name="inlineRadioOptions"]').load("studentSign-up.html");
  $('input:radio[name="inlineRadioOptions"]').attr('checked',false);
  // backToTop
  backToTop();
});

// var login = storagegetItem("login");
var secret = sessiongetItem("secret");
console.log(secret);
if((secret == null)||(secret == "")||(secret == undefined)){
  console.log("(secret == null)||(secret == undefined)>>>>>>",secret);
  $('.containerCssHeader').removeClass('hide');
  var login = sessiongetItem("login");
  console.log("else>>>>>>",login);
  if((login == null)||(login == "")||(login == undefined)){
    $('.adminRedioDiv').html('')
    $('.adminRedioDiv').addClass('hide');
  }else{
    $('.adminRedioDiv').html('<label class="form-check-label"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="a">Admin</label>')
    $('.adminRedioDiv').removeClass('hide');
  }
}else if(secret != null){
  console.log(secret);
  if(secret.Key == "Edit"){
  $('.containerCssHeader').addClass('hide');
  console.log("If-Edit>>>>>>",secret);
  if(secret.Role == "Admin"){
    console.log("if admin>>",secret);
    $("#containerload").load("adminSign-up.html");
  }else if(secret.Role == "College"){
    console.log("if college>>",secret);
    $("#containerload").load("itiSign-up.html");
  }else if(secret.Role == "Student"){
    console.log("if student>>",secret);
    $("#containerload").load("studentSign-up.html");
  }else if(secret.Role == "Company"){
    console.log("if company>>",secret);
    $("#containerload").load("companySign-up.html");
  }
}
}else{
  $('.containerCssHeader').removeClass('hide');
  var login = sessiongetItem("login");
  console.log("else>>>>>>",login);
  if((login == null)||(login == "")||(login == undefined)){
    $('.adminRedioDiv').html('')
    $('.adminRedioDiv').addClass('hide');
  }else{
    $('.adminRedioDiv').html('<label class="form-check-label"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="a">Admin</label>')
    $('.adminRedioDiv').removeClass('hide');
  }
}
