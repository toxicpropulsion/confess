/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/src/js/events.js":
/*!*********************************!*\
  !*** ./public/src/js/events.js ***!
  \*********************************/
/*! exports provided: onDOMContentLoaded, onSinFormSubmit, onTextareaChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDOMContentLoaded", function() { return onDOMContentLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSinFormSubmit", function() { return onSinFormSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onTextareaChange", function() { return onTextareaChange; });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./public/src/js/request.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./public/src/js/utils.js");



function onDOMContentLoaded() {
  Object(_request__WEBPACK_IMPORTED_MODULE_0__["getSin"])().then(sin => {
    document.getElementById("sinText").placeholder = sin.content;
  });
}

function onSinFormSubmit(event) {
  event.preventDefault();

  const nodeName = event.target.nodeName;

  if (nodeName != "BUTTON") return;

  const form = event.target.form;
  const textarea = form.elements["sinText"];
  const target = event.target.id;

  const body = {};

  switch (target) {
    case "forgiveBtn":
      if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["textareaIsEmpty"])(textarea)) {
        console.error("Textarea is empty");
        return false;
      }
      body["content"] = textarea.value;
      Object(_request__WEBPACK_IMPORTED_MODULE_0__["postSin"])(body)
        .then(res => {
          if (res.status === 1) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["togglePopup"])("popup", 3500);
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["clearTextarea"])(textarea);
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["switchForgiveBtnState"])();
          } else {
            console.error(res.error);
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["togglePopup"])("popup-error", 4500);
          }
        })
        .catch(err => {
          console.error(err);
          Object(_utils__WEBPACK_IMPORTED_MODULE_1__["togglePopup"])("popup-error", 4500);
        });
      break;
    case "nextSin":
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["clearTextarea"])(textarea);
      Object(_request__WEBPACK_IMPORTED_MODULE_0__["getSin"])().then(sin => {
        textarea.placeholder = sin.content;
      }).catch(err => {
        console.error(err);
      });
      break;
    default:
      console.error("Unexpected submit event");
  }
}

function onTextareaChange(event) {
  const btn = document.getElementById("forgiveBtn");
  const disabled = btn.classList.contains("disabled");
  const len = event.target.value.length;

  if (len <= 0 && !disabled) {
    btn.classList.add("disabled");
  }
  if (len > 0 && disabled) {
    btn.classList.remove("disabled");
  }
}


/***/ }),

/***/ "./public/src/js/index.js":
/*!********************************!*\
  !*** ./public/src/js/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./public/src/js/events.js");


const sinForm = document.getElementById("sinForm");
const sinText = document.getElementById("sinText");

document.addEventListener("DOMContentLoaded", _events__WEBPACK_IMPORTED_MODULE_0__["onDOMContentLoaded"]);
sinForm.addEventListener("click", _events__WEBPACK_IMPORTED_MODULE_0__["onSinFormSubmit"]);
sinText.addEventListener("keyup", _events__WEBPACK_IMPORTED_MODULE_0__["onTextareaChange"]);


/***/ }),

/***/ "./public/src/js/request.js":
/*!**********************************!*\
  !*** ./public/src/js/request.js ***!
  \**********************************/
/*! exports provided: getSin, postSin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSin", function() { return getSin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postSin", function() { return postSin; });
function getSin() {
  return fetch("/sins/random", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json();
  });
}

function postSin(body) {
  return fetch("/sins/create", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json();
  });
}


/***/ }),

/***/ "./public/src/js/utils.js":
/*!********************************!*\
  !*** ./public/src/js/utils.js ***!
  \********************************/
