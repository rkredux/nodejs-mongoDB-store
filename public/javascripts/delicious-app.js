import '../sass/style.scss';
import typeAhead from "./modules/typeAhead"; 
import { $, $$ } from './modules/bling';
import autocomplete from "./modules/autocomplete"; 
import makeMap from "./modules/map"; 
import ajaxHeart from "./modules/heart"; 

// console.log("This is running"); 
autocomplete($("#address"), $("#lat"), $("#lng")); 

typeAhead($(".search")); 

makeMap($("#map")); 

const heartForms = $$("form.heart"); 

heartForms.on("submit", ajaxHeart); 





