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

