//Name: Omar Bafagih
//Student ID: 101209028



const express = require('express');
const fs = require('fs');
let app = express();
const path = require('path');
//const { render } = require('pug');
const PORT = process.env.PORT || 3000;

//router
const restaurantsRouter = require('./routers/restaurants-router');


//setting globals
app.locals.restaurants = {};
app.locals.restID = 0;

//reading initial JSON data located in restaurants directory
fs.readdir("./restaurants", (err, files) =>{
    if(err) {
        
        return console.log(err);
    }
  
    for (let i = 0; i < files.length; i++){
      
        let data = fs.readFileSync("./restaurants/" + files[i]);
        let restaurant = JSON.parse(data);
        app.locals.restaurants[restaurant.id] = restaurant;
        app.locals.restID++;
        
    }
   
});





// setting up middleware 
//app.set(path.join(__dirname, 'views'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next)=>{
    console.log(`${req.method}: ${req.url}`);
    if(Object.keys(req.body).length > 0){
        console.log('Body:');
        console.log(req.body);
    }
    next();
});




//server routes (handling get, post and put requests)
app.use('/restaurants', restaurantsRouter);

app.get(['/'], (req, res) => res.render('home'));
app.get('/addrestaurant', (req, res) => res.render('addRestaurant'));

//request to get the restaurant in restaurant.js for object manipulation/display
app.get('/give/:restID', (req, res)=>{
    res.status(200).send(JSON.stringify(app.locals.restaurants[req.params['restID']]));
});



app.listen(PORT);
console.log("Server listening at http://localhost:3000");