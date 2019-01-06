(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/game_of_life.js":
/*!******************************!*\
  !*** ../pkg/game_of_life.js ***!
  \******************************/
/*! exports provided: __wbg_error_cc95a3d302735ca3, __wbg_random_2cc0c8d054a5c72a, Universe, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_cc95a3d302735ca3\", function() { return __wbg_error_cc95a3d302735ca3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_2cc0c8d054a5c72a\", function() { return __wbg_random_2cc0c8d054a5c72a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_of_life_bg */ \"../pkg/game_of_life_bg.wasm\");\n/* tslint:disable */\n\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbg_error_cc95a3d302735ca3(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n\n    varg0 = varg0.slice();\n    _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](arg0, arg1 * 1);\n\n    console.error(varg0);\n}\n\nfunction __wbg_random_2cc0c8d054a5c72a() {\n    return Math.random();\n}\n\nfunction freeUniverse(ptr) {\n\n    _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n}\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeUniverse(ptr);\n    }\n\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {Universe}\n    */\n    static new(arg0, arg1) {\n        return Universe.__wrap(_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"](arg0, arg1));\n    }\n    /**\n    * @returns {void}\n    */\n    tick() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_width\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_height\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    toggle_cell(arg0, arg1) {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_toggle_cell\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @returns {void}\n    */\n    clear_cells() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_clear_cells\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    create_glider(arg0, arg1) {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_create_glider\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    create_pulsar(arg0, arg1) {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_create_pulsar\"](this.ptr, arg0, arg1);\n    }\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///../pkg/game_of_life.js?");

/***/ }),

/***/ "../pkg/game_of_life_bg.wasm":
/*!***********************************!*\
  !*** ../pkg/game_of_life_bg.wasm ***!
  \***********************************/
/*! exports provided: memory, __wbg_universe_free, universe_new, universe_tick, universe_width, universe_height, universe_cells, universe_toggle_cell, universe_clear_cells, universe_create_glider, universe_create_pulsar, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./game_of_life */ \"../pkg/game_of_life.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/game_of_life_bg.wasm?");

/***/ }),

