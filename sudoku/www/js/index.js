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

/***/ "./js/core/toolkit.js":
/*!****************************!*\
  !*** ./js/core/toolkit.js ***!
  \****************************/
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
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  },

  /**
   * 检查制定位置可以填写数字n
   */
  checkFillable(matrix, n, rowIndex, colIndex) {
    const row = matrix[rowIndex]; //获取行数据

    const column = this.makeRow().map((v, i) => matrix[i][colIndex]); //获取列数据

    const {
      boxIndex
    } = boxToolkit.covertToBoxIndex(rowIndex, colIndex);
    const box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (let i = 0; i < 9; i++) {
      if (row[i] == n || col[i] == n || box[i] == n) {
        return false;
      }
    }

    return true;
  }

};
/**
 * 宫坐标系的工具
 */

const boxToolkit = {
  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3;
    const startColIndex = boxIndex % 3 * 3;
    const result = [];

    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }

    return result;
  },

  //取出宫的数据
  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      colIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },

  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }

};
module.exports = class Toolkit {
  static get matrix() {
    return matrixToolkit;
  }

  static get box() {
    return boxToolkit;
  }

};

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(/*! ./ui/grid */ "./js/ui/grid.js");

const grid = new Grid($("#container"));
grid.build();
grid.layout(); //调整宽高和样式

/***/ }),

/***/ "./js/ui/grid.js":
/*!***********************!*\
  !*** ./js/ui/grid.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//生成九宫格
const Toolkit = __webpack_require__(/*! ../core/toolkit */ "./js/core/toolkit.js");

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    const matrix = Toolkit.matrix.makeMatrix();
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

  layout() {
    const width = $('span:first', this._$container).width();
    $('span', this._$container).height(width).css({
      "line-height": `${width}px`,
      "font-size": width < 32 ? `${width / 2}px` : ''
    });
  }

}

