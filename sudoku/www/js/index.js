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

/***/ "./js/core/checker.js":
/*!****************************!*\
  !*** ./js/core/checker.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//检查书数独的解决方案
function checkArray(array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);

  for (let i = 0; i < length; i++) {
    if (!marks[i]) {
      continue;
    }

    const v = array[i]; //是否有效 0无效 1-9 有效

    if (!v) {
      marks[i] = false;
      continue;
    } //是否有重复：i+1 ~ 9 ,是否和i位置的数据重复


    for (let j = i + 1; j < length; j++) {
      if (v == array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }

  return marks;
}

const Toolkit = __webpack_require__(/*! ./toolkit */ "./js/core/toolkit.js");
/**
 * 输入：matrix,用户完成的数独数据，9*9；
 * 处理：对matrix 行，列，宫进行检查，并填写marks
 * 输出：检查是否成功，marks
 */


module.exports = class Checker {
  constructor(matrix) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks() {
    return this._matrixMarks;
  }

  get isSuccess() {
    return this._success;
  }

  check() {
    this.checkRows();
    this.checkCols();
    this.checkBoxes(); //检查是否成功

    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }

  checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = [];

      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex];
      }

      const marks = checkArray(cols);

      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray(boxes);

      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const {
            rowIndex,
            colIndex
          } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

};

/***/ }),

/***/ "./js/core/generator.js":
/*!******************************!*\
  !*** ./js/core/generator.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//生成数独解决方案
const Toolkit = __webpack_require__(/*! ./toolkit */ "./js/core/toolkit.js");

module.exports = class Generator {
  generate() {
    while (!this.internalGenerate()) {}
  }

  internalGenerate() {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix().map(row => row.map((v, i) => i)).map(row => Toolkit.matrix.shuffle(row)); //生成随机序列的矩阵

    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false;
      }

      ;
    }

    return true;
  }

  fillNumber(n) {
    return this.fillRow(n, 0);
  }

  fillRow(n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];

    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i]; //如果这个位置已经有值，跳过

      if (row[colIndex]) {
        continue;
      } //检查这个位置是否可以填n


      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }

      row[colIndex] = n; //去下一行填写n,如果没填进去，就继续寻找当前行下一个位置

      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }

    return false;
  }

};

/***/ }),

/***/ "./js/core/sudoku.js":
/*!***************************!*\
  !*** ./js/core/sudoku.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//生成数独游戏
//1。生成完整的解决方案；Generator
//2.随机去除部分数据，按比例
const Generator = __webpack_require__(/*! ./generator */ "./js/core/generator.js");

module.exports = class Sudoku {
  constructor() {
    //生成完整的解决方案
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5) {
    //const shouldRid=Math.random()*9 <level
    //生成谜盘
    this.puzzleMatrix = this.solutionMatrix.map(row => {
      return row.map(cell => Math.random() * 9 < level ? 0 : cell);
    });
  }

};

/***/ }),

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
    } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
    const box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (let i = 0; i < 9; i++) {
      if (row[i] == n || column[i] == n || box[i] == n) {
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

const PopupNumbers = __webpack_require__(/*! ./ui/popupnumbers */ "./js/ui/popupnumbers.js");

const grid = new Grid($("#container"));
grid.build();
grid.layout(); //调整宽高和样式

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers); //绑定按钮

$('#check').on("click", e => {
  if (grid.check()) {
    alert('成功');
  }
});
$('#reset').on("click", e => {
  grid.reset();
});
$('#clear').on("click", e => {
  grid.clear();
});
$('#rebuild').on("click", e => {
  grid.rebuild();
});

/***/ }),

/***/ "./js/ui/grid.js":
/*!***********************!*\
  !*** ./js/ui/grid.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//生成九宫格
const Toolkit = __webpack_require__(/*! ../core/toolkit */ "./js/core/toolkit.js");

const Sudoku = __webpack_require__(/*! ../core/sudoku */ "./js/core/sudoku.js");

const Checker = __webpack_require__(/*! ../core/checker */ "./js/core/checker.js");

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;
    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
    const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
      return $('<span>').addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : 'empty').text(cellValue);
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

  check() {
    const $rows = this._$container.children();

    const data = $rows.map((rowIndex, div) => {
      return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0);
    }).toArray().map($data => $data.toArray());
    const checker = new Checker(data);

    if (checker.check()) {
      return true;
    } //检查不成功进行标记


    const marks = checker.matrixMarks;

    this._$container.children().each((rowIndex, div) => {
      $(div).children().each((colIndex, span) => {
        const $span = $(span);

        if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
          $span.removeClass('error');
        } else {
          $span.addClass('error');
        }
      });
    });
  }

  reset() {
    this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass('empty').text(0);
  }

  clear() {
    this._$container.find("span.error").removeClass('error');
  }

  rebuild() {
    this._$container.empty();

    this.build();
    this.layout();
  }

  bindPopup(popupNumbers) {
    this._$container.on("click", "span", e => {
      const $cell = $(e.target);

      if ($cell.is('.fixed')) {
        return;
      }

      popupNumbers.popup($cell);
    });
  }

}

