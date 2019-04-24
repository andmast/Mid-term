User Stories

USER RELATED

As a user I should be able to register/login with an email and password because I want to see MY list only (not everyone else's)

GIVEN THAT I LOGIN/REGISTER, EACH USER HAS UNIQUE ID (serial), UNIQUE EMAIL, PASSWORD, USERNAME
GIVEN THAT I LOGIN/REGISTER, I SHOULD SEE MY PROFILE
-get- /register     if not existing user and afterwards redirect to get/users/:uId 
-get- /login        goes to separate login page (exactly like TinyApp)
-get- /users/:uId   if already logged in to go directly to profile page

As a user I should be able to logout because I want to leave the site

GIVEN THAT I LOGOUT, I REDIRECT TO MAIN PAGE
-post/logout            to logout redirect to login/register page

GIVEN THAT I AM ON MY PROFILE, I SEE MY PERSONAL INFO AND LIST
-get- /users/:uId       to go to profile page
-get- /users/:uId/list  to see their own list

As a user I should be able to see my profile page 
When I am on my profile page, I should be able to type and click a button to edit my password
GIVEN THAT I UPDATED MY PROFILE, IT SHOULD SHOW MY UPDATED MY MAIN PAGE
-put- /users/:uId/edit to update profile

As a user I should be able to save an item on my list and go back and look at it because I want to track it
GIVEN THAT I ADD AN ITEM ON MY LIST, IT IS CATEGORIZED AND IT SHOULD SHOW UP ON MY TO DO LIST
-post- /users/:uId/list/items                   to add item on my to do list (NOT separate html page)
-put- /users/:uId/list/items/:itemID/edit       to edit item on my to do list (separate html page)
-delete- /users/:uId/list/items/:itemID/delete  to delete item on my to do list (not separate html page)


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

-   get-       /                                       main page shows login/register buttons or redirect if already logged into to profile page
-   get-      /register                                if not existing user and afterwards redirect to get/users/:uId 
-   get-      /login                                   goes to separate login page (exactly like TinyApp)
-   post-     /logout                                  to logout redirect to login/register page
-   get-      /users/:uId                              if already logged in to go directly to profile page



-   get-      /users/:uId                              to go to profile page
-   put-      /users/:uId/edit                         to update profile
-   get-      /users/:uId/list                         to see their own list

-   post-     /users/:uId/list/items                   to add item on my to do list (NOT separate html page)
-   put-      /users/:uId/list/items/:itemID/edit      to edit item on my to do list (separate html page)
-   delete-   /users/:uId/list/items/:itemID/delete    to delete item on my to do list (not separate html page)


BRANCHES

feature/categorizerAPI      ANDREA 6:00PM
feature/listPage            LETICIA 6:00PM HTML, JS, SASS (HEADER to come)
feature/itemEdit            SAHANAH 6:00PM HTML, JS, SASS (HEADER to come)

                        








