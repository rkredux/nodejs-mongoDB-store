import axios from "axios"; 
import {$} from "./bling"; 

function ajaxHeart(e){
	// console.log("Heart pressed"); 
	e.preventDefault(); //this prevent default does not
	//let the browser post the form data to the server 
	//instead we use the axios lib to connect to our
	//server and send over our data. 



	// this is the first time we are using the post 
	//method of the axios library.  Note this very 
	//very carefully. 
	
	axios
	    .post(this.action)
	    .then(res => {
	    	const isHearted = this.heart.classList.toggle("heart__button--hearted");
	    	$(".heart-count").textContent = res.data.hearts.length; 
	    	if (isHearted){
	    		this.heart.classList.add("heart__button--float"); 
	    		setTimeout(() => this.heart.classList.remove("heart__button--float"), 2500); 
	    	}

	    })
	    .catch(console.error); 

}

export default ajaxHeart; 