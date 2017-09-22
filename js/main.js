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
        $('.js').hide();
        $('.js_puns').show();
    } else if( $(this).val() == 'heart js' ){
    	$('.js_puns').hide();
    	$('.js').show();
    } else {
    	$('.js').show();
    	$('.js_puns').show();
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
  var $this = $(this);
  var activityClass = $this.closest('input').attr("class");
  var isChecked = this.checked;

  if (activityClass === 'tues_morn') {
    tuesMorn = isChecked ? tuesMorn + 1 : tuesMorn - 1;
    total = isChecked ? total + 100: total -100;
  } else if (activityClass === 'tues_aft') {
      tuesAft = isChecked ? tuesAft + 1 : tuesAft - 1;
      total = isChecked ? total + 100: total -100;
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
 if ($this.is('.tues_morn')) {
      //alert("You Signed Up For Too Many Morning Classes");
      $(".tues_morn").not(this).prop('disabled', tuesMorn > 0);
    }
 if ($this.is('.tues_aft')) {
      //alert("You Signed Up For Too Many Afternoon Classes");
         $(".tues_aft").not(this).prop('disabled', tuesAft > 0);
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
        $(".error_name").hide();
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
        $(".error_email").hide();
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
        $(".error_activities").hide();
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
        $(".error_cc").hide();
        errorCC = false;
    }
    return errorCC
}

function validateZip(){
    var zip = $("#zip").val();
    var errorZip = true;
    errorZip = intRegex.test(zip);
    if ((!errorZip)||(zip.length!= 5)){
        $(".error_zip").show();
        errorZip = true;
        console.log('zip issue');
    } else {
        $(".error_zip").hide();
        errorZip = false;
    }
    return errorZip
}

function validateCVV(){
    var cvv = $("#cvv").val();
    var errorCVV = true;
    errorCVV = intRegex.test(cvv);
    if ((!errorCVV)||(cvv.length!= 3)){
        $(".error_cvv").show();
        errorCVV = true;
        console.log('cvv issue');
    } else {
        $(".error_cvv").hide();
        errorCVV = false;
    }
    return errorCVV
}

//Check for Credit Card Issue -- Any problems with CC, Zip Code or CVV
function validateCredit(){
    var credit = $("#payment option[value='credit card']");
    var paypal = $("#payment option[value='paypal']");
    var bitcoin = $("#payment option[value='bitcoin']");
    

    isCreditIssue = false;


    if (credit.prop('selected')){
      errorCC = validateCC();
      errorZip = validateZip();
      errorCVV = validateCVV();

      if ((errorCC) || (errorZip) || (errorCVV)){
      isCreditIssue = true;
      console.log('credit issue');
    } }
    else if (bitcoin.prop('selected')){
      console.log('bitcoin');
      isCreditIssue = false;

    } else if (paypal.prop('selected')){
      console.log('paypal');
      isCreditIssue = false;
    }
 
    return isCreditIssue;
}


// On Form Submission Validate Form
$("#contact_submit button").click(function(event){
    error_name = validateName();
    error_email = validateEmail();
    error_activity = validateActivities();
    isCreditIssue = validateCredit();
    var selectMethod = $("#payment option[value='select_method']");
   
    var valid = true;


    if (selectMethod.prop('selected')){
       alert("Please select payment method");
       console.log("no payment selected");
       event.preventDefault();
    } else if ((error_name) || (error_email) || (error_activity) || (isCreditIssue)){
        console.log("errors");
        valid = false;
        event.preventDefault();
    } else {
        alert('GREAT! form completed');
        valid = true;
    }
    if (valid) {
    return;
    }


});