/*! exports provided: textareaIsEmpty, clearTextarea, switchForgiveBtnState, togglePopup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textareaIsEmpty", function() { return textareaIsEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTextarea", function() { return clearTextarea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchForgiveBtnState", function() { return switchForgiveBtnState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "togglePopup", function() { return togglePopup; });
function textareaIsEmpty(textarea) {
  return textarea.value.length ? false : true;
}

function clearTextarea(textarea) {
  textarea.value = "";
}

function switchForgiveBtnState() {
  const btn = document.getElementById("forgiveBtn");
  const disabled = btn.classList.contains("disabled");
  if (disabled) {
    btn.classList.remove("disabled");
  } else {
    btn.classList.add("disabled");
  }
}

function togglePopup(id, timeout = 3000) {
  const popup = document.getElementById(id);
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, timeout);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2pzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE0QztBQU0zQjs7QUFFVjtBQUNQLEVBQUUsdURBQU07QUFDUjtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSw4REFBZTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sd0RBQU87QUFDYjtBQUNBO0FBQ0EsWUFBWSwwREFBVztBQUN2QixZQUFZLDREQUFhO0FBQ3pCLFlBQVksb0VBQXFCO0FBQ2pDLFdBQVc7QUFDWDtBQUNBLFlBQVksMERBQVc7QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVUsMERBQVc7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQSxNQUFNLDREQUFhO0FBQ25CLE1BQU0sdURBQU07QUFDWjtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUVBO0FBQUE7QUFJa0I7O0FBRWxCO0FBQ0E7O0FBRUEsOENBQThDLDBEQUFrQjtBQUNoRSxrQ0FBa0MsdURBQWU7QUFDakQsa0NBQWtDLHdEQUFnQjs7Ozs7Ozs7Ozs7OztBQ1hsRDtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgcG9zdFNpbiwgZ2V0U2luIH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQge1xyXG4gIHRleHRhcmVhSXNFbXB0eSxcclxuICBjbGVhclRleHRhcmVhLFxyXG4gIHN3aXRjaEZvcmdpdmVCdG5TdGF0ZSxcclxuICB0b2dnbGVQb3B1cFxyXG59IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25ET01Db250ZW50TG9hZGVkKCkge1xyXG4gIGdldFNpbigpLnRoZW4oc2luID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2luVGV4dFwiKS5wbGFjZWhvbGRlciA9IHNpbi5jb250ZW50O1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TaW5Gb3JtU3VibWl0KGV2ZW50KSB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3Qgbm9kZU5hbWUgPSBldmVudC50YXJnZXQubm9kZU5hbWU7XHJcblxyXG4gIGlmIChub2RlTmFtZSAhPSBcIkJVVFRPTlwiKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQuZm9ybTtcclxuICBjb25zdCB0ZXh0YXJlYSA9IGZvcm0uZWxlbWVudHNbXCJzaW5UZXh0XCJdO1xyXG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5pZDtcclxuXHJcbiAgY29uc3QgYm9keSA9IHt9O1xyXG5cclxuICBzd2l0Y2ggKHRhcmdldCkge1xyXG4gICAgY2FzZSBcImZvcmdpdmVCdG5cIjpcclxuICAgICAgaWYgKHRleHRhcmVhSXNFbXB0eSh0ZXh0YXJlYSkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGV4dGFyZWEgaXMgZW1wdHlcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGJvZHlbXCJjb250ZW50XCJdID0gdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgIHBvc3RTaW4oYm9keSlcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDEpIHtcclxuICAgICAgICAgICAgdG9nZ2xlUG9wdXAoXCJwb3B1cFwiLCAzNTAwKTtcclxuICAgICAgICAgICAgY2xlYXJUZXh0YXJlYSh0ZXh0YXJlYSk7XHJcbiAgICAgICAgICAgIHN3aXRjaEZvcmdpdmVCdG5TdGF0ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB0b2dnbGVQb3B1cChcInBvcHVwLWVycm9yXCIsIDQ1MDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICB0b2dnbGVQb3B1cChcInBvcHVwLWVycm9yXCIsIDQ1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJuZXh0U2luXCI6XHJcbiAgICAgIGNsZWFyVGV4dGFyZWEodGV4dGFyZWEpO1xyXG4gICAgICBnZXRTaW4oKS50aGVuKHNpbiA9PiB7XHJcbiAgICAgICAgdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBzaW4uY29udGVudDtcclxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmV4cGVjdGVkIHN1Ym1pdCBldmVudFwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRleHRhcmVhQ2hhbmdlKGV2ZW50KSB7XHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JnaXZlQnRuXCIpO1xyXG4gIGNvbnN0IGRpc2FibGVkID0gYnRuLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpO1xyXG4gIGNvbnN0IGxlbiA9IGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGg7XHJcblxyXG4gIGlmIChsZW4gPD0gMCAmJiAhZGlzYWJsZWQpIHtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgfVxyXG4gIGlmIChsZW4gPiAwICYmIGRpc2FibGVkKSB7XHJcbiAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIG9uRE9NQ29udGVudExvYWRlZCxcclxuICBvblNpbkZvcm1TdWJtaXQsXHJcbiAgb25UZXh0YXJlYUNoYW5nZVxyXG59IGZyb20gXCIuL2V2ZW50c1wiO1xyXG5cclxuY29uc3Qgc2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2luRm9ybVwiKTtcclxuY29uc3Qgc2luVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2luVGV4dFwiKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG9uRE9NQ29udGVudExvYWRlZCk7XHJcbnNpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uU2luRm9ybVN1Ym1pdCk7XHJcbnNpblRleHQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uVGV4dGFyZWFDaGFuZ2UpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U2luKCkge1xyXG4gIHJldHVybiBmZXRjaChcIi9zaW5zL3JhbmRvbVwiLCB7XHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9XHJcbiAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3N0U2luKGJvZHkpIHtcclxuICByZXR1cm4gZmV0Y2goXCIvc2lucy9jcmVhdGVcIiwge1xyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgfVxyXG4gIH0pLnRoZW4ocmVzID0+IHtcclxuICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gIH0pO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiB0ZXh0YXJlYUlzRW1wdHkodGV4dGFyZWEpIHtcclxuICByZXR1cm4gdGV4dGFyZWEudmFsdWUubGVuZ3RoID8gZmFsc2UgOiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJUZXh0YXJlYSh0ZXh0YXJlYSkge1xyXG4gIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaEZvcmdpdmVCdG5TdGF0ZSgpIHtcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcmdpdmVCdG5cIik7XHJcbiAgY29uc3QgZGlzYWJsZWQgPSBidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIik7XHJcbiAgaWYgKGRpc2FibGVkKSB7XHJcbiAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVBvcHVwKGlkLCB0aW1lb3V0ID0gMzAwMCkge1xyXG4gIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgfSwgdGltZW91dCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==