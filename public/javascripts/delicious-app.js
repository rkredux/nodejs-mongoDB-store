import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from "./modules/autocomplete"; 
// console.log("This is running"); 
autocomplete($("#address"), $("#lat"), $("#lng")); 