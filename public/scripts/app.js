"use strict";

//////////////////////////FUNCTIONS//////////////////////////

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function renderItems(items) {
  console.log('items', items);
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
  let itemDone = itemData.completed;
  console.log('itemDone',itemDone);

  if (itemDone === 'false') {
    itemDone = "";
  } else {
    itemDone = "checked";
  }


  console.log('itemDone',itemDone);

  const newItem = `<tr class="${category} panel">
                  <td><input type="checkbox" class="checkthis" id="${itemId}" ${itemDone}/></td>
                  <td>${itemName}</td>
                  <td>${category}</td>
                  <td>
                  <div class="btn-group center-block">
                  <form method="GET" action="/api/users/list/items/${itemId}/edit"><button class="btn btn-primary center-block btn-xs center-block" data-title="Edit">Edit</button>
                  </form>
                  </td>
                  <td>
                  <form method="DELETE" >
                    <button class="btn btn-danger center-block btn-xs delete center-block" data-id="${itemId}">Delete</button>
                    </form>
                  </div>
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
    return $(".error").slideDown().text("Nothing in your to-do").css("background", "pink")
  } else {
    $(".error").slideUp()
    $(".loader").slideDown()
    $.ajax({
      type: 'POST',
      url: '/api/users/list/items', //posting info (new item) to the items page
      data : $('#form').serialize(),
      complete: function() {
        console.log('request complete');
        $(".loader").slideUp()

      }
    }).then(loadItems);
  }

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
  const itemId = this.getAttribute( "data-id" );
  // alert(itemId)
  $.ajax({
     url: '/api/users',
     type: 'DELETE',
     data: {itemId: itemId},
     success: function(response) {
      // alert("success");
     }
    }).then(loadItems());

};



//////////////////////////MAIN//////////////////////////


$(document).ready(function() {

  loadItems();

  $('#addNewItemButton').on('click', handleSubmit);


  $( "body" ).on( "click", ".delete", handleDelete);

////////////////////////////SAHANAH/////////////////////////////////


  $('#edit-item').on('submit', function(event) {

    event.preventDefault();

    let nameChange = $('#name').val();
    console.log("nameChange", nameChange);

    if (nameChange.length === 0 || !nameChange.trim()) {
      return alert('Enter a new item name or return to your list');
    }

    if ($('#drop-down').val() == "0") {
      return alert('Select new category or return to your list');
    }

    this.submit();

  });


  $('#update-pass').on('submit', function(event) {

    event.preventDefault();

    let passChange = $('#userPass').val();
    console.log("passChange", passChange);

    if (passChange.length === 0 || !passChange.trim()) {
      return alert('Enter a new password or go to your list');
    }

    this.submit();

  });

  //work in progress --> done button
  $("body").on("click", ".checkthis", function(event) {
      event.preventDefault();
      alert("here");
      const itemId = this.getAttribute("id");
      console.log('this.getAttribute("id"): ',this.getAttribute("id"));
      console.log('itemId: ',itemId);
      console.log('document.getElementById(itemId): ',document.getElementById(itemId));
      console.log('document.getElementById(itemId).checked: ',document.getElementById(itemId).checked);

      if (document.getElementById(itemId).checked = true) {
        document.getElementById(itemId).checked = false;
        console.log('posting...');
        $.ajax({
          url: '/api/users/list/items/check',
          type: 'POST',
          data: {'itemId': itemId, 'completed': false},
          success: function(response) {
          console.log('response: ',response);
          console.log("success at posting");
          }
        }).then(loadItems()).catch(() => console.log('err'));
      } else {
        document.getElementById(itemId).checked = true;
        console.log('posting...');
        $.ajax({
          url: '/api/users/list/items/check',
          type: 'POST',
          data: {'itemId': itemId, 'completed': true},
          success: function(response) {
          console.log('response: ',response);
          console.log("success at posting");
          }
        }).then(loadItems()).catch(() => console.log('err'));
      }

  });

  // function to toggle
  $(function(){

    $('.tab-panels .tabs li').on('click', function() {
      let $panel = $(this).closest('.tab-panels');

      $panel.find('.tabs li.active').removeClass('active');
      $(this).addClass('active');

      // figure out wich panel to show
      let panelToShow = $(this).attr('rel');

      // alert(panelToShow);
      $panel.find('.panel.active').hide(300,showNextPanel);

        // show next panel
        function showNextPanel() {
          $(this).removeClass('active');
          $('.'+panelToShow).show(300, function() {
            $(this).addClass('active');
          });
        }
    });

  });

});


