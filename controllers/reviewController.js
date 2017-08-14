const mongoose = require("mongoose"); 
const Review = mongoose.model("Review");



exports.addReview = async (req, res) =>{
	req.body.author = req.user._id; 
	// res.json(req.body); 
	req.body.store = req.params.id; 
	const newReview = new Review(req.body); 
	await newReview.save(); 
	req.flash("success", "Review saved successfully"); 
	res.redirect("back"); 
}