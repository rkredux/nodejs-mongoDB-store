/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function autocomplete(input, latInput, lngInput) {

	if (!input) return;
	console.log(input, latInput, lngInput);

	var dropdown = new goolge.maps.places.Autocomplete(input);
	dropdown.addListener("place_changed", function () {
		var place = dropdown.getPlace();
		console.log(place);
		latInput.value = place.geometry.location.lat();
		lngInput.value = place.geometry.location.lng();
	});

	console.log("This is running");

	input.on("keydown", function (e) {
		if (e.keyCode === 13) e.preventDefault();
	});
}

exports.default = autocomplete;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token, expected , (34:83)\n\n\u001b[0m \u001b[90m 32 | \u001b[39m\t\t     \u001b[33m.\u001b[39mthen((res) \u001b[33m=>\u001b[39m{\n \u001b[90m 33 | \u001b[39m\t\t     \t\u001b[36mif\u001b[39m(res\u001b[33m.\u001b[39mdata\u001b[33m.\u001b[39mlength){    \t\t\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 34 | \u001b[39m\t\t     \t\tsearchResults\u001b[33m.\u001b[39minnerHTML \u001b[33m=\u001b[39m dompurify\u001b[33m.\u001b[39msanitize((searchResultsHTML(res\u001b[33m.\u001b[39mdata))\u001b[33m;\u001b[39m  \n \u001b[90m    | \u001b[39m\t\t     \t\t                                                                          \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 35 | \u001b[39m\t\t     \t\t\u001b[36mreturn\u001b[39m\u001b[33m;\u001b[39m \n \u001b[90m 36 | \u001b[39m\t\t     \t} \n \u001b[90m 37 | \u001b[39m\t\t     \tsearchResults\u001b[33m.\u001b[39minnertHTML \u001b[33m=\u001b[39m dompurify\u001b[33m.\u001b[39msanitize(\u001b[32m`<div class=\"search__result\">Found no stores for ${this.value}</div>`\u001b[39m)\u001b[33m;\u001b[39m \u001b[0m\n");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _typeAhead = __webpack_require__(2);

var _typeAhead2 = _interopRequireDefault(_typeAhead);

var _bling = __webpack_require__(1);

var _autocomplete = __webpack_require__(0);

var _autocomplete2 = _interopRequireDefault(_autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log("This is running"); 
(0, _autocomplete2.default)((0, _bling.$)("#address"), (0, _bling.$)("#lat"), (0, _bling.$)("#lng"));
(0, _typeAhead2.default)((0, _bling.$)(".search"));

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map