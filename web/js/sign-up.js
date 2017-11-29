$(document).ready(function() {
  // $("#containerload").load("studentSign-up.html");
});
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
// var login = storagegetItem("login");
var login = sessiongetItem("login");
console.log(login);
// console.log(login1);
if((login == null)||(login == "")||(login == undefined)){
  // $('.adminRedioDiv').addClass('hide');
}
// $(window).unload(function(){
//   localStorage.clear();
// });
// window.onbeforeunload = function() {
//   localStorage.clear();
//   return '';
// };