/***/ "./src/fps.js":
/*!********************!*\
  !*** ./src/fps.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new class {\n  constructor() {\n    this.fps = document.getElementById('fps');\n    this.frames = [];\n    this.lastFrameTimeStamp = performance.now();\n  }\n\n  render() {\n    // Convert the delta time since the last frame render into a measure\n    // of frames per second.\n    const now = performance.now();\n    const delta = now - this.lastFrameTimeStamp;\n    this.lastFrameTimeStamp = now;\n    const fps = (1 / delta) * 1000;\n\n    // Save only the latest 100 timings.\n    this.frames.push(fps);\n    if (this.frames.length > 100) {\n      this.frames.shift();\n    }\n\n    // Find the max, min, and mean of our 100 latest timings.\n    let min = Infinity;\n    let max = -Infinity;\n    let sum = 0;\n    for (const frame of this.frames) {\n      sum += frame;\n      min = Math.min(frame, min);\n      max = Math.max(frame, max);\n    }\n    let mean = sum / this.frames.length;\n\n    // Render the statistics.\n    this.fps.textContent = `\nFrames per Second:\n         latest = ${Math.round(fps)}\navg of last 100 = ${Math.round(mean)}\nmin of last 100 = ${Math.round(min)}\nmax of last 100 = ${Math.round(max)}\n`.trim();\n  }\n});\n\n\n//# sourceURL=webpack:///./src/fps.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var game_of_life_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! game-of-life/game_of_life_bg */ \"../pkg/game_of_life_bg.wasm\");\n/* harmony import */ var game_of_life__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! game-of-life */ \"../pkg/game_of_life.js\");\n/* harmony import */ var _fps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fps */ \"./src/fps.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst SIZE = 128;\n\nconst CELL_SIZE = 5;\nconst CELL_COLOR = '#000';\n\n// Construct the universe, and get its width and height.\nlet universe = game_of_life__WEBPACK_IMPORTED_MODULE_1__[\"Universe\"].new(SIZE, SIZE);\nconst width = universe.width();\nconst height = universe.height();\n\n// Give the canvas room for all of our cells and a 1px border\n// around each of them.\nconst canvas = document.getElementById('game-of-life-canvas');\ncanvas.height = (CELL_SIZE + 1) * height + 1;\ncanvas.width = (CELL_SIZE + 1) * width + 1;\n\nconst ctx = canvas.getContext('2d');\n\n// Adjust the speed\nconst tickRange = document.getElementById('tick-range');\nlet interval = 1000 / tickRange.value;\nlet then = Date.now();\n\ntickRange.addEventListener('input', event => {\n  interval = 1000 / event.target.value;\n});\n\nlet animationId = null;\n\nconst renderLoop = () => {\n  animationId = requestAnimationFrame(renderLoop);\n\n  const now = Date.now();\n  const delta = now - then;\n  if (delta < interval) return;\n  then = now - (delta % interval);\n  _fps__WEBPACK_IMPORTED_MODULE_2__[\"default\"].render();\n\n  universe.tick();\n\n  drawCells();\n};\n\n// Play and pause simulation\nconst playPauseButton = document.getElementById('play-pause');\n\nconst play = () => {\n  playPauseButton.textContent = playPauseButton.dataset.pause;\n  renderLoop();\n};\n\nconst pause = () => {\n  playPauseButton.textContent = playPauseButton.dataset.play;\n  cancelAnimationFrame(animationId);\n  animationId = null;\n};\n\nplayPauseButton.addEventListener('click', _ => {\n  if (isPaused()) {\n    play();\n  } else {\n    pause();\n  }\n});\n\nconst isPaused = () => animationId === null;\n\n// Reset simulation\nconst resetButton = document.getElementById('reset');\nresetButton.addEventListener('click', () => {\n  universe = game_of_life__WEBPACK_IMPORTED_MODULE_1__[\"Universe\"].new(SIZE, SIZE);\n  drawCells();\n});\n\n// Blank canvas\nconst blankButton = document.getElementById('blank');\nblankButton.addEventListener('click', () => {\n  universe.clear_cells();\n  drawCells();\n});\n\nconst getIndex = (row, column) => {\n  return row * width + column;\n};\n\nconst drawCells = () => {\n  const cellsPtr = universe.cells();\n  const cells = new Uint8Array(game_of_life_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer, cellsPtr, (width * height) / 8);\n\n  ctx.clear();\n  ctx.beginPath();\n\n  ctx.fillStyle = CELL_COLOR;\n  for (let row = 0; row < height; row++) {\n    for (let col = 0; col < width; col++) {\n      const idx = getIndex(row, col);\n      if (!bitOfArray(cells, idx)) {\n        continue;\n      }\n\n      ctx.fillRect(\n        col * (CELL_SIZE + 1) + 1,\n        row * (CELL_SIZE + 1) + 1,\n        CELL_SIZE,\n        CELL_SIZE\n      );\n    }\n  }\n\n  ctx.stroke();\n};\n\nconst bitOfArray = (array, index) => {\n  const mask = 1 << index % 8;\n  return (array[Math.floor(index / 8)] & mask) == mask;\n};\n\ncanvas.addEventListener('click', event => {\n  const boundingRect = canvas.getBoundingClientRect();\n\n  const scaleX = canvas.width / boundingRect.width;\n  const scaleY = canvas.height / boundingRect.height;\n\n  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;\n  const canvasTop = (event.clientY - boundingRect.top) * scaleY;\n\n  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);\n  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);\n\n  switch (true) {\n    case event.shiftKey:\n      universe.create_pulsar();\n      break;\n    case event.ctrlKey:\n      universe.create_glider();\n      break;\n    default:\n      universe.toggle_cell(row, col);\n  }\n\n  drawCells();\n});\n\nplay();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("CanvasRenderingContext2D.prototype.clear =\n  CanvasRenderingContext2D.prototype.clear ||\n  function(preserveTransform = false) {\n    if (preserveTransform) {\n      this.save();\n      this.setTransform(1, 0, 0, 1, 0, 0);\n    }\n\n    this.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n    if (preserveTransform) {\n      this.restore();\n    }\n  };\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

}]);