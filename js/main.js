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
var $activities = $(".activities >*");
var $checkedActivities = $activities.checked;

$.each($activities,function(index){
  //part where the magic happens
  if $(this).checked{}
  console.log(index+' checkbox has value' +$(this).val());
}
});