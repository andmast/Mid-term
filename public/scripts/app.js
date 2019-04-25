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

const data = { users: {
                 '1': {id: 1,
                     name: 'Leticia',
                     email: 'lzduque@hotmail.com',
                     pasword: 1234                     }
                 },
               items: {
                 1: {id: 1,
                     name: 'Supernatural',
                     done: false,
                     category: "toWatch",
                     userId: 1
                     },
                 2: {id: 2,
                     name: 'Captain Marvel',
                     done: true,
                     category: 1,
                     userId: 1
                     },
                 3: {id: 3,
                     name: 'Avengers Endgame',
                     done: false,
                     category: 1,
                     userId: 1
                     }
                 }
              };

//////////////////////////FUNCTIONS//////////////////////////

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function renderItems(items) {
  // $('#tableBody').empty();
  // items.forEach(function(item) {
    var $item = createItem(items);
    $('#tableBody').append($item);
    console.log('Appended to the body!');
  // });
}


function createItem(itemData) {

  // need to change that to match the data base
  const itemName = itemData.items["1"].name;
  console.log('name',name);
  const category = itemData.items["1"].category;
  console.log('category',category);
  const userId = itemData.items["1"].id;
  console.log('userId',userId);
  const itemId = itemData.items["1"].id;
  console.log('itemId',itemId);

  const newItem = `<tr>
                  <td>${itemName}</td>
                  <td>${category}</td>
                  <td><input type="checkbox" class="checkthis" /></td>
                  <td><a href="/items/${itemId}/edit">Edit</a></td>
                  <td><form method="DELETE" action="/items/${itemId}/delete">
                    <button>Delete</button>
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
    url: '/api/items', //posting info (new item) to the items page
    data : $('#form').serialize(),
    complete: function() {
      console.log('request complete');
      loadItems();
    }
  });
  console.log('ended handle submit!');
};


const loadItems = function() {
  console.log('loading items');
  $.get('/api/items', function(data) {

    console.log('data from loadItems: ', data);
    console.log('data from textarea: ',$('textarea#newItem').val(''));
    $('#newItem').val('');

    renderItems(data);
  });
};


//////////////////////////MAIN//////////////////////////


$(document).ready(function() {

  // createItem(data);
  loadItems();


  $('#addNewItemButton').on('click', handleSubmit);

});

