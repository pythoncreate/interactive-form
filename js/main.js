var intRegex = /^[0-9]+$/;

//Set focus on first text field and hide other text box
$( document ).ready(function() {
    $(".container label:first").focus();
    $("#other-title").hide();
});


//Creates text field when 'other' is selected as a job
$("#title").change(function(){
   var selectedText = $("select option:selected").val();
   if (selectedText === 'other') {
        $("#other-title").show();
    } else {
        $('#other-title').hide();
    }
   });

//On selection of the design, sets appropriate color based on the design selected
$('#design').on('change', function(){
    if( $(this).val() == 'js puns' ){
        $('.js').prop('disabled', true);
        $('.js_puns').prop('disabled', false);
    } else if( $(this).val() == 'heart js' ){
    	$('.js_puns').prop('disabled', true);
    	$('.js').prop('disabled', false);
    } else {
    	$('.js').prop('disabled', false);
    	$('.js_puns').prop('disabled', false);
    }
});

//Activities
var $activities = $('.activities input[type="checkbox"]');

var tuesMorn = 0;
var tuesAft = 0;
var wedMorn = 0
var wedAft = 0;
var main = 0;
var total = 0; 

//On change of activity select boxes, looks for duplicate times and creates total $ amount
$activities.change(function() {
  var activityClass = $(this).closest('input').attr("class");
  var isChecked = this.checked;
  $activities.not(this).prop('disabled', false);

  if (activityClass === 'tues_morn') {
    tuesMorn = isChecked ? tuesMorn + 1 : tuesMorn - 1;
    total = isChecked ? total + 100: total -100;
    if (tuesMorn > 1) {
      $(this).prop('disabled', true);
      alert("You Signed Up For Too Many Morning Classes");
    }
  } else if (activityClass === 'tues_aft') {
    	tuesAft = isChecked ? tuesAft + 1 : tuesAft - 1;
    	total = isChecked ? total + 100: total -100;
    	if (tuesAft > 1) {
    	$(this).prop('disabled', true);
      	alert("You Signed Up For Too Many Afternoon Classes");
      	}
  } else if (activityClass === 'wed_morn'){
        wedMorn = isChecked ? wedMorn + 1 : wedMorn - 1;
    	total = isChecked ? total + 100: total -100;
  } else if (activityClass === 'wed_aft'){
        wedAft = isChecked ? wedAft + 1 : wedAft - 1;
    	total = isChecked ? total + 100: total -100;
  } else if (activityClass === 'main'){
        main = isChecked ? main + 1 : main - 1;
    	total = isChecked ? total + 200: total -200;
}
    document.getElementById('Totalcost').innerHTML = "$" + total;
});

//Changes Payment Sections Based on User Payment Choice
$('#bitcoin').hide();
$('#paypal').hide();
$("#payment option[value='credit card']").prop('selected', true);
$('#payment').on('change', function(){
    if( $(this).val() == 'credit card' ){
      $('#bitcoin').hide();
      $('#paypal').hide();
      $('#credit-card').show();
    } else if ( $(this).val()=='paypal' ){
      $('#paypal').show();
      $('#credit-card').hide();
      $('#bitcoin').hide();
    } else if ( $(this).val()=='bitcoin'){
      $('#paypal').hide();
      $('#credit-card').hide();
      $('#bitcoin').show();
    }

});

// Name can't be blank
function validateName(){
    var name = $('#name').val();
    var error_name = true
    if (name === ''){
        $(".error_name").show();
        console.log('name cant be empty');
    } else {
        error_name = false;
    }
    return error_name

}
// Email must be valid
function validateEmail(){
    var email = $('#mail').val();
    var error_mail = true;
    var pattern = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    error_email = pattern.test(email);
    if (!error_email){
        $(".error_email").show();
        error_email = true;
    } else {
        error_email = false;
    }
    return error_email
}
// One Activity Must Be Selected
function validateActivities(){
    var totalActivities = $('.activities input[type="checkbox"]:checked').length;
    var error_activity = true;
    if (totalActivities < 1) {
        $(".error_activities").show();
    } else {
        error_activity = false;
    }
    return error_activity
}

// Validate the Credit Card Number --Make sure is between 13 to 16 digit number
function validateCC(){
    var cc = $("#cc-num").val();
    var errorCC = true;
    errorCC = intRegex.test(cc);
    if ((!errorCC) || ((cc.length < 13) || (cc.length > 16))){
        $(".error_cc").show();
        errorCC = true;
    } else {
        errorCC = false;
    }
    return errorCC
}

function validateZip(){
    var zip = $("#zip").val().length;
    var errorZip = true;
    errorZip = intRegex.test(zip);
    if ((!errorZip)||(zip!= 5)){
        $(".error_zip").show();
        errorZip = true;
        console.log('zip issue');
    } else {
        errorZip = false;
    }
    return errorZip
}

function validateCVV(){
    var cvv = $("#cvv").val().length;
    var errorCVV = true;
    errorCVV = intRegex.test(cvv);
    if ((!errorCVV)||(cvv!= 3)){
        $(".error_cvv").show();
        errorCVV = true;
        console.log('cvv issue');
    } else {
        errorCVV = false;
    }
    return errorCVV
}

//Check for Credit Card Issue -- Any problems with CC, Zip Code or CVV
function validateCredit(){
    var credit = $("#payment option[value='credit card']")
    errorCC = validateCC();
    errorZip = validateZip();
    errorCVV = validateCVV();
    isCreditIssue = false;
    if (credit.prop('selected', true)){
        if ((errorCC) || (errorZip) || (errorCVV)){
        isCreditIssue = true;
        console.log('credit issue');
        }
     }
    return isCreditIssue
}


// On Form Submission Validate Form
$("#contact_submit button").click(function(event){
    error_name = validateName();
    error_email = validateEmail();
    error_activity = validateActivities();
    isCreditIssue = validateCredit();
    event.preventDefault();

    var valid = true;

    if ((error_name) || (error_email) || (error_activity) || (isCreditIssue)){
        console.log("errors");
        valid = false;
    } else {
        alert('GREAT! form completed');
        valid = true;
    }
    if (valid) {
    return;
    }


});
