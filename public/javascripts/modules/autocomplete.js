function autocomplete(input, latInput, lngInput){

	if (!input) return; 
	console.log(input, latInput, lngInput); 

	const dropdown = new goolge.maps.places.Autocomplete(input); 
	dropdown.addListener("place_changed", () =>{
		const place = dropdown.getPlace(); 
		console.log(place); 
		latInput.value = place.geometry.location.lat(); 
		lngInput.value = place.geometry.location.lng();
	}); 

	console.log("This is running"); 

	input.on("keydown", (e) =>{
		if(e.keyCode === 13) e.preventDefault(); 
	}); 

}

export default autocomplete; 