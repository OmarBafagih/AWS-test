//Name: Omar Bafagih
//Student ID: 101209028



//constants
const express = require('express');
const router = express.Router();

//routing
router.get('/', sendRestaurants);
router.post('/', createRestaurant);
router.param('restID', findRestaurant);
router.get('/:restID', sendRestaurant);
router.put('/:restID', updateRestaurant);

//setting up functions for routing

//send all restaurants
function sendRestaurants(req, res){
    res.format({
        'text/html': ()=>{
            res.set('Content-Type', 'text/html');
            res.render('restaurants', {restaurants: req.app.locals.restaurants});

        },
        'application/json': ()=>{
            res.set('Content-Type', 'application/json');
            console.log("POGEERS111");
            res.json({"restaurants": Object.keys(req.app.locals.restaurants)});
        },
        'default': ()=> {
            res.status(406).send('ERROR');
        }
    });


   
}

//find the restaurant with thegiven ID from 'database'
function findRestaurant(req, res, next, value){
    req.restaurant = req.app.locals.restaurants[value];
    console.log(req.restaurant);
    if(!req.restaurant){
        return res.status(404).send('NO RESTAURANT WITH THIS ID');
    }

    next();
}

//send restaurant 
function sendRestaurant(req, res){
    res.format({
        'text/html': ()=>{
            res.set('Content-Type', 'text/html');
            res.render('restaurant', {restaurant:req.restaurant});
        },
        'application/json': ()=>{
            res.set('Content-Type', 'application/json');
            res.json(req.restaurant);
        },
        'default': ()=> {
            res.status(406).send('ERROR');
        }

    });


}

function createRestaurant(req, res){
    
    

    //creating newrestaurant as requested
    let newRestaurant = {};
    newRestaurant.id = req.app.locals.restID++;
    newRestaurant.name = req.body.name;
    newRestaurant.min_order = req.body.min_order;
    newRestaurant.delivery_fee = req.body.delivery_fee;
    newRestaurant.menu = {};

    //pushing to global app variable
    req.app.locals.restaurants[newRestaurant.id] = newRestaurant;
    //sending response json object
    //sendRestaurant;
    res.status(200).json(newRestaurant);
    //NEXT STEP: RENDER NEWLY ADDED RESTAURANT PAGE HERE
   
}

//update a restaurant
function updateRestaurant(req, res){
    let updatedRestaurant = req.body;
    
    let keys = Object.keys(req.app.locals.restaurants);
    console.log(keys);
    //if the restaurant that is requested to update is within our 'known' restaurants, then we can update it
    if(keys.includes(updatedRestaurant.id.toString())){
        req.app.locals.restaurants[updatedRestaurant.id] = updatedRestaurant;
        res.status(200).json({confirmation: "confirmed"});
    }
    //otherwise send a 404 status
    else{
        res.status(404);
    }

}


//exporting the router
module.exports = router;