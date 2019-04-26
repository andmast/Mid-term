"use strict";

/// ----------Andrea


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

/// ------- andrea


});

