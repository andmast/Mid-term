"use strict";

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });


//////////////////////////FUNCTIONS//////////////////////////

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function renderItems(items) {
  $('#tableBody').empty();
  items.forEach(function(item) {
    console.log('item: ',item);
    var $item = createItem(item);
    console.log('$item: ',$item);
    $('#tableBody').append($item);
    console.log('Appended to the body!');
  });
}


function createItem(itemData) {

  // need to change that to match the data base
  console.log('itemData: ',itemData);
  const itemName = itemData.what;
  console.log('name',itemName);
  const category = itemData.name;
  console.log('category',category);
  const itemId = itemData.id;
  console.log('itemId',itemId);

  const newItem = `<tr>
                  <td>${itemName}</td>
                  <td>${category}</td>
                  <td><input type="checkbox" class="checkthis" /></td>
                  <td><a href="/api/users/list/items/${itemId}/edit">Edit</a></td>
                  <td><form method="DELETE">
                    <button id="TEST" data-name="${itemName}">Delete</button>
                    </form>
                  </td>
                </tr>
        </article>`;
  console.log('newItem created: ',newItem);

return $(newItem);
}


const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Button clicked!');

  // if ($('section.new-tweet form p.error')) {
  //   $('p.error').empty().toggleClass('error right');
  // }

  if ($('#newItem').val() === "") {
    // $('p.right').append('No tweet!').toggleClass('right error');
    return;
  }

  // if ($('section.new-tweet form textarea').val().length > 140) {
  //   $('p.right').append('Tweet too long!').toggleClass('right error');
  //   return;
  // }

  $.ajax({
    type: 'POST',
    url: '/api/users/list/items', //posting info (new item) to the items page
    data : $('#form').serialize(),
    complete: function() {
      console.log('request complete');
      // loadItems();
    }
  }).then(loadItems());
  console.log('ended handle submit!');
};


const loadItems = function() {
  console.log('loading items');
  $.get('/api/users/list/items', function(data) {

    console.log('data from loadItems: ', data);
    console.log('data from textarea: ',$('textarea#newItem').val(''));
    $('#newItem').val('');

    renderItems(data);
  });
};

const handleDelete = function() {
  event.preventDefault();
  const itemName = this.getAttribute( "data-name" );
  alert(itemName)
  $.ajax({
     url: '/api/users',
     type: 'DELETE',
     data: {name: itemName},
     success: function(response) {
      alert("success");
     }
    }).then(loadItems());

};

//////////////////////////MAIN//////////////////////////


$(document).ready(function() {

  $( "body" ).on( "click", "#TEST", handleDelete);








  // createItem(data);
  loadItems();


  $('#addNewItemButton').on('click', handleSubmit);

});

