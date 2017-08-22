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

		type:{
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
	}, 

	photo: String, 

	author: {
		type: mongoose.Schema.ObjectId, 
		ref: "User", 
		required: "You must supply an author"
	}

}, {	
	toJSON: {virtuals: true}, 
	toObject: {virtuals: true}
}); 

// store schema definition ends here


// Define our store collection index. 
storeSchema.index({
	name: "text", 
	description: "text", 
}); 

storeSchema.index({
	location: "2dsphere", 
	"background": false
}); 


// storeSchema.index({
// 	location: "2dsphere"
// }); 


// before the data is stored on the DB please 
// do this
storeSchema.pre("save", async function(next){
	if(!this.isModified("name")){
		next(); 
		return; 
	}
	this.slug = slug(this.name); 
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i"); 
	// console.log(this.constructor); 
	const storesWithSlug = await this.constructor.find({slug: slugRegEx }); 
	if(storesWithSlug.length){
		this.slug = `${this.slug} - ${storesWithSlug.length + 1}`; 
	}
	next(); 
}); 


storeSchema.statics.getTagsList = function(){
	// all the static methods use this keyword 
	// so we must use proper functions and not 
	// arrow functions. 


	// custom Aggregations in mongoDB is the most
	//sensational feature I have seen so far
	// Aggregation pipeline is an array of operators
	//see below
	return this.aggregate([
		{$unwind: "$tags"}, 
		{$group: {_id: "$tags", count: {$sum: 1}}}, 
		{$sort: { count: -1}}
	]); 
}; 




storeSchema.statics.getTopStores = function(){
	return this.aggregate([
		{$lookup: 
			{ from: "reviews", localField: "_id", foreignField: "store", 
		as: "reviews"
	        }
	    }, 

	    {$match: { "reviews.1": {$exists: true}}}, 

	    {$project: {
	    	photo: "$$ROOT.photo", 
	    	name: "$$ROOT.name", 
	    	reviews: "$$ROOT.reviews", 
	    	slug: "$$ROOT.slug", 
	    	averageRating: {$sum: "$reviews.rating"}
	    }}, 

	    {$sort: {averageRating: -1}}, 

	    {$limit: 10}

	]); 
}; 


//find reviews where the store's id property === Review's store property
storeSchema.virtual("reviews",{
	ref: "Review", //what model to link
	localField: "_id", //which field on the store
	foreignField: "store" //which on the review
}); 



// next means it is some sort of middleware
// this autopopulate function is going to be 
// called from the storeSchema.pre call just below it. 

// this is going to autopopulate 
// the store reviews every time the store 
// is queried
function autopopulate(next){
	this.populate("reviews"); 
	next(); 
}


// call the autopopulate function just above this
// everytime the Store collection is queried. 
storeSchema.pre("find", autopopulate); 
storeSchema.pre("findOne", autopopulate); 

// export this model for me please 
// the right side of the = operatore actually 
// creates the Store model with storeSchema as its 
// schema and then this is exported from this module
module.exports = mongoose.model("Store", storeSchema); 



