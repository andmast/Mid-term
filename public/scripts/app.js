// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

"use strict";

const data = [];

//////////////////////////FUNCTIONS//////////////////////////

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function renderItems(items) {
  $('#tableBody').empty();
  items.forEach(function(item) {
    var $item = createTweetElement(item);
    $('#tableBody').append($item);
  });
};


function addItem(itemData) {

  const name = itemData.item.name;
  const id = itemData.item.id;
  const category = itemData.item.category;
  const userId = itemData.item.userId;
  const itemId = itemData.item.id;

  const newItem = `<tr>
                  <td>${name}</td>
                  <td>${category}</td>
                  <td><input type="checkbox" class="checkthis" /></td>
                  <td><a href="/user/${userId}/list/items/${itemId}/edit">Edit</a></td>
                  <td><form method="DELETE" action="/user/${userId}/list/items/${itemId}/delete">
                    <button>Delete</button>
                    </form>
                  </td>
                </tr>
        </article>`;

return $(newItem);


const handleSubmit = (event) => {
  event.preventDefault();

  // if ($('section.new-tweet form p.error')) {
  //   $('p.error').empty().toggleClass('error right');
  // }

  // if ($('section.new-tweet form textarea').val() === "") {
  //   $('p.right').append('No tweet!').toggleClass('right error');
  //   return;
  // }

  // if ($('section.new-tweet form textarea').val().length > 140) {
  //   $('p.right').append('Tweet too long!').toggleClass('right error');
  //   return;
  // }

  $.ajax({
    type: 'PUT',
    url: '/user/:userId/list/items',
    data : $('#newItem').text('#newItem').serialize(),
    complete: function() {
      console.log('request complete');
      loadItems();
    }
  });
};


const loadItems = function() {
  $.get('/user/:userId/list', function(data) {
    $('#newItem').text('#newItem').val('');
    renderItems(data);
    console.log('data', data);
  });
};


//////////////////////////FUNCTIONS//////////////////////////


$(document).ready(function() {

  loadItems();

  $('#addNewItemButton').on('click', handleSubmit);

});
