// In this module, we are creating a Store Model
// A Store model is a model about the Store. In other
// words it describes the data that will live inside
// the store field in our Mongoose Database. 


// // Because our Store Model will interface with MongoDB
// We need to go ahead and interface it with MongoDB
// Which is why we first import the mongoose package from our
// node_modules folder. 


const mongoose = require("mongoose"); //importing the mongoose package
//mongoose package helps us interface with the MongoDB database
mongoose.Promise = global.Promise; //setting mongoose promise to Native promise 
const slug = require("slugs"); //importing the slug package


// defining store schema by invoking the 
// mongoose.Schema constructor that is available 
// in the mongoose package.

const storeSchema = new mongoose.Schema({
	//name, slug description, tags are all like
	//column headers in your excel sheet. 

	name: { //configure name props(allowed on Schema)
		type: String, //data type is string
		trim: true, //remove the white space
		required: "Please enter a store name!"
	}, 

	slug: String,  //what is slug?

	description: { //what is description for?
		type: String, 
		trim: true
	}, 

	tags: [String], 

	created:{
		type: Date, 
		default: Date.now
	}, 

	location:{
		type: String, 
		default: "Point"
	}, 

	coordinates: [{
		type: Number,
		required: "You must supply coordinates" 
	}], 

	address: {
		type: String, 
		required: "You must supply an address!"
	}

})


// before the data is stored on the DB please 
// do this
storeSchema.pre("save", function(next){
	console.log(this); 
	if(!this.isModified("name")){
		next(); ``
		return; 
	}
	this.slug = slug(this.name); 
	console.log(this); 
	next(); 
}); 


// export this model for me please 
// the right side of the = operatore actually 
// creates the Store model with storeSchema as its 
// schema and then this is exported from this module
module.exports = mongoose.model("Store", storeSchema); 



