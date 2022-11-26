//Name: Omar Bafagih
//Student ID: 101209028

Main design decision:
    - pug is used as the template engine, all pages are pug rendered files
    - I used a router which handles all requests starting with /restarants, which is located in the restaurants-router.js file.
    - express global (local) variables are used to access server data in the restaurants router
    - addRestaurant.js is used to handle the client side functionality for adding a restaurant
    - restaurant.js is used for client side functionality for manipulating a given restaurant


HOW TO RUN SERVER:
    1. in the assignment3 directory, run npm init 
    2. then run the following commands [npm install pug, mpn install express]
    3. in the assignment2 directory, run node server.js OR nodemon server.js (if nodemon is installed)
    4. on your browser navigate to localhost:3000 to get on the home page


-enjoy