module.exports = Grid;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvY29yZS90b29sa2l0LmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL3VpL2dyaWQuanMiXSwibmFtZXMiOlsibWF0cml4VG9vbGtpdCIsIm1ha2VSb3ciLCJ2IiwiYXJyYXkiLCJBcnJheSIsImZpbGwiLCJtYWtlTWF0cml4IiwiZnJvbSIsImxlbmd0aCIsInNodWZmbGUiLCJlbmRJbmRleCIsImkiLCJqIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2hlY2tGaWxsYWJsZSIsIm1hdHJpeCIsIm4iLCJyb3dJbmRleCIsImNvbEluZGV4Iiwicm93IiwiY29sdW1uIiwibWFwIiwiYm94SW5kZXgiLCJib3hUb29sa2l0IiwiY292ZXJ0VG9Cb3hJbmRleCIsImJveCIsImdldEJveENlbGxzIiwiY29sIiwic3RhcnRSb3dJbmRleCIsInN0YXJ0Q29sSW5kZXgiLCJyZXN1bHQiLCJjZWxsSW5kZXgiLCJwdXNoIiwiY29udmVydFRvQm94SW5kZXgiLCJjb252ZXJ0RnJvbUJveEluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyIsIlRvb2xraXQiLCJHcmlkIiwicmVxdWlyZSIsImdyaWQiLCIkIiwiYnVpbGQiLCJsYXlvdXQiLCJjb25zdHJ1Y3RvciIsImNvbnRhaW5lciIsIl8kY29udGFpbmVyIiwicm93R3JvdXBDbGFzc2VzIiwiY29sR3JvdXBDbGFzc2VzIiwiJGNlbGxzIiwicm93VmFsdWVzIiwiY2VsbFZhbHVlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiJGRpdkFycmF5IiwiJHNwYW5BcnJheSIsImFwcGVuZCIsIndpZHRoIiwiaGVpZ2h0IiwiY3NzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7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U0FBUyxDQUFDN0IsR0FBVixDQUFjLENBQUM4QixTQUFELEVBQVdqQyxRQUFYLEtBQXNCO0FBQ25FLGFBQVF1QixDQUFDLENBQUMsUUFBRCxDQUFELENBQ0NXLFFBREQsQ0FDVUosZUFBZSxDQUFDOUIsUUFBUSxHQUFDLENBQVYsQ0FEekIsRUFFQ21DLElBRkQsQ0FFTUYsU0FGTixDQUFSO0FBR0gsS0FKa0MsQ0FBdEIsQ0FBYjtBQUtBLFVBQU1HLFNBQVMsR0FBQ0wsTUFBTSxDQUFDNUIsR0FBUCxDQUFXLENBQUNrQyxVQUFELEVBQVl0QyxRQUFaLEtBQXVCO0FBQzlDLGFBQU93QixDQUFDLENBQUMsT0FBRCxDQUFELENBQ0VXLFFBREYsQ0FDVyxLQURYLEVBRUVBLFFBRkYsQ0FFV0wsZUFBZSxDQUFDOUIsUUFBUSxHQUFDLENBQVYsQ0FGMUIsRUFHRXVDLE1BSEYsQ0FHU0QsVUFIVCxDQUFQO0FBSUgsS0FMZSxDQUFoQjs7QUFNQSxTQUFLVCxXQUFMLENBQWlCVSxNQUFqQixDQUF3QkYsU0FBeEI7QUFDSDs7QUFDRFgsUUFBTSxHQUFFO0FBQ0osVUFBTWMsS0FBSyxHQUFDaEIsQ0FBQyxDQUFDLFlBQUQsRUFBYyxLQUFLSyxXQUFuQixDQUFELENBQWlDVyxLQUFqQyxFQUFaO0FBQ0FoQixLQUFDLENBQUMsTUFBRCxFQUFRLEtBQUtLLFdBQWIsQ0FBRCxDQUNLWSxNQURMLENBQ1lELEtBRFosRUFFS0UsR0FGTCxDQUVTO0FBQ0QscUJBQWUsR0FBRUYsS0FBTSxJQUR0QjtBQUVELG1CQUFZQSxLQUFLLEdBQUMsRUFBTixHQUFZLEdBQUVBLEtBQUssR0FBQyxDQUFFLElBQXRCLEdBQTBCO0FBRnJDLEtBRlQ7QUFNSDs7QUFqQ0s7O0FBb0NWdEIsTUFBTSxDQUFDQyxPQUFQLEdBQWVFLElBQWYsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vanMvaW5kZXguanNcIik7XG4iLCJjb25zdCBtYXRyaXhUb29sa2l0PXtcclxuICAgIG1ha2VSb3codj0wKXtcclxuICAgICAgICBjb25zdCBhcnJheT1uZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgYXJyYXkuZmlsbCh2KTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH0sLy/nlJ/miJDooYxcclxuICAgIFxyXG4gICAgXHJcbiAgICBtYWtlTWF0cml4KHY9MCl7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oe2xlbmd0aDo5fSwoKT0+dGhpcy5tYWtlUm93KHYpKVxyXG4gICAgfSwvL+eUn+aIkOS6jOe7tOaVsOe7hFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOeUn+aIkOa0l+eJjOeul+azlVxyXG4gICAgICovXHJcbiAgICBzaHVmZmxlKGFycmF5KXtcclxuICAgICAgICBjb25zdCBlbmRJbmRleD1hcnJheS5sZW5ndGgtMjtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPD1lbmRJbmRleDtpKyspe1xyXG4gICAgICAgICAgICBjb25zdCBqPWkrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihhcnJheS5sZW5ndGgtaSkpO1xyXG4gICAgICAgICAgICBbYXJyYXlbaV0sYXJyYXlbal1dPVthcnJheVtqXSxhcnJheVtpXV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeWItuWumuS9jee9ruWPr+S7peWhq+WGmeaVsOWtl25cclxuICAgICAqL1xyXG4gICAgY2hlY2tGaWxsYWJsZShtYXRyaXgsbixyb3dJbmRleCxjb2xJbmRleCl7XHJcbiAgICAgICAgY29uc3Qgcm93PW1hdHJpeFtyb3dJbmRleF07Ly/ojrflj5booYzmlbDmja5cclxuICAgICAgICBjb25zdCBjb2x1bW49dGhpcy5tYWtlUm93KCkubWFwKCh2LGkpPT5tYXRyaXhbaV1bY29sSW5kZXhdKTsvL+iOt+WPluWIl+aVsOaNrlxyXG4gICAgICAgIGNvbnN0IHsgYm94SW5kZXggfT1ib3hUb29sa2l0LmNvdmVydFRvQm94SW5kZXgocm93SW5kZXgsY29sSW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IGJveD1ib3hUb29sa2l0LmdldEJveENlbGxzKG1hdHJpeCxib3hJbmRleCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8OTtpKyspe1xyXG4gICAgICAgICAgICBpZihyb3dbaV09PW4gfHwgY29sW2ldPT1uIHx8IGJveFtpXT09bil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIOWuq+WdkOagh+ezu+eahOW3peWFt1xyXG4gKi9cclxuY29uc3QgYm94VG9vbGtpdD17XHJcblxyXG4gICAgZ2V0Qm94Q2VsbHMobWF0cml4LGJveEluZGV4KXtcclxuICAgICAgICBjb25zdCBzdGFydFJvd0luZGV4PU1hdGguZmxvb3IoYm94SW5kZXgvMykqMztcclxuICAgICAgICBjb25zdCBzdGFydENvbEluZGV4PWJveEluZGV4JTMqMztcclxuICAgICAgICBjb25zdCByZXN1bHQ9W107XHJcbiAgICAgICAgZm9yKGxldCBjZWxsSW5kZXg9MDtjZWxsSW5kZXg8OTtjZWxsSW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0luZGV4PXN0YXJ0Um93SW5kZXgrTWF0aC5mbG9vcihjZWxsSW5kZXgvMyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbEluZGV4PXN0YXJ0Q29sSW5kZXgrY2VsbEluZGV4JTM7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1hdHJpeFtyb3dJbmRleF1bY29sSW5kZXhdKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LC8v5Y+W5Ye65a6r55qE5pWw5o2uXHJcblxyXG5cclxuICAgIGNvbnZlcnRUb0JveEluZGV4KHJvd0luZGV4LGNvbEluZGV4KXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBib3hJbmRleDpNYXRoLmZsb29yKHJvd0luZGV4LzMpKjMrIE1hdGguZmxvb3IoY29sSW5kZXgvMyksXHJcbiAgICAgICAgICAgIGNvbEluZGV4OnJvd0luZGV4ICUgMyAqIDMrY29sSW5kZXggJSAzXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb252ZXJ0RnJvbUJveEluZGV4KGJveEluZGV4LGNlbGxJbmRleCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm93SW5kZXg6TWF0aC5mbG9vcihib3hJbmRleC8zKSozKyBNYXRoLmZsb29yKGNlbGxJbmRleC8zKSxcclxuICAgICAgICAgICAgY29sSW5kZXg6Ym94SW5kZXggJSAzICogMytjZWxsSW5kZXggJSAzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzPWNsYXNzIFRvb2xraXR7XHJcbiAgICBzdGF0aWMgZ2V0IG1hdHJpeCgpe1xyXG4gICAgICAgIHJldHVybiBtYXRyaXhUb29sa2l0XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGJveCgpe1xyXG4gICAgICAgIHJldHVybiBib3hUb29sa2l0XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImNvbnN0IEdyaWQ9cmVxdWlyZShcIi4vdWkvZ3JpZFwiKTtcclxuXHJcbmNvbnN0IGdyaWQ9bmV3IEdyaWQoJChcIiNjb250YWluZXJcIikpO1xyXG5ncmlkLmJ1aWxkKCk7XHJcbmdyaWQubGF5b3V0KCk7Ly/osIPmlbTlrr3pq5jlkozmoLflvI9cclxuIiwiLy/nlJ/miJDkuZ3lrqvmoLxcclxuY29uc3QgVG9vbGtpdD1yZXF1aXJlKFwiLi4vY29yZS90b29sa2l0XCIpO1xyXG5cclxuY2xhc3MgR3JpZHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcil7XHJcbiAgICAgICAgdGhpcy5fJGNvbnRhaW5lcj1jb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBidWlsZCgpe1xyXG4gICAgICAgIGNvbnN0IG1hdHJpeD1Ub29sa2l0Lm1hdHJpeC5tYWtlTWF0cml4KCk7XHJcbiAgICAgICAgY29uc3Qgcm93R3JvdXBDbGFzc2VzPVtcInJvd19nX3RvcFwiLFwicm93X2dfbWlkZGxlXCIsXCJyb3dfZ19ib3R0b21cIl07XHJcbiAgICAgICAgY29uc3QgY29sR3JvdXBDbGFzc2VzPVtcImNvbF9nX2xlZnRcIixcImNvbF9nX2NlbnRlclwiLFwiY29sX2dfcmlnaHRcIl07XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGNvbnN0ICRjZWxscz1tYXRyaXgubWFwKHJvd1ZhbHVlcz0+cm93VmFsdWVzLm1hcCgoY2VsbFZhbHVlLGNvbEluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gICQoJzxzcGFuPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGNvbEdyb3VwQ2xhc3Nlc1tjb2xJbmRleCUzXSlcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChjZWxsVmFsdWUpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGNvbnN0ICRkaXZBcnJheT0kY2VsbHMubWFwKCgkc3BhbkFycmF5LHJvd0luZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gJCgnPGRpdj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcInJvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhyb3dHcm91cENsYXNzZXNbcm93SW5kZXglM10pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkc3BhbkFycmF5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXIuYXBwZW5kKCRkaXZBcnJheSk7XHJcbiAgICB9XHJcbiAgICBsYXlvdXQoKXtcclxuICAgICAgICBjb25zdCB3aWR0aD0kKCdzcGFuOmZpcnN0Jyx0aGlzLl8kY29udGFpbmVyKS53aWR0aCgpO1xyXG4gICAgICAgICQoJ3NwYW4nLHRoaXMuXyRjb250YWluZXIpXHJcbiAgICAgICAgICAgIC5oZWlnaHQod2lkdGgpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgXCJsaW5lLWhlaWdodFwiOmAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6d2lkdGg8MzIgPyBgJHt3aWR0aC8yfXB4YDonJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1HcmlkOyJdLCJzb3VyY2VSb290IjoiIn0=