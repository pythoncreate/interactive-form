//Set focus on first text field and hide other text box
$( document ).ready(function() {
    $(".container label:first").focus();
    $("#other-title").hide();
});


//Creates text field when 'other' is selected as a job
$("#title").change(function(){
   let selectedText = $("select option:selected").val();
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
    	$('.js_puns').show();
        $('.js').show();
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

