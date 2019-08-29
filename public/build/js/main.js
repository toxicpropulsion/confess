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

  const { nodeName } = event.target;

  if (nodeName !== "BUTTON") return;

  const { id: target, form } = event.target;
  const textarea = form.elements.sinText;

  const body = {};

  switch (target) {
    case "forgiveBtn":
      if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["textareaIsEmpty"])(textarea)) {
        break;
      }
      body.content = textarea.value;
      Object(_request__WEBPACK_IMPORTED_MODULE_0__["postSin"])(body)
        .then(res => {
          if (res.status === 1) {
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["togglePopup"])("popup-ok", 3500);
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["clearTextarea"])(textarea);
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["switchForgiveBtnState"])();
          } else {
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["togglePopup"])("popup-error", 4500);
          }
        })
        .catch(err => {
          console.log(err);
          Object(_utils__WEBPACK_IMPORTED_MODULE_1__["togglePopup"])("popup-error", 4500);
        });
      break;
    case "nextSin":
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["clearTextarea"])(textarea);
      Object(_request__WEBPACK_IMPORTED_MODULE_0__["getSin"])().then(sin => {
        textarea.placeholder = sin.content;
      });
      break;
    default:
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
  return textarea.value.length <= 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2pzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUNpRDs7QUFFdEY7QUFDUCxFQUFFLHVEQUFNO0FBQ1I7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUDs7QUFFQSxTQUFTLFdBQVc7O0FBRXBCOztBQUVBLFNBQVMsbUJBQW1CO0FBQzVCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLDhEQUFlO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLE1BQU0sd0RBQU87QUFDYjtBQUNBO0FBQ0EsWUFBWSwwREFBVztBQUN2QixZQUFZLDREQUFhO0FBQ3pCLFlBQVksb0VBQXFCO0FBQ2pDLFdBQVc7QUFDWCxZQUFZLDBEQUFXO0FBQ3ZCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxVQUFVLDBEQUFXO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBTSw0REFBYTtBQUNuQixNQUFNLHVEQUFNO0FBQ1o7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvREE7QUFBQTtBQUFpRjs7QUFFakY7QUFDQTs7QUFFQSw4Q0FBOEMsMERBQWtCO0FBQ2hFLGtDQUFrQyx1REFBZTtBQUNqRCxrQ0FBa0Msd0RBQWdCOzs7Ozs7Ozs7Ozs7O0FDUGxEO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9zcmMvanMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBwb3N0U2luLCBnZXRTaW4gfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IHRleHRhcmVhSXNFbXB0eSwgY2xlYXJUZXh0YXJlYSwgc3dpdGNoRm9yZ2l2ZUJ0blN0YXRlLCB0b2dnbGVQb3B1cCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25ET01Db250ZW50TG9hZGVkKCkge1xyXG4gIGdldFNpbigpLnRoZW4oc2luID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2luVGV4dFwiKS5wbGFjZWhvbGRlciA9IHNpbi5jb250ZW50O1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TaW5Gb3JtU3VibWl0KGV2ZW50KSB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3QgeyBub2RlTmFtZSB9ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICBpZiAobm9kZU5hbWUgIT09IFwiQlVUVE9OXCIpIHJldHVybjtcclxuXHJcbiAgY29uc3QgeyBpZDogdGFyZ2V0LCBmb3JtIH0gPSBldmVudC50YXJnZXQ7XHJcbiAgY29uc3QgdGV4dGFyZWEgPSBmb3JtLmVsZW1lbnRzLnNpblRleHQ7XHJcblxyXG4gIGNvbnN0IGJvZHkgPSB7fTtcclxuXHJcbiAgc3dpdGNoICh0YXJnZXQpIHtcclxuICAgIGNhc2UgXCJmb3JnaXZlQnRuXCI6XHJcbiAgICAgIGlmICh0ZXh0YXJlYUlzRW1wdHkodGV4dGFyZWEpKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgYm9keS5jb250ZW50ID0gdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgIHBvc3RTaW4oYm9keSlcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDEpIHtcclxuICAgICAgICAgICAgdG9nZ2xlUG9wdXAoXCJwb3B1cC1va1wiLCAzNTAwKTtcclxuICAgICAgICAgICAgY2xlYXJUZXh0YXJlYSh0ZXh0YXJlYSk7XHJcbiAgICAgICAgICAgIHN3aXRjaEZvcmdpdmVCdG5TdGF0ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9nZ2xlUG9wdXAoXCJwb3B1cC1lcnJvclwiLCA0NTAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIHRvZ2dsZVBvcHVwKFwicG9wdXAtZXJyb3JcIiwgNDUwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIm5leHRTaW5cIjpcclxuICAgICAgY2xlYXJUZXh0YXJlYSh0ZXh0YXJlYSk7XHJcbiAgICAgIGdldFNpbigpLnRoZW4oc2luID0+IHtcclxuICAgICAgICB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IHNpbi5jb250ZW50O1xyXG4gICAgICB9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVGV4dGFyZWFDaGFuZ2UoZXZlbnQpIHtcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcmdpdmVCdG5cIik7XHJcbiAgY29uc3QgZGlzYWJsZWQgPSBidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIik7XHJcbiAgY29uc3QgbGVuID0gZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aDtcclxuXHJcbiAgaWYgKGxlbiA8PSAwICYmICFkaXNhYmxlZCkge1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICB9XHJcbiAgaWYgKGxlbiA+IDAgJiYgZGlzYWJsZWQpIHtcclxuICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IG9uRE9NQ29udGVudExvYWRlZCwgb25TaW5Gb3JtU3VibWl0LCBvblRleHRhcmVhQ2hhbmdlIH0gZnJvbSBcIi4vZXZlbnRzXCI7XHJcblxyXG5jb25zdCBzaW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5Gb3JtXCIpO1xyXG5jb25zdCBzaW5UZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5UZXh0XCIpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgb25ET01Db250ZW50TG9hZGVkKTtcclxuc2luRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25TaW5Gb3JtU3VibWl0KTtcclxuc2luVGV4dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25UZXh0YXJlYUNoYW5nZSk7XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRTaW4oKSB7XHJcbiAgcmV0dXJuIGZldGNoKFwiL3NpbnMvcmFuZG9tXCIsIHtcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgIH1cclxuICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc3RTaW4oYm9keSkge1xyXG4gIHJldHVybiBmZXRjaChcIi9zaW5zL2NyZWF0ZVwiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9XHJcbiAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgfSk7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRleHRhcmVhSXNFbXB0eSh0ZXh0YXJlYSkge1xyXG4gIHJldHVybiB0ZXh0YXJlYS52YWx1ZS5sZW5ndGggPD0gMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVGV4dGFyZWEodGV4dGFyZWEpIHtcclxuICB0ZXh0YXJlYS52YWx1ZSA9IFwiXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hGb3JnaXZlQnRuU3RhdGUoKSB7XHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JnaXZlQnRuXCIpO1xyXG4gIGNvbnN0IGRpc2FibGVkID0gYnRuLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpO1xyXG4gIGlmIChkaXNhYmxlZCkge1xyXG4gICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVQb3B1cChpZCwgdGltZW91dCA9IDMwMDApIHtcclxuICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH0sIHRpbWVvdXQpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=