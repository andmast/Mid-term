User Stories

USER RELATED

As a user I should be able to logout because I want to leave the site

GIVEN THAT I LOGIN/LOGOUT, EACH USER HAS UNIQUE ID (serial), UNIQUE EMAIL, PASSWORD, USERNAME


As a user I should be able to register/login with an email and password because I want to see MY lists only (not everyone else's)

GIVEN THAT I LOGIN/REGISTER, I SHOULD SEE MY PROFILE
-get- /register if not existing user and afterwards redirect to get/users/:uID 
-get- /login goes to separate login page (exactly like TinyApp)
-get- /users/:uID if already logged in to go directly to profile page

GIVEN THAT I LOGOUT, I REDIRECT TO MAIN PAGE
-post/logout to logout redirect to login/register page

GIVEN THAT I AM ON MY PROFILE, I SEE MY PERSONAL INFO AND LISTS
-get- /users/:uID to go to profile page
-get- /users/:uID/lists to see their lists
-post- /users/:uID/lists/add to add to do to list (NOT separate html page)
-put- /users/:uID/lists/:listID/edit to add to do list (separate html page)
-delete- /users/:uID/lists/:listID/delete to delete to do list (not separate html page)

As a user I should be able to save a list and go back and look at it because I want to track it

GIVEN THAT I SAVE A LIST, IT SHOULD SHOW UP ON MY PROFILE UPON LOGIN
-post- /users/:uID/lists/add to add to do to list

As a user I should be able to see my profile page and edit it because I want to have a personalized session

GIVEN THAT I UPDATE MY PROFILE, IT SHOULD UPDATE MY MAIN PAGE
-put- /users/:uID/edit to update profile

LIST RELATED

As a user I should be able to add things to my to do list because I want to record what I need to do

As a user I should be able to check my todo as done because I need to keep track of what I still need to do (otherwise it's confusing)

As a user I should be able to see a full list of my to dos and their categories because I want to remember what I need to do

As a user I should be able to change categories if it was miscategorized because I want it in the correct list

As a user I should be able to get more info about the items on my list because I want more info and it saves time (from having to search manually)

As a user I should be able to add or remove or update to do items from the list because my needs may change

* Film / Series (To watch)
* Restaurants, cafes, etc. (To eat)
* Books (To read)
* Products (To buy)
* UNCATEGORIZED

INPUT RELATED

As a user I should be able to type anything and have it categorized automatically because I want to save time (don't want to categorize manually)


MVP: A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.
























