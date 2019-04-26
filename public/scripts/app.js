"use strict";

$(document).ready(function() {

  $("#delete").on("click", function( event ) {
  event.preventDefault();
  $.ajax({
     url: '/api/users',
     type: 'DELETE',
     success: function(response) {
      alert("success");
    }
  })
});


/// SET ID ON THE PARENT OF THE DELETE BUTTON NOT THE BUTTON ITSELF


});

