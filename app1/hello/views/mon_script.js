
$(document).ready(function() {

    
    $("#myButtonId").on('click', function() {
 
        jQuery.ajax({
            url: "/test"
        }).then(function(data) {
           jQuery('#textareaId').val(JSON.stringify(data));
           
        });
      
    });
 
  
 
 });