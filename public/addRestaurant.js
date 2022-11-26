//Name: Omar Bafagih
//Student ID: 101209028



//initializing submit button listener
const submit = document.getElementById('submit');
submit.onclick = addRestaurant;

function addRestaurant(){
    
    //get values from input fields

    let name = document.getElementById('name').value;
    let delivery_fee  = document.getElementById('delivery_fee').value;
    let minimum_order = document.getElementById('minimum_order').value;

    //checking if we have valid inputs (if the deliver fee or the min order is a non number input)
    if((isNaN(delivery_fee))|| isNaN(minimum_order)){
        //creating elements that will visually warn the user 
        let warning = document.createElement("p");
        warning.innerHTML = "INVALID INPUT: Make sure you enter valid numbers for the min order and delivery fee";
        document.body.appendChild(warning);
        console.log("INVALID INPUT FOR EITHER DELIVERY FEE OR MIN ORDER");
        return;
    }

    else{
        //creating new restaurant object with user inputted values
        let restaurant = {'name': name, 'min_order': parseFloat(minimum_order),'delivery_fee': parseFloat(delivery_fee), 'menu': {}};

        //making AJAX request
        let xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/restaurants', true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let response = JSON.parse(xhttp.responseText);
                location.href = `/restaurants/${response.id}`;
               
            }
        };
       
        xhttp.send(JSON.stringify(restaurant));

    }



}