module.exports = Grid;

/***/ }),

/***/ "./js/ui/popupnumbers.js":
/*!*******************************!*\
  !*** ./js/ui/popupnumbers.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

//处理弹出的操作面板
module.exports = class PopupNumbers {
  constructor($panel) {
    this._$panel = $panel.hide().removeClass('hidden');

    this._$panel.on('click', "span", e => {
      const $cell = this._$targetCell;
      const $span = $(e.target);

      if ($span.hasClass('mark1')) {
        //回填样式
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2').addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        //回填样式
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1').addClass('mark2');
        }
      } else if ($span.hasClass('empty')) {
        $cell.text(0).addClass('empty'); //取消数字和样式
      } else {
        //回填数字
        $cell.removeClass('empty').text($span.text());
      }

      this.hide();
    });
  }
  /**
   * 定义位置
   */


  popup($cell) {
    this._$targetCell = $cell;
    const {
      left,
      top
    } = $cell.position();

    this._$panel.css({
      left: `${left}px`,
      top: `${top}px`
    }).show();
  } //隐藏面板


  hide() {
    this._$panel.hide();
  }

};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvY29yZS9jaGVja2VyLmpzIiwid2VicGFjazovLy8uL2pzL2NvcmUvZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL2pzL2NvcmUvc3Vkb2t1LmpzIiwid2VicGFjazovLy8uL2pzL2NvcmUvdG9vbGtpdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qcy91aS9ncmlkLmpzIiwid2VicGFjazovLy8uL2pzL3VpL3BvcHVwbnVtYmVycy5qcyJdLCJuYW1lcyI6WyJjaGVja0FycmF5IiwiYXJyYXkiLCJsZW5ndGgiLCJtYXJrcyIsIkFycmF5IiwiZmlsbCIsImkiLCJ2IiwiaiIsIlRvb2xraXQiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsIkNoZWNrZXIiLCJjb25zdHJ1Y3RvciIsIm1hdHJpeCIsIl9tYXRyaXgiLCJfbWF0cml4TWFya3MiLCJtYWtlTWF0cml4IiwibWF0cml4TWFya3MiLCJpc1N1Y2Nlc3MiLCJfc3VjY2VzcyIsImNoZWNrIiwiY2hlY2tSb3dzIiwiY2hlY2tDb2xzIiwiY2hlY2tCb3hlcyIsImV2ZXJ5Iiwicm93IiwibWFyayIsInJvd0luZGV4IiwiY29sSW5kZXgiLCJjb2xzIiwiYm94SW5kZXgiLCJib3hlcyIsImJveCIsImdldEJveENlbGxzIiwiY2VsbEluZGV4IiwiY29udmVydEZyb21Cb3hJbmRleCIsIkdlbmVyYXRvciIsImdlbmVyYXRlIiwiaW50ZXJuYWxHZW5lcmF0ZSIsIm9yZGVycyIsIm1hcCIsInNodWZmbGUiLCJuIiwiZmlsbE51bWJlciIsImZpbGxSb3ciLCJjaGVja0ZpbGxhYmxlIiwiU3Vkb2t1IiwiZ2VuZXJhdG9yIiwic29sdXRpb25NYXRyaXgiLCJtYWtlIiwibGV2ZWwiLCJwdXp6bGVNYXRyaXgiLCJjZWxsIiwiTWF0aCIsInJhbmRvbSIsIm1hdHJpeFRvb2xraXQiLCJtYWtlUm93IiwiZnJvbSIsImVuZEluZGV4IiwiZmxvb3IiLCJjb2x1bW4iLCJib3hUb29sa2l0IiwiY29udmVydFRvQm94SW5kZXgiLCJzdGFydFJvd0luZGV4Iiwic3RhcnRDb2xJbmRleCIsInJlc3VsdCIsInB1c2giLCJHcmlkIiwiUG9wdXBOdW1iZXJzIiwiZ3JpZCIsIiQiLCJidWlsZCIsImxheW91dCIsInBvcHVwTnVtYmVycyIsImJpbmRQb3B1cCIsIm9uIiwiZSIsImFsZXJ0IiwicmVzZXQiLCJjbGVhciIsInJlYnVpbGQiLCJjb250YWluZXIiLCJfJGNvbnRhaW5lciIsInN1ZG9rdSIsInJvd0dyb3VwQ2xhc3NlcyIsImNvbEdyb3VwQ2xhc3NlcyIsIiRjZWxscyIsInJvd1ZhbHVlcyIsImNlbGxWYWx1ZSIsImFkZENsYXNzIiwidGV4dCIsIiRkaXZBcnJheSIsIiRzcGFuQXJyYXkiLCJhcHBlbmQiLCJ3aWR0aCIsImhlaWdodCIsImNzcyIsIiRyb3dzIiwiY2hpbGRyZW4iLCJkYXRhIiwiZGl2Iiwic3BhbiIsInBhcnNlSW50IiwidG9BcnJheSIsIiRkYXRhIiwiY2hlY2tlciIsImVhY2giLCIkc3BhbiIsImlzIiwicmVtb3ZlQ2xhc3MiLCJmaW5kIiwiZW1wdHkiLCIkY2VsbCIsInRhcmdldCIsInBvcHVwIiwiJHBhbmVsIiwiXyRwYW5lbCIsImhpZGUiLCJfJHRhcmdldENlbGwiLCJoYXNDbGFzcyIsImxlZnQiLCJ0b3AiLCJwb3NpdGlvbiIsInNob3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNB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U0FBRyxFQUFFLEdBQUVBLEdBQUk7QUFGRSxLQUFqQixFQUdHRSxJQUhIO0FBSUgsR0EvQytCLENBaURoQzs7O0FBQ0FOLE1BQUksR0FBRTtBQUNGLFNBQUtELE9BQUwsQ0FBYUMsSUFBYjtBQUNIOztBQXBEK0IsQ0FBcEMsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vanMvaW5kZXguanNcIik7XG4iLCIvL+ajgOafpeS5puaVsOeLrOeahOino+WGs+aWueahiFxyXG5mdW5jdGlvbiBjaGVja0FycmF5KGFycmF5KXtcclxuICAgIGNvbnN0IGxlbmd0aD1hcnJheS5sZW5ndGg7XHJcbiAgICBjb25zdCBtYXJrcz1uZXcgQXJyYXkobGVuZ3RoKTtcclxuICAgIG1hcmtzLmZpbGwodHJ1ZSk7XHJcbiAgICBmb3IobGV0IGk9MDtpPGxlbmd0aDtpKyspe1xyXG5cclxuICAgICAgICBpZighbWFya3NbaV0pe1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgdj1hcnJheVtpXTtcclxuICAgICAgICAvL+aYr+WQpuacieaViCAw5peg5pWIIDEtOSDmnInmlYhcclxuICAgICAgICBpZighdil7XHJcbiAgICAgICAgICAgIG1hcmtzW2ldPWZhbHNlO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5piv5ZCm5pyJ6YeN5aSN77yaaSsxIH4gOSAs5piv5ZCm5ZKMaeS9jee9rueahOaVsOaNrumHjeWkjVxyXG4gICAgICAgIGZvcihsZXQgaj1pKzE7ajxsZW5ndGg7aisrKXtcclxuICAgICAgICAgICAgaWYodj09YXJyYXlbal0pe1xyXG4gICAgICAgICAgICAgICAgbWFya3NbaV09bWFya3Nbal09ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcmtzXHJcbn1cclxuXHJcbmNvbnN0IFRvb2xraXQ9cmVxdWlyZShcIi4vdG9vbGtpdFwiKTtcclxuXHJcblxyXG4vKipcclxuICog6L6T5YWl77yabWF0cml4LOeUqOaIt+WujOaIkOeahOaVsOeLrOaVsOaNru+8jDkqOe+8m1xyXG4gKiDlpITnkIbvvJrlr7ltYXRyaXgg6KGM77yM5YiX77yM5a6r6L+b6KGM5qOA5p+l77yM5bm25aGr5YaZbWFya3NcclxuICog6L6T5Ye677ya5qOA5p+l5piv5ZCm5oiQ5Yqf77yMbWFya3NcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQ2hlY2tlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtYXRyaXgpe1xyXG4gICAgICAgIHRoaXMuX21hdHJpeD1tYXRyaXg7XHJcbiAgICAgICAgdGhpcy5fbWF0cml4TWFya3M9VG9vbGtpdC5tYXRyaXgubWFrZU1hdHJpeCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF0cml4TWFya3MoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0cml4TWFya3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3VjY2Vzcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKCl7XHJcbiAgICAgICAgdGhpcy5jaGVja1Jvd3MoKTtcclxuICAgICAgICB0aGlzLmNoZWNrQ29scygpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tCb3hlcygpO1xyXG5cclxuICAgICAgICAvL+ajgOafpeaYr+WQpuaIkOWKn1xyXG4gICAgICAgIHRoaXMuX3N1Y2Nlc3M9dGhpcy5fbWF0cml4TWFya3MuZXZlcnkocm93PT5yb3cuZXZlcnkobWFyaz0+bWFyaykpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1Y2Nlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tSb3dzKCl7XHJcbiAgICAgICAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IDk7IHJvd0luZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5fbWF0cml4W3Jvd0luZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgbWFya3M9Y2hlY2tBcnJheShyb3cpO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBjb2xJbmRleD0wO2NvbEluZGV4IDwgbWFya3MubGVuZ3RoOyBjb2xJbmRleCsrKXtcclxuICAgICAgICAgICAgICAgIGlmKCFtYXJrc1tjb2xJbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeE1hcmtzW3Jvd0luZGV4XVtjb2xJbmRleF09ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ29scygpe1xyXG4gICAgICAgIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCA5OyBjb2xJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHM9W107XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCA5OyByb3dJbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xzW3Jvd0luZGV4XT10aGlzLl9tYXRyaXhbcm93SW5kZXhdW2NvbEluZGV4XTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgbWFya3M9Y2hlY2tBcnJheShjb2xzKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IG1hcmtzLmxlbmd0aDsgcm93SW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIW1hcmtzW3Jvd0luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0cml4TWFya3Nbcm93SW5kZXhdW2NvbEluZGV4XT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjaGVja0JveGVzKCl7XHJcbiAgICAgICAgZm9yIChsZXQgYm94SW5kZXggPSAwOyBib3hJbmRleCA8IDk7IGJveEluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgYm94ZXM9VG9vbGtpdC5ib3guZ2V0Qm94Q2VsbHModGhpcy5fbWF0cml4LGJveEluZGV4KTtcclxuICAgICAgICAgICAgY29uc3QgbWFya3M9Y2hlY2tBcnJheShib3hlcyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNlbGxJbmRleCA9IDA7IGNlbGxJbmRleCA8IDk7IGNlbGxJbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighbWFya3NbY2VsbEluZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByb3dJbmRleCAsIGNvbEluZGV4IH0gPSBUb29sa2l0LmJveC5jb252ZXJ0RnJvbUJveEluZGV4KGJveEluZGV4LGNlbGxJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeE1hcmtzW3Jvd0luZGV4XVtjb2xJbmRleF09ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG59XHJcbiIsIi8v55Sf5oiQ5pWw54us6Kej5Yaz5pa55qGIXHJcbmNvbnN0IFRvb2xraXQ9cmVxdWlyZShcIi4vdG9vbGtpdFwiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPSBjbGFzcyBHZW5lcmF0b3J7XHJcblxyXG4gICAgZ2VuZXJhdGUoKXtcclxuICAgICAgICB3aGlsZSghdGhpcy5pbnRlcm5hbEdlbmVyYXRlKCkpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpbnRlcm5hbEdlbmVyYXRlKCl7XHJcbiAgICAgICAgdGhpcy5tYXRyaXg9VG9vbGtpdC5tYXRyaXgubWFrZU1hdHJpeCgpO1xyXG4gICAgICAgIHRoaXMub3JkZXJzPVRvb2xraXQubWF0cml4Lm1ha2VNYXRyaXgoKVxyXG4gICAgICAgICAgICAubWFwKHJvdz0+cm93Lm1hcCgodixpKT0+aSkpXHJcbiAgICAgICAgICAgIC5tYXAocm93PT5Ub29sa2l0Lm1hdHJpeC5zaHVmZmxlKHJvdykpOy8v55Sf5oiQ6ZqP5py65bqP5YiX55qE55+p6Zi1XHJcblxyXG5cclxuICAgICAgICBmb3IobGV0IG49MTtuPD05O24rKyl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmZpbGxOdW1iZXIobikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmaWxsTnVtYmVyKG4pe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGxSb3cobiwwKTtcclxuICAgIH1cclxuXHJcbiAgICBmaWxsUm93KG4scm93SW5kZXgpe1xyXG4gICAgICAgIGlmKHJvd0luZGV4Pjgpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByb3c9dGhpcy5tYXRyaXhbcm93SW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG9yZGVycz10aGlzLm9yZGVyc1tyb3dJbmRleF07XHJcblxyXG5cclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTw5O2krKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbEluZGV4PW9yZGVyc1tpXTtcclxuICAgICAgICAgICAgLy/lpoLmnpzov5nkuKrkvY3nva7lt7Lnu4/mnInlgLzvvIzot7Pov4dcclxuICAgICAgICAgICAgaWYocm93W2NvbEluZGV4XSl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/mo4Dmn6Xov5nkuKrkvY3nva7mmK/lkKblj6/ku6XloatuXHJcbiAgICAgICAgICAgIGlmKCFUb29sa2l0Lm1hdHJpeC5jaGVja0ZpbGxhYmxlKHRoaXMubWF0cml4LG4scm93SW5kZXgsY29sSW5kZXgpKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd1tjb2xJbmRleF09bjtcclxuXHJcblxyXG4gICAgICAgICAgICAvL+WOu+S4i+S4gOihjOWhq+WGmW4s5aaC5p6c5rKh5aGr6L+b5Y6777yM5bCx57un57ut5a+75om+5b2T5YmN6KGM5LiL5LiA5Liq5L2N572uXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmZpbGxSb3cobixyb3dJbmRleCsxKSl7XHJcbiAgICAgICAgICAgICAgICByb3dbY29sSW5kZXhdPTA7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiIsIi8v55Sf5oiQ5pWw54us5ri45oiPXHJcbi8vMeOAgueUn+aIkOWujOaVtOeahOino+WGs+aWueahiO+8m0dlbmVyYXRvclxyXG4vLzIu6ZqP5py65Y676Zmk6YOo5YiG5pWw5o2u77yM5oyJ5q+U5L6LXHJcblxyXG5cclxuY29uc3QgR2VuZXJhdG9yID0gcmVxdWlyZShcIi4vZ2VuZXJhdG9yXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTdWRva3Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgLy/nlJ/miJDlrozmlbTnmoTop6PlhrPmlrnmoYhcclxuICAgICAgICBjb25zdCBnZW5lcmF0b3I9bmV3IEdlbmVyYXRvcigpO1xyXG4gICAgICAgIGdlbmVyYXRvci5nZW5lcmF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc29sdXRpb25NYXRyaXg9IGdlbmVyYXRvci5tYXRyaXg7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtYWtlKGxldmVsPTUpe1xyXG4gICAgICAgIC8vY29uc3Qgc2hvdWxkUmlkPU1hdGgucmFuZG9tKCkqOSA8bGV2ZWxcclxuICAgICAgICAvL+eUn+aIkOiwnOebmFxyXG5cclxuICAgICAgICB0aGlzLnB1enpsZU1hdHJpeD0gdGhpcy5zb2x1dGlvbk1hdHJpeC5tYXAocm93PT57XHJcbiAgICAgICAgICAgIHJldHVybiByb3cubWFwKGNlbGw9PiBNYXRoLnJhbmRvbSgpKjkgPGxldmVsID8gMCA6Y2VsbCApO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJjb25zdCBtYXRyaXhUb29sa2l0PXtcclxuICAgIG1ha2VSb3codj0wKXtcclxuICAgICAgICBjb25zdCBhcnJheT1uZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgYXJyYXkuZmlsbCh2KTtcclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH0sLy/nlJ/miJDooYxcclxuICAgIFxyXG4gICAgXHJcbiAgICBtYWtlTWF0cml4KHY9MCl7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oe2xlbmd0aDo5fSwoKT0+dGhpcy5tYWtlUm93KHYpKVxyXG4gICAgfSwvL+eUn+aIkOS6jOe7tOaVsOe7hFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOeUn+aIkOa0l+eJjOeul+azlVxyXG4gICAgICovXHJcbiAgICBzaHVmZmxlKGFycmF5KXtcclxuICAgICAgICBjb25zdCBlbmRJbmRleD1hcnJheS5sZW5ndGgtMjtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPD1lbmRJbmRleDtpKyspe1xyXG4gICAgICAgICAgICBjb25zdCBqPWkrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihhcnJheS5sZW5ndGgtaSkpO1xyXG4gICAgICAgICAgICBbYXJyYXlbaV0sYXJyYXlbal1dPVthcnJheVtqXSxhcnJheVtpXV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeWItuWumuS9jee9ruWPr+S7peWhq+WGmeaVsOWtl25cclxuICAgICAqL1xyXG4gICAgY2hlY2tGaWxsYWJsZShtYXRyaXgsbixyb3dJbmRleCxjb2xJbmRleCl7XHJcbiAgICAgICAgY29uc3Qgcm93PW1hdHJpeFtyb3dJbmRleF07Ly/ojrflj5booYzmlbDmja5cclxuICAgICAgICBjb25zdCBjb2x1bW49dGhpcy5tYWtlUm93KCkubWFwKCh2LGkpPT5tYXRyaXhbaV1bY29sSW5kZXhdKTsvL+iOt+WPluWIl+aVsOaNrlxyXG4gICAgICAgIGNvbnN0IHsgYm94SW5kZXggfT1ib3hUb29sa2l0LmNvbnZlcnRUb0JveEluZGV4KHJvd0luZGV4LGNvbEluZGV4KTtcclxuICAgICAgICBjb25zdCBib3g9Ym94VG9vbGtpdC5nZXRCb3hDZWxscyhtYXRyaXgsYm94SW5kZXgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGk9MDtpPDk7aSsrKXtcclxuICAgICAgICAgICAgaWYocm93W2ldPT1uIHx8IGNvbHVtbltpXT09biB8fCBib3hbaV09PW4pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiDlrqvlnZDmoIfns7vnmoTlt6XlhbdcclxuICovXHJcbmNvbnN0IGJveFRvb2xraXQ9e1xyXG5cclxuICAgIGdldEJveENlbGxzKG1hdHJpeCxib3hJbmRleCl7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRSb3dJbmRleD1NYXRoLmZsb29yKGJveEluZGV4LzMpKjM7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRDb2xJbmRleD1ib3hJbmRleCUzKjM7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0PVtdO1xyXG4gICAgICAgIGZvcihsZXQgY2VsbEluZGV4PTA7Y2VsbEluZGV4PDk7Y2VsbEluZGV4Kyspe1xyXG4gICAgICAgICAgICBjb25zdCByb3dJbmRleD1zdGFydFJvd0luZGV4K01hdGguZmxvb3IoY2VsbEluZGV4LzMpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xJbmRleD1zdGFydENvbEluZGV4K2NlbGxJbmRleCUzO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChtYXRyaXhbcm93SW5kZXhdW2NvbEluZGV4XSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwvL+WPluWHuuWuq+eahOaVsOaNrlxyXG5cclxuXHJcbiAgICBjb252ZXJ0VG9Cb3hJbmRleChyb3dJbmRleCxjb2xJbmRleCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYm94SW5kZXg6TWF0aC5mbG9vcihyb3dJbmRleC8zKSozKyBNYXRoLmZsb29yKGNvbEluZGV4LzMpLFxyXG4gICAgICAgICAgICBjb2xJbmRleDpyb3dJbmRleCAlIDMgKiAzK2NvbEluZGV4ICUgM1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29udmVydEZyb21Cb3hJbmRleChib3hJbmRleCxjZWxsSW5kZXgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvd0luZGV4Ok1hdGguZmxvb3IoYm94SW5kZXgvMykqMysgTWF0aC5mbG9vcihjZWxsSW5kZXgvMyksXHJcbiAgICAgICAgICAgIGNvbEluZGV4OmJveEluZGV4ICUgMyAqIDMrY2VsbEluZGV4ICUgM1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1jbGFzcyBUb29sa2l0e1xyXG4gICAgc3RhdGljIGdldCBtYXRyaXgoKXtcclxuICAgICAgICByZXR1cm4gbWF0cml4VG9vbGtpdFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBib3goKXtcclxuICAgICAgICByZXR1cm4gYm94VG9vbGtpdFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJjb25zdCBHcmlkPXJlcXVpcmUoXCIuL3VpL2dyaWRcIik7XHJcbmNvbnN0IFBvcHVwTnVtYmVycyA9IHJlcXVpcmUoJy4vdWkvcG9wdXBudW1iZXJzJyk7XHJcblxyXG5jb25zdCBncmlkPW5ldyBHcmlkKCQoXCIjY29udGFpbmVyXCIpKTtcclxuZ3JpZC5idWlsZCgpO1xyXG5ncmlkLmxheW91dCgpOy8v6LCD5pW05a696auY5ZKM5qC35byPXHJcblxyXG5cclxuXHJcbmNvbnN0IHBvcHVwTnVtYmVycz1uZXcgUG9wdXBOdW1iZXJzKCQoXCIjcG9wdXBOdW1iZXJzXCIpKTtcclxuZ3JpZC5iaW5kUG9wdXAocG9wdXBOdW1iZXJzKVxyXG5cclxuXHJcblxyXG4vL+e7keWumuaMiemSrlxyXG5cclxuJCgnI2NoZWNrJykub24oXCJjbGlja1wiLGU9PnsgXHJcbiAgICBpZihncmlkLmNoZWNrKCkpe1xyXG4gICAgICAgIGFsZXJ0KCfmiJDlip8nKTtcclxuICAgIH1cclxuICBcclxufSk7XHJcbiQoJyNyZXNldCcpLm9uKFwiY2xpY2tcIixlPT57XHJcbiAgICBncmlkLnJlc2V0KCk7XHJcbiB9KTtcclxuJCgnI2NsZWFyJykub24oXCJjbGlja1wiLGU9PntcclxuICAgIGdyaWQuY2xlYXIoKTtcclxuIH0pO1xyXG4kKCcjcmVidWlsZCcpLm9uKFwiY2xpY2tcIixlPT57XHJcbiAgICBncmlkLnJlYnVpbGQoKTtcclxuIH0pO1xyXG5cclxuIiwiLy/nlJ/miJDkuZ3lrqvmoLxcclxuY29uc3QgVG9vbGtpdD1yZXF1aXJlKFwiLi4vY29yZS90b29sa2l0XCIpO1xyXG5jb25zdCBTdWRva3U9cmVxdWlyZShcIi4uL2NvcmUvc3Vkb2t1XCIpO1xyXG5jb25zdCBDaGVja2VyPXJlcXVpcmUoXCIuLi9jb3JlL2NoZWNrZXJcIik7XHJcblxyXG5cclxuXHJcbmNsYXNzIEdyaWR7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpe1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXI9Y29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgYnVpbGQoKXtcclxuXHJcbiAgICAgICAgY29uc3Qgc3Vkb2t1PSBuZXcgU3Vkb2t1KCk7XHJcbiAgICAgICAgc3Vkb2t1Lm1ha2UoKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF0cml4PXN1ZG9rdS5wdXp6bGVNYXRyaXg7XHJcbiAgICAgICAgY29uc3Qgcm93R3JvdXBDbGFzc2VzPVtcInJvd19nX3RvcFwiLFwicm93X2dfbWlkZGxlXCIsXCJyb3dfZ19ib3R0b21cIl07XHJcbiAgICAgICAgY29uc3QgY29sR3JvdXBDbGFzc2VzPVtcImNvbF9nX2xlZnRcIixcImNvbF9nX2NlbnRlclwiLFwiY29sX2dfcmlnaHRcIl07XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGNvbnN0ICRjZWxscz1tYXRyaXgubWFwKHJvd1ZhbHVlcz0+cm93VmFsdWVzLm1hcCgoY2VsbFZhbHVlLGNvbEluZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gICQoJzxzcGFuPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGNvbEdyb3VwQ2xhc3Nlc1tjb2xJbmRleCUzXSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2VsbFZhbHVlID8gXCJmaXhlZFwiIDogJ2VtcHR5JylcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChjZWxsVmFsdWUpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGNvbnN0ICRkaXZBcnJheT0kY2VsbHMubWFwKCgkc3BhbkFycmF5LHJvd0luZGV4KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gJCgnPGRpdj4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcInJvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhyb3dHcm91cENsYXNzZXNbcm93SW5kZXglM10pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkc3BhbkFycmF5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXIuYXBwZW5kKCRkaXZBcnJheSk7XHJcbiAgICB9XHJcbiAgICBsYXlvdXQoKXtcclxuICAgICAgICBjb25zdCB3aWR0aD0kKCdzcGFuOmZpcnN0Jyx0aGlzLl8kY29udGFpbmVyKS53aWR0aCgpO1xyXG4gICAgICAgICQoJ3NwYW4nLHRoaXMuXyRjb250YWluZXIpXHJcbiAgICAgICAgICAgIC5oZWlnaHQod2lkdGgpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgXCJsaW5lLWhlaWdodFwiOmAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6d2lkdGg8MzIgPyBgJHt3aWR0aC8yfXB4YDonJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKCl7XHJcbiAgICAgICAgY29uc3QgJHJvd3M9dGhpcy5fJGNvbnRhaW5lci5jaGlsZHJlbigpO1xyXG4gICAgICAgIGNvbnN0IGRhdGE9ICRyb3dzLm1hcCgocm93SW5kZXgsZGl2KT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gJChkaXYpLmNoaWxkcmVuKCkubWFwKChjb2xJbmRleCxzcGFuKT0+cGFyc2VJbnQoJChzcGFuKS50ZXh0KCkpIHx8IDApO1xyXG4gICAgICAgIH0pLnRvQXJyYXkoKVxyXG4gICAgICAgIC5tYXAoJGRhdGE9PiRkYXRhLnRvQXJyYXkoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tlcj0gbmV3IENoZWNrZXIoZGF0YSk7XHJcbiAgICAgICAgaWYoY2hlY2tlci5jaGVjaygpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5qOA5p+l5LiN5oiQ5Yqf6L+b6KGM5qCH6K6wXHJcbiAgICAgICAgY29uc3QgbWFya3M9Y2hlY2tlci5tYXRyaXhNYXJrcztcclxuICAgICAgICB0aGlzLl8kY29udGFpbmVyLmNoaWxkcmVuKClcclxuICAgICAgICAgICAgLmVhY2goKHJvd0luZGV4LGRpdik9PntcclxuICAgICAgICAgICAgICAgICQoZGl2KS5jaGlsZHJlbigpLmVhY2goKGNvbEluZGV4LHNwYW4pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHNwYW49JChzcGFuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZigkc3Bhbi5pcyhcIi5maXhlZFwiKSB8fCBtYXJrc1tyb3dJbmRleF1bY29sSW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNwYW4ucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzcGFuLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5fJGNvbnRhaW5lci5maW5kKFwic3Bhbjpub3QoLmZpeGVkKVwiKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJlcnJvciBtYXJrMSBtYXJrMlwiKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2VtcHR5JylcclxuICAgICAgICAgICAgLnRleHQoMCk7XHJcbiAgICB9XHJcbiAgICBjbGVhcigpe1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXIuZmluZChcInNwYW4uZXJyb3JcIikucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlYnVpbGQoKXtcclxuICAgICAgICB0aGlzLl8kY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgICAgdGhpcy5idWlsZCgpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGJpbmRQb3B1cChwb3B1cE51bWJlcnMpe1xyXG4gICAgICAgIHRoaXMuXyRjb250YWluZXIub24oXCJjbGlja1wiLFwic3BhblwiLGU9PntcclxuICAgICAgICAgICAgY29uc3QgJGNlbGw9JChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmKCRjZWxsLmlzKCcuZml4ZWQnKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9wdXBOdW1iZXJzLnBvcHVwKCRjZWxsKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1HcmlkOyIsIi8v5aSE55CG5by55Ye655qE5pON5L2c6Z2i5p2/XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFBvcHVwTnVtYmVycyB7XHJcbiAgICBjb25zdHJ1Y3RvcigkcGFuZWwpe1xyXG4gICAgICAgIHRoaXMuXyRwYW5lbD0kcGFuZWwuaGlkZSgpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLl8kcGFuZWwub24oJ2NsaWNrJyxcInNwYW5cIixlPT57XHJcbiAgICAgICAgICAgIGNvbnN0ICRjZWxsPXRoaXMuXyR0YXJnZXRDZWxsO1xyXG4gICAgICAgICAgICBjb25zdCAkc3Bhbj0kKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmKCRzcGFuLmhhc0NsYXNzKCdtYXJrMScpKXtcclxuICAgICAgICAgICAgICAgIC8v5Zue5aGr5qC35byPXHJcbiAgICAgICAgICAgICAgICBpZigkY2VsbC5oYXNDbGFzcygnbWFyazEnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNlbGwucmVtb3ZlQ2xhc3MoJ21hcmsxJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkY2VsbC5yZW1vdmVDbGFzcygnbWFyazInKS5hZGRDbGFzcygnbWFyazEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKCRzcGFuLmhhc0NsYXNzKCdtYXJrMicpKXtcclxuICAgICAgICAgICAgICAgIC8v5Zue5aGr5qC35byPXHJcbiAgICAgICAgICAgICAgICBpZigkY2VsbC5oYXNDbGFzcygnbWFyazInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNlbGwucmVtb3ZlQ2xhc3MoJ21hcmsyJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkY2VsbC5yZW1vdmVDbGFzcygnbWFyazEnKS5hZGRDbGFzcygnbWFyazInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKCRzcGFuLmhhc0NsYXNzKCdlbXB0eScpKXtcclxuICAgICAgICAgICAgICAgICRjZWxsLnRleHQoMCkuYWRkQ2xhc3MoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgICAvL+WPlua2iOaVsOWtl+WSjOagt+W8j1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5Zue5aGr5pWw5a2XXHJcbiAgICAgICAgICAgICAgICAkY2VsbC5yZW1vdmVDbGFzcygnZW1wdHknKS50ZXh0KCRzcGFuLnRleHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrprkuYnkvY3nva5cclxuICAgICAqL1xyXG4gICAgcG9wdXAoJGNlbGwpe1xyXG4gICAgICAgIHRoaXMuXyR0YXJnZXRDZWxsPSRjZWxsOyBcclxuICAgICAgICBjb25zdCB7IGxlZnQgLCB0b3AgfSA9JGNlbGwucG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLl8kcGFuZWwuY3NzKHtcclxuICAgICAgICAgICAgbGVmdDpgJHtsZWZ0fXB4YCxcclxuICAgICAgICAgICAgdG9wOmAke3RvcH1weGBcclxuICAgICAgICB9KS5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICAvL+makOiXj+mdouadv1xyXG4gICAgaGlkZSgpe1xyXG4gICAgICAgIHRoaXMuXyRwYW5lbC5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG59OyJdLCJzb3VyY2VSb290IjoiIn0=