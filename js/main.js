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

var $activities = $('.activities > label');

//Activities
// var tuesMorn = 0
// var tuesAft = 0
// var total = 0
// $activities.each(function(){
// 	let activityClass = ($(this).attr("class"));
// 	if (this.checked && activityClass === 'tues_morn'){
// 			tuesMorn += 1;
// 			total += 100;
// 		} else if (this.checked && activityClass === 'tues_aft'){
// 			tuesAft +=1;
// 			total += 100;
// 		} else if (this.checked && activityClass === 'wed_morn'){
// 			total += 100;
// 		} else if (this.checked && activityClass === 'wed_aft'){
// 			total += 100;
// 		} else if (this.checked && activityClass === 'main'){
// 			total += 200;
// 		}
// 	})
// 	console.log(total);

//Activities
var $activities = $('.activities input[type="checkbox"]');

var tuesMorn = 0;
var tuesAft = 0;
var wedMorn = 0
var wedAft = 0;
var main = 0;
var total = 0; 

function calculateTotal(actClass) {
	var total = 0; 
	if (actClass === 'main'){
		total += 200;
	} else {
		total += 100;
	}
	return total;
}


$activities.change(function() {
  var activityClass = $(this).closest('input').attr("class");
  var isChecked = this.checked;

  if (activityClass === 'tues_morn') {
    tuesMorn = isChecked ? tuesMorn + 1 : tuesMorn - 1;
    calculateTotal(activityClass);
    console.log(total);
    if (tuesMorn > 1) {
      alert("You Signed Up For Too Many Morning Classes");
    }
  } else if (activityClass === 'tues_aft') {
    	tuesAft = isChecked ? tuesAft + 1 : tuesAft - 1;
     	calculateTotal(activityClass);
    	console.log(total);
    	if (tuesAft > 1) {
      	alert("You Signed Up For Too Many Afternoon Classe");
  } else {
  		calculateTotal(activityClass);
  }
}
});