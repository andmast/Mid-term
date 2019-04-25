User Stories

USER RELATED

As a user I should be able to register/login with an email and password because I want to see MY list only (not everyone else's)

GIVEN THAT I LOGIN/REGISTER, EACH USER HAS UNIQUE ID (serial), UNIQUE EMAIL, PASSWORD, USERNAME
GIVEN THAT I LOGIN/REGISTER, I SHOULD SEE MY PROFILE
-get- /register     if not existing user and afterwards redirect to get/users/:userId 
-get- /login        goes to separate login page (exactly like TinyApp)
-get- /users/:userId   if already logged in to go directly to profile page

As a user I should be able to logout because I want to leave the site

GIVEN THAT I LOGOUT, I REDIRECT TO MAIN PAGE
-post/logout            to logout redirect to login/register page

GIVEN THAT I AM ON MY PROFILE, I SEE MY PERSONAL INFO AND LIST
-get- /users/:userId       to go to profile page
-get- /users/:userId/list  to see their own list

As a user I should be able to see my profile page 
When I am on my profile page, I should be able to type and click a button to edit my password
GIVEN THAT I UPDATED MY PROFILE, IT SHOULD SHOW MY UPDATED MY MAIN PAGE
-put- /users/:userId/edit to update profile

As a user I should be able to save an item on my list and go back and look at it because I want to track it
GIVEN THAT I ADD AN ITEM ON MY LIST, IT IS CATEGORIZED AND IT SHOULD SHOW UP ON MY TO DO LIST
-post- /users/:userId/list/items                   to add item on my to do list (NOT separate html page)
-put- /users/:userId/list/items/:itemID/edit       to edit item on my to do list (separate html page)
-delete- /users/:userId/list/items/:itemID/delete  to delete item on my to do list (not separate html page)


LIST RELATED

As a user I should be able to add things to my to do list because I want to record what I need to do

As a user I should be able to check my todo as done because I need to keep track of what I still need to do (otherwise it's confusing)

As a user I should be able to see a full list of my to dos and their categories because I want to remember what I need to do

As a user I should be able to change categories if it was miscategorized because I want it in the correct category

As a user I should be able to add or remove or update to do items from the list because my needs may change

* Film / Series (To watch)
* Restaurants, cafes, etc. (To eat)
* Books (To read)
* Products (To buy)
* UNCATEGORIZED

INPUT RELATED

As a user I should be able to type anything and have it categorized automatically because I want to save time (don't want to categorize manually)


MVP: A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.


ROUTES

-   get-      /                            main page shows login/register buttons or redirect if already logged into to profile page
-   get-      /register                    if not existing user and afterwards redirect to get/users/:userId 
-   get-      /login                       goes to separate login page (exactly like TinyApp)
-   post-     /logout                      to logout redirect to login/register page
-   get-      /users/                      if already logged in to go directly to profile page
-   put-      /users/edit                  to update profile
-   get-      /list                        to see their own list
-   get-      /api/users/list/items                   get all the items in the list (NOT separate html page)
-   post-     /api/users/list/items                   to add item on my to do list (NOT separate html page)
-   get-      /api/users/list/items/:itemID          to edit item on my to do list (separate html page)
-   put-      /api/users/list/items/:itemID/edit          to edit item on my to do list (separate html page)
-   delete-   /api/users/list/items/:itemID/delete        to delete item on my to do list (not separate html page)


BRANCHES

feature/categorizerAPI      ANDREA 6:00PM
feature/listPage            LETICIA 6:00PM HTML, JS, SASS (HEADER to come)
feature/itemEdit            SAHANAH 6:00PM HTML, JS, SASS (HEADER to come)

DATABASE: 

midterm

TABLE: 

users
-----------------------------------       
id         | email       | password
-----------|-------------|---------
primary    |             | 
key(serial)|             |
-----------|-------------|---------

items
-------------------------------------------------------------
id         | what        | completed | userID    | categoryID
-----------|-------------|-----------|-----------|-----------
primary    |             |           | foreign   | foreign
key(serial)|             |           | key       | key
-----------|-------------|-----------|-----------|-----------

categories
--------------------------
id         | name        | 
-----------|-------------|
primary    |             | 
key(serial)|             | 
-----------|-------------|

USERS 
-table populated upon registration (POST /register)
-userID created upon register (unique random string?)
-email checked in database and unique
-password encrypted with bcrypt
-password can be updated in profile page (PUT /users/:uID/edit)

ITEMS
-table populated when user creates item (POST /users/:uID/list/items)
-itemID sequential (?)
-what (user input in html)
-completed (user checkbox in html)
-userID (same as users table)
-categoryID (use Wolfram API to match category type and we assign ID)

CATEGORIES
-table populated when user creates or edits item (POST /users/:uID/list/items & PUT /users/:uID/list/items/:itemID/edit)
-categoryID (use Wolfram API to match category type and we assign ID)




