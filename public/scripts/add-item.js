"use strict";

function addItem(itemData) {

  const name = itemData.item.name;
  const id = itemData.item.id;
  const category = itemData.item.category;
  const uId = itemData.item.userId;
  const itemId = itemData.item.id;

  const newItem = `<tr>
                  <td>${name}</td>
                  <td>${category}</td>
                  <td><input type="checkbox" class="checkthis" /></td>
                  <td><a href="/user/${uId}/list/items/${itemId}/edit">Edit</a></td>
                  <td><form method="DELETE" action="/user/${uId}/list/items/${itemId}/delete">
                    <button>Delete</button>
                    </form>
                  </td>
                </tr>
        </article>`;

return $(newItem);
}
