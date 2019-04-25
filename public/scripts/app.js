// ajax get request from "/" when completed, look inside div element of html
// and include user.name as text appended to body element of html

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});



