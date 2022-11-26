//Name: Omar Bafagih
//Student ID: 101209028


    let restaurant = {};


    function init(){

        //initializing button listeners
        document.getElementById("addCategory").addEventListener("click", addCategory);
        document.getElementById("addItem").addEventListener("click", addItem);
        document.getElementById("save").addEventListener("click", saveChanges);
        //making an initial get request to get the selcted restaurant info
        getRestaurant();

    }

    //function to get the requested restaurant from the server
    function getRestaurant(obj){
        
        //get the value of the id element
        let idEle = document.getElementById("id").innerHTML;
        let id = idEle.charAt(idEle.length-1)
        //creating request to get the currently selected restaurant
        let xhttp = new XMLHttpRequest();
        console.log(typeof(parseInt(id)));
        xhttp.open('GET', `/give/${parseInt(id)}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let response = JSON.parse(xhttp.responseText);  
                restaurant = response;
                updateRestaurant(restaurant.menu);
            
            
            }
        };
       
        xhttp.send();
        
        

    }
    
    //updates the restaurant info on the page with the new restaurant object
    function updateRestaurant(menu) {
        

        //getting an emptying the menu div and selection dropdown before population
        let menuDiv = document.getElementById("menu");
        menuDiv.innerHTML = '';

        let select = document.getElementById("categories");
        select.innerHTML = '';
        //populating menu div and select dropdown with categories
        for(let category in menu){

            //creating unordered list for each category for clear visual category seperation
            let catList = document.createElement('ul');
            catList.id = category;
            menuDiv.appendChild(catList);

            //creating clear title for each category
            let catTitle = document.createElement('h4');
            catTitle.textContent = category;
            document.getElementById(category).appendChild(catTitle);

            //adding options for select element
           
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            select.appendChild(option);

            for(let item in menu[category]){
                //adding the item info into the document
                //item ul
                let itemLi = document.createElement('li');
                itemLi.style.cssText = 'padding-left: 40px';
                catList.appendChild(itemLi);

                //itemname 
                let itemName = document.createElement('p');
                itemName.textContent = menu[category][item].name;
                itemName.style.cssText = 'padding-left: 10px; font-weight: bold';
                itemLi.appendChild(itemName);

                //item description
                let itemDescription = document.createElement('p');
                itemDescription.textContent = `Description: ${menu[category][item].description}`;
                itemDescription.style.cssText = 'padding-left: 10px';
                itemLi.appendChild(itemDescription);

                //item price
                let itemPrice = document.createElement('p');
                itemPrice.textContent = `Price: $${menu[category][item].price}`;
                itemPrice.style.cssText = 'padding-left: 10px';
                itemLi.appendChild(itemPrice);
            }
        }

    }
    
    //function to add a given category to the menu
    function addCategory(){
        //get the value of the text field
        let newCategory = document.getElementById("newCategory").value;
        //add the category to the restaurant menu
        let found = false;
        for(let category in restaurant.menu){
            if(newCategory === category){
                found = true;
            }
        }

        if(found){
            window.alert("You cannot add a category that already exists");
            return;
        }

        else{
            restaurant.menu[newCategory] = {};
            //update the restaurant
            updateRestaurant(restaurant.menu);
        }
      
    }

    //function to add an item to the menu within a specified category
    function addItem(){
        //get selected category
        let selectedCategory = document.getElementById("categories").value;
        
        //get the new item info
        let itemName = document.getElementById("itemName").value;
        let itemDescription = document.getElementById("itemDescription").value;
        let itemPrice = document.getElementById("itemPrice").value;

        //check if the inputed values are valid
        if(isNaN(itemPrice)){
            window.alert("The price must be a valid number");
            return;
        }

        else{
            //item object
            let item = {name: itemName, description: itemDescription, price: itemPrice};

            //get last key in category and make the new item's key that val+1
            let keys =  Object.keys(restaurant.menu[selectedCategory]);
            let newKey = 0;
            if(keys.length > 0){
                newKey = parseInt((keys[keys.length-1])) + 1;
            }
        
            //checking throughout the object for ay item with the same name that was requested to add
            let found = false;
            for(let category in restaurant.menu){
                for(let item in restaurant.menu[category]){
                    if(restaurant.menu[category][item].name === itemName){
                        found = true;
                    }
                }
            }
        
            //if there is a duplicate item found
            if(found == true){
                window.alert("You cannot add an Item that already exists");
            }

            else{
                //now we can add the new item to the specific category with its new unique key
                restaurant.menu[selectedCategory][newKey] = item;
       
                //update the restaurant
                updateRestaurant(restaurant.menu);
            }


        }
        
        
    }


    //function to save the changes made to the restaurant tus far, puts updated restaurant in server
    function saveChanges(){

        //get all new restaurant info
        let restaurantName = document.getElementById("name").value;
        let restaurantDeliveryfee = document.getElementById("delivery_fee").value;
        let restaurantMinOrder = document.getElementById("min_order").value;

        //set object attributes to new values in 
        restaurant.name = restaurantName;
        restaurant.min_order = restaurantMinOrder;
        restaurant.delivery_fee = restaurantDeliveryfee; 
        console.log(restaurant);
        //create ajax request to put the updated restaurant to the server
         //get the value of the id element
         let idEle = document.getElementById("id").innerHTML;
         let id = idEle.charAt(idEle.length-1);
         
         let xhttp = new XMLHttpRequest();
         xhttp.open('PUT', `/restaurants/${parseInt(id)}`, true);
         xhttp.setRequestHeader("Content-Type", "application/json");
         xhttp.onreadystatechange = function(){
             if(this.readyState == 4 && this.status == 200){
                console.log(xhttp.responseText);
                //alert the user that their changes to the restaurant have been made successfuly
                window.alert("Your changes have been saved");
             }
         };
        
        
        xhttp.send(JSON.stringify(restaurant));
    }



