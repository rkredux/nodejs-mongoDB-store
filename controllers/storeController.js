// initialize an object 
// let storeController = {}; 

const mongoose = require("mongoose"); 

// Store is a new collection that is 
// being created in mongoDB 
const Store = mongoose.model("Store"); 
const User = mongoose.model("User"); 


//set up the multer
const multer = require("multer"); 
const multerOptions = {
	storage: multer.memoryStorage(), 
	fileFilter(req, file, next){
		const isPhoto = file.mimetype.startsWith("image/");
		if (isPhoto){
			next(null, true); 
		} else{
			next({message: "That filetype isn't allowed!"}, false); 
		}
	}
}


//set up the jimp for image re-sizing
 const jimp = require("jimp"); 


 // set up unique identifier to generate unique ids for photos
 const uuid = require("uuid"); 



// set functions as props in that object 
exports.homePage = (req, res) => {
	res.render("index"); 
}


exports.addStore = (req, res) =>{
	res.render("editStore", {title: "Add Store"}); 
}
// there can be as many as you want
// just use the keyword exports before 
// every function and you are good to go. 


//middleware for server side validation of photoupload
exports.upload = multer(multerOptions).single("photo");


//middleware for uploaded image-resizing 
exports.resize = async(req, res, next) => {
	if(!req.file){
		next(); 
		return; 
	}
	const extension = req.file.mimetype.split("/")[1]; 
	req.body.photo = `${uuid.v4()}.${extension}`; 
	//now we resize
	const photo = await jimp.read(req.file.buffer); 
	await photo.resize(800, jimp.AUTO); 
	await photo.write(`./public/uploads/${req.body.photo}`)
	next(); 
}; 




exports.createStore = async (req, res) => {

  req.body.author = req.user._id; 
  // insert the document in your mongoDB database
  const store = await (new Store(req.body)).save();
  // flash the success message after insertion is done
  req.flash("success", `Successfully Created ${store.name}. Care 
  	to leave a review?`); 
  // redirect to the store inserted
  res.redirect(`/store/${store.slug}`); 
}


exports.getStores = async(req, res) => {
	// query our database for a list of all the 
	// stores. 
	const stores = await Store.find(); 
	// console.log(stores); 
	res.render("stores", {title: "STORES", stores});  
	//stores.pug template now gets the locals obejct 
	//which has the title and stores keys with values
	//"STORES" AND Stores (const defined above)
}




exports.viewStore = async (req, res, next) => {
	const storeSlugName = req.params.match; 
	const store = await Store.findOne({slug: storeSlugName}); 
	if (!store){
		return next(); 
	}  
	res.render("displayStore", {title: `${store.name}`, store}); 
}


const confirmOwner = (store, user) =>{
	if(!store.author.equals(user._id)){
		throw Error("You must own a store in order to edit it");
	}
}


exports.editStore = async(req, res) =>{
	// res.json(req.params.id); 
	const store = await Store.findOne({_id: req.params.id});
	confirmOwner(store, req.user); 
	// res.json(store); 
	res.render("editStore", {title: `Edit ${store.name}`, store})
}



exports.updateStore = async (req, res) => {
	req.body.location.type = "Point"; 
	const store = await Store.findOneAndUpdate({_id: req.params.id},
		req.body, {
			new:true,
			runValidators:true//return the new store insead of the old one
		}).exec();
	req.flash("success", `Successfully updated <strong>${store.name}</strong><a href="/stores/${store.slug}"> View Store -> </a>`)
	res.redirect(`/stores/${store._id}/edit`); 
}



exports.getStoreBySlug = async (req, res, next) =>{
	const store = await Store.findOne({slug: req.params.slug}).populate("author"); 
	if(!store) return next(); 
	res.render("store", {store, title:store.name}); 
}

exports.searchStores = async(req, res) =>{
	// req.query.name
	const stores = await Store
	// find first
	.find({
		$text:{
			$search: req.query.q
		}
	}, {
		score: {$meta: "textScore"}
	})
	// sort them per their scores
	.sort({
		score: {$meta: "textScore"}
	})
	// limit the result to 5
	.limit(5); 

	res.json(stores); 
}


exports.mapStores = async(req, res) =>{
	const coordinates = [req.query.lng, req.query.lat].map(parseFloat); 
	// res.json({it: "worked"}); 
	const q = {
		location: {
			$near: {
				$geometry:{
					type: "Point",
					coordinates
				}, 
				$maxDistance: 10000
			}
		}
	}; 

	const stores = await Store.find(q).select("slug name description location photo").limit(10); 
	if(!stores){
		return res.send("No store found"); 
	}
	res.json(stores); 
}


exports.mapPage = (req, res) =>{
	res.render("map", {title: "MAP"}); 
}; 


exports.heartStore = async(req, res) =>{
	const hearts = req.user.hearts.map(obj => obj.toString()); 
	const operator = hearts.includes(req.param.id) ? "$pull" : "$addToSet"; 
	const user = await User.findByIdAndUpdate(req.user._id,
		{ [operator]: {hearts: req.params.id}}, 
		{ new: true}
	); 

	res.json(user); 
}; 


exports.getHearts = async(req, res) => {
	const stores = await Store.find({
		_id: {$in: req.user.hearts}
	}); 
	res.render("stores", {title: "Hearted Stores", stores }); 
}

// let me rephrase it this way. Exports is a 
// global variable that lives in every module.
// you can export any function off of a module
// by assigning iqt as a property of the global
// exports variable and then creating a import
// variable. The exported function will then be 
// available as a property on the object created
