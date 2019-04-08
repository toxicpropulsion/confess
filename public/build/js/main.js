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
/*! exports provided: onDOMContentLoaded, onSinFormSubmit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDOMContentLoaded", function() { return onDOMContentLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSinFormSubmit", function() { return onSinFormSubmit; });
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
      Object(_request__WEBPACK_IMPORTED_MODULE_0__["postSin"])(body).then(res => {
        console.log(res);
      });
      break;
    case "nextSin":
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["clearTextarea"])(textarea);
      Object(_request__WEBPACK_IMPORTED_MODULE_0__["getSin"])().then(sin => {
        textarea.placeholder = sin.content;
      });
      break;
    default:
      console.error("Unexpected submit event");
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


document.addEventListener("DOMContentLoaded", _events__WEBPACK_IMPORTED_MODULE_0__["onDOMContentLoaded"]);

const sinForm = document.getElementById("sinForm");

sinForm.addEventListener("click", _events__WEBPACK_IMPORTED_MODULE_0__["onSinFormSubmit"]);


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
/*! exports provided: textareaIsEmpty, clearTextarea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textareaIsEmpty", function() { return textareaIsEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTextarea", function() { return clearTextarea; });
function textareaIsEmpty(textarea) {
  return textarea.value.length ? false : true;
}

function clearTextarea(textarea) {
  textarea.value = "";
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvc3JjL2pzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3NyYy9qcy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEM7QUFDYTs7QUFFbEQ7QUFDUCxFQUFFLHVEQUFNO0FBQ1I7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVUsOERBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHdEQUFPO0FBQ2I7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU0sNERBQWE7QUFDbkIsTUFBTSx1REFBTTtBQUNaO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxQ0E7QUFBQTtBQUErRDs7QUFFL0QsOENBQThDLDBEQUFrQjs7QUFFaEU7O0FBRUEsa0NBQWtDLHVEQUFlOzs7Ozs7Ozs7Ozs7O0FDTmpEO0FBQUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9zcmMvanMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBwb3N0U2luLCBnZXRTaW4gfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IHRleHRhcmVhSXNFbXB0eSwgY2xlYXJUZXh0YXJlYSB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25ET01Db250ZW50TG9hZGVkKCkge1xyXG4gIGdldFNpbigpLnRoZW4oc2luID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2luVGV4dFwiKS5wbGFjZWhvbGRlciA9IHNpbi5jb250ZW50O1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25TaW5Gb3JtU3VibWl0KGV2ZW50KSB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3Qgbm9kZU5hbWUgPSBldmVudC50YXJnZXQubm9kZU5hbWU7XHJcblxyXG4gIGlmIChub2RlTmFtZSAhPSBcIkJVVFRPTlwiKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQuZm9ybTtcclxuICBjb25zdCB0ZXh0YXJlYSA9IGZvcm0uZWxlbWVudHNbXCJzaW5UZXh0XCJdO1xyXG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5pZDtcclxuXHJcbiAgY29uc3QgYm9keSA9IHt9O1xyXG5cclxuICBzd2l0Y2ggKHRhcmdldCkge1xyXG4gICAgY2FzZSBcImZvcmdpdmVCdG5cIjpcclxuICAgICAgaWYgKHRleHRhcmVhSXNFbXB0eSh0ZXh0YXJlYSkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGV4dGFyZWEgaXMgZW1wdHlcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGJvZHlbXCJjb250ZW50XCJdID0gdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgIHBvc3RTaW4oYm9keSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJuZXh0U2luXCI6XHJcbiAgICAgIGNsZWFyVGV4dGFyZWEodGV4dGFyZWEpO1xyXG4gICAgICBnZXRTaW4oKS50aGVuKHNpbiA9PiB7XHJcbiAgICAgICAgdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBzaW4uY29udGVudDtcclxuICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5lcnJvcihcIlVuZXhwZWN0ZWQgc3VibWl0IGV2ZW50XCIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBvbkRPTUNvbnRlbnRMb2FkZWQsIG9uU2luRm9ybVN1Ym1pdCB9IGZyb20gXCIuL2V2ZW50c1wiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgb25ET01Db250ZW50TG9hZGVkKTtcclxuXHJcbmNvbnN0IHNpbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpbkZvcm1cIik7XHJcblxyXG5zaW5Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvblNpbkZvcm1TdWJtaXQpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0U2luKCkge1xyXG4gIHJldHVybiBmZXRjaChcIi9zaW5zL3JhbmRvbVwiLCB7XHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9XHJcbiAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3N0U2luKGJvZHkpIHtcclxuICByZXR1cm4gZmV0Y2goXCIvc2lucy9jcmVhdGVcIiwge1xyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgfVxyXG4gIH0pLnRoZW4ocmVzID0+IHtcclxuICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gIH0pO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiB0ZXh0YXJlYUlzRW1wdHkodGV4dGFyZWEpIHtcclxuICByZXR1cm4gdGV4dGFyZWEudmFsdWUubGVuZ3RoID8gZmFsc2UgOiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJUZXh0YXJlYSh0ZXh0YXJlYSkge1xyXG4gIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9