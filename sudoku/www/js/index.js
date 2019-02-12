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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const toolkit = __webpack_require__(/*! ./toolkit */ "./js/toolkit.js");

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    const matrix = toolkit.makeMatrix();
    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
    const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
      return $('<span>').addClass(colGroupClasses[colIndex % 3]).text(cellValue);
    }));
    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $('<div>').addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
    });

    this._$container.append($divArray);
  }

}

new Grid($("#container")).build();

/***/ }),

/***/ "./js/toolkit.js":
/*!***********************!*\
  !*** ./js/toolkit.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

const matrixToolkit = {
  makeRow(v = 0) {
    const array = new Array(9);
    array.fill(v);
    return array;
  },

  //生成行
  makeMatrix(v = 0) {
    return Array.from({
      length: 9
    }, () => this.makeRow(v));
  },

  //生成二维数组

  /**
   * 生成洗牌算法
   */
  shuffle(array) {
    const endIndex = array.length - 2;

    for (let i = 0; i <= endIndex; i++) {
      const j = i + Math.floor(Math.random() * (array.length - i));
      [array[i].array[j]] = [array[j].array[i]];
    }

    return array;
  }

};
module.exports = matrixToolkit;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vanMvdG9vbGtpdC5qcyJdLCJuYW1lcyI6WyJ0b29sa2l0IiwicmVxdWlyZSIsIkdyaWQiLCJjb25zdHJ1Y3RvciIsImNvbnRhaW5lciIsIl8kY29udGFpbmVyIiwiYnVpbGQiLCJtYXRyaXgiLCJtYWtlTWF0cml4Iiwicm93R3JvdXBDbGFzc2VzIiwiY29sR3JvdXBDbGFzc2VzIiwiJGNlbGxzIiwibWFwIiwicm93VmFsdWVzIiwiY2VsbFZhbHVlIiwiY29sSW5kZXgiLCIkIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiJGRpdkFycmF5IiwiJHNwYW5BcnJheSIsInJvd0luZGV4IiwiYXBwZW5kIiwibWF0cml4VG9vbGtpdCIsIm1ha2VSb3ciLCJ2IiwiYXJyYXkiLCJBcnJheSIsImZpbGwiLCJmcm9tIiwibGVuZ3RoIiwic2h1ZmZsZSIsImVuZEluZGV4IiwiaSIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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LGFBQWYsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vanMvaW5kZXguanNcIik7XG4iLCJjb25zdCB0b29sa2l0PXJlcXVpcmUoXCIuL3Rvb2xraXRcIik7XHJcblxyXG5cclxuXHJcbmNsYXNzIEdyaWR7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpe1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXI9Y29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgYnVpbGQoKXtcclxuICAgICAgICBjb25zdCBtYXRyaXg9dG9vbGtpdC5tYWtlTWF0cml4KCk7XHJcbiAgICAgICAgY29uc3Qgcm93R3JvdXBDbGFzc2VzPVtcInJvd19nX3RvcFwiLFwicm93X2dfbWlkZGxlXCIsXCJyb3dfZ19ib3R0b21cIl07XHJcbiAgICAgICAgY29uc3QgY29sR3JvdXBDbGFzc2VzPVtcImNvbF9nX2xlZnRcIixcImNvbF9nX2NlbnRlclwiLFwiY29sX2dfcmlnaHRcIl07XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGNvbnN0ICRjZWxscz1tYXRyaXgubWFwKHJvd1ZhbHVlcz0+cm93VmFsdWVzLm1hcCgoY2VsbFZhbHVlLGNvbEluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gICQoJzxzcGFuPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGNvbEdyb3VwQ2xhc3Nlc1tjb2xJbmRleCUzXSlcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChjZWxsVmFsdWUpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGNvbnN0ICRkaXZBcnJheT0kY2VsbHMubWFwKCgkc3BhbkFycmF5LHJvd0luZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gJCgnPGRpdj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcInJvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhyb3dHcm91cENsYXNzZXNbcm93SW5kZXglM10pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkc3BhbkFycmF5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXIuYXBwZW5kKCRkaXZBcnJheSk7XHJcbiAgICB9XHJcbn1cclxubmV3IEdyaWQoJChcIiNjb250YWluZXJcIikpLmJ1aWxkKCk7IiwiY29uc3QgbWF0cml4VG9vbGtpdD17XHJcbiAgICBtYWtlUm93KHY9MCl7XHJcbiAgICAgICAgY29uc3QgYXJyYXk9bmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGFycmF5LmZpbGwodik7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9LC8v55Sf5oiQ6KGMXHJcbiAgICBcclxuICAgIFxyXG4gICAgbWFrZU1hdHJpeCh2PTApe1xyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGg6OX0sKCk9PnRoaXMubWFrZVJvdyh2KSlcclxuICAgIH0sLy/nlJ/miJDkuoznu7TmlbDnu4RcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/miJDmtJfniYznrpfms5VcclxuICAgICAqL1xyXG4gICAgc2h1ZmZsZShhcnJheSl7XHJcbiAgICAgICAgY29uc3QgZW5kSW5kZXg9YXJyYXkubGVuZ3RoLTI7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTw9ZW5kSW5kZXg7aSsrKXtcclxuICAgICAgICAgICAgY29uc3Qgaj1pK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooYXJyYXkubGVuZ3RoLWkpKTtcclxuICAgICAgICAgICAgW2FycmF5W2ldLmFycmF5W2pdXT1bYXJyYXlbal0uYXJyYXlbaV1dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheVxyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzPW1hdHJpeFRvb2xraXQ7Il0sInNvdXJjZVJvb3QiOiIifQ==