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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = initEditors;
/* unused harmony export initEditor */
/* harmony export (immutable) */ __webpack_exports__["b"] = setEditorsContent;
/* harmony export (immutable) */ __webpack_exports__["c"] = getEditorsContent;
/* harmony export (immutable) */ __webpack_exports__["d"] = replaceGridDefinition;


const REGEX_GRID_KISS_DEFINITION = /grid-kiss:[^};]+/;

const
	input          = document.querySelector("#input"),
	html           = document.querySelector("#html"),
	cssEditor      = ace.edit(input),
	htmlEditor     = ace.edit(html);

function initEditors(){
	cssEditor.on("input", __WEBPACK_IMPORTED_MODULE_0__main__["update"]);
	htmlEditor.on("input", __WEBPACK_IMPORTED_MODULE_0__main__["update"]);

	initEditor(cssEditor, "css");
	initEditor(htmlEditor, "html");
}

function initEditor(editor, mode){
	editor.setTheme("ace/theme/textmate");
	editor.getSession().setMode(`ace/mode/${mode}`);
	editor.getSession().setOption("useWorker", false); // disable syntax checking since it is not customizable
	editor.setShowPrintMargin(false);
	editor.setHighlightActiveLine(false);
	editor.setFontSize(16);
	editor.$blockScrolling = Infinity;
}

function setEditorsContent({ css, html }){
	cssEditor.setValue(css, -1);
	htmlEditor.setValue(html, -1);
}

function getEditorsContent() {
	return {
		html: htmlEditor.getValue(),
		css: cssEditor.getValue()
	}
}

function replaceGridDefinition(newDefinition){
	let css = cssEditor.getValue();
	if(REGEX_GRID_KISS_DEFINITION.test(css)){
		css = css.replace(REGEX_GRID_KISS_DEFINITION, `grid-kiss: ${newDefinition}`);
	} else {
		css = `body {
	grid-kiss: ${newDefinition}
}`;
	}
	cssEditor.setValue(css, -1);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__presets__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ocr__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["update"] = update;
/* global ace, postcss, gridkiss */




let processor;

const
	input          = document.querySelector("#input"),
	output         = document.querySelector("#output"),
	demo           = document.querySelector("#demo"),
	html           = document.querySelector("#html"),
	optionsInputs  = [...document.querySelectorAll(".options input[type='checkbox']")],
	presetSelector = document.querySelector("select.presets"),
	ocrButton    = document.querySelector("#ocr-button");

ocrButton.addEventListener("click", __WEBPACK_IMPORTED_MODULE_2__ocr__["a" /* openOCR */]);

for (let option of optionsInputs) {
	option.addEventListener("change", updateOptions);
}

function init(){
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__editor__["a" /* initEditors */])();

	presetSelector.innerHTML = __WEBPACK_IMPORTED_MODULE_0__presets__["a" /* default */].map((preset, index) => `<option value=${index}>${preset.name}</option>`);
	presetSelector.addEventListener("change", () => {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__editor__["b" /* setEditorsContent */])(__WEBPACK_IMPORTED_MODULE_0__presets__["a" /* default */][presetSelector.value]);
		update();
	});

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__editor__["b" /* setEditorsContent */])(__WEBPACK_IMPORTED_MODULE_0__presets__["a" /* default */][0]);
	updateProcessor();
	update();
}

function updateOptions(){
	const options = {};
	for(let checkbox of optionsInputs){
		options[checkbox.parentElement.textContent.trim()] = checkbox;
	}
	updateProcessor();
}

function updateProcessor(){
	const options = {};
	for(let checkbox of optionsInputs){
		options[checkbox.parentElement.textContent.trim()] = checkbox.checked;
	}
	processor = postcss([ gridkiss(options) ]);
	update();
}

function update(){
	let { html, css } = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__editor__["c" /* getEditorsContent */])();
	demo.contentDocument.body.innerHTML = html;
	processor.process(css)
		.then(result => {
			output.textContent = result.css;
			const warnings = result.warnings().map(w => `<p class='warning'>${w.toString()}</p>`)
			if(warnings && warnings.length > 0){
				output.innerHTML = warnings.join('\n') + output.innerHTML;
			}
			setTimeout(() => {
				demo.contentDocument.querySelector("#css_injected").textContent = output.textContent;
			}, 10);
		})
		.catch(error => {
			output.innerHTML = `<p class='error'>${error.stack}</p>`
		})
}

window.onload = function() {
	if (demo.contentDocument.readyState === 'complete') {
		init();
	} else {
		demo.onload = init;
	}
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = openOCR;
/* global Tesseract */



const ocrContainer   = document.querySelector("#ocr-container"),
      ocrProgress    = ocrContainer.querySelector("progress"),
      ocrMessage     = ocrContainer.querySelector("#ocr-status"),
      ocrOutput      = ocrContainer.querySelector("textarea"),
      cameraVideo    = ocrContainer.querySelector('#camera-video'),
      cameraPhoto    = ocrContainer.querySelector('#camera-photo'),
      photoButton    = ocrContainer.querySelector('#photo-btn'),
      validateButton = ocrContainer.querySelector('#validate-ocr-btn');

cameraVideo.addEventListener('canplay', function(){
	let width = 320;
	let height = cameraVideo.videoHeight / (cameraVideo.videoWidth / width);
	cameraVideo.setAttribute('width', width.toFixed(0));
	cameraVideo.setAttribute('height', height.toFixed(0));
	cameraPhoto.setAttribute('width', width.toFixed(0));
	cameraPhoto.setAttribute('height', height.toFixed(0));
}, false);

photoButton.addEventListener('click', function(ev){
	takePicture();
	ev.preventDefault();
}, false);

validateButton.addEventListener('click', ev => {
	ocrContainer.hidden = true;
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__editor__["d" /* replaceGridDefinition */])(ocrOutput.value);
	ev.preventDefault();
}, false);

function openOCR(){
	ocrContainer.hidden = false;
	ocrMessage.textContent = "Use your webcam to take a picture of the desired layout";

	navigator.getUserMedia({ video: true, audio: false },
		stream =>  {
			cameraVideo.src = URL.createObjectURL(stream);
			cameraVideo.play();
		},
		err => {
			console.error(err);
			alert("An error occured! " + err)
		}
	);
}

function takePicture() {
	let width = parseInt(cameraVideo.getAttribute("width"));
	let height = parseInt(cameraVideo.getAttribute("height"));
	cameraPhoto.width = width;
	cameraPhoto.height = height;
	cameraPhoto.getContext('2d').drawImage(cameraVideo, 0, 0, width, height);
	readOCR();
}

function readOCR(){
	ocrProgress.value = 0;
	ocrMessage.textContent = "Please wait...";
	ocrContainer.querySelector("p").textContent = "Please wait...";

	Tesseract.recognize(cameraPhoto)
		.progress(({ status, progress }) => {
			console.log('progress', status, progress);
			ocrMessage.textContent = status;
			if(Number.isFinite(progress)){ ocrProgress.value = progress; }
		})
		.then((result) => {
			console.log('result', result)
			let output = result.text
				.split('\n')
				.map(line => `\n\t"${line}"`)
				.join('\n');
			ocrMessage.textContent = "Finished !";
			ocrOutput.value = output;
		})
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function format([str]){
	return str.trim();
}

const presets = [

	{
		name: "Basic website layout",
		html: format`
<header>
	Header
</header>

<aside class="sidebar">
	Sidebar
</aside>

<main>
	Main content
</main>

<footer>
	Footer
</footer>
		`,
		css: format`
body {
	grid-kiss:
		"+------------------------------+      "
		"|           header ↑           | 120px"
		"+------------------------------+      "
		"                                      "
		"+--150px---+  +----- auto -----+      "
		"| .sidebar |  |      main      | auto "
		"+----------+  +----------------+      "
		"                                      "
		"+------------------------------+      "
		"|              ↓               |      "
		"|         → footer ←           | 60px "
		"+------------------------------+      "
}

header   { background: cyan; }
.sidebar { background: lime; }
main     { background: yellow; }
footer   { background: pink; }
`
	},

	{
		name: "Zones on multiple rows and cols ; alternative style #1",
		css: format`
#grid {
    grid-kiss:        
    "┌──────┐ ┌─────────────┐       "
    "│      │ │             │ 100px "
    "│   ↑  │ │    .bar     │       "
    "│ .baz │ └─────────────┘   -   "
    "│   ↓  │ ┌────┐ ┌──────┐       "
    "│      │ |    | │  ↑   │ 100px "
    "└──────┘ └────┘ │      │       "
    "┌─────────────┐ │ .foo │   -   "
    "│     .qux    │ │  ↓   │       "
    "│             │ │      │ 100px "
    "└─────────────┘ └──────┘       "
    "  100px | 100px | 100px        "
    ;  
}

#grid > div {
    border:2px solid black;
    background-color: #ccc;
    padding: 0.5em;
}

#container {    
    width: 400px;
    height: 400px;
    padding: 1em;
}    
`,

		html: format`
<div id="container">
	<div id="grid">
		<div class="foo">Foo</div>
		<div class="bar">Bar</div>
		<div class="baz">Baz</div>
		<div class="qux">Qux</div>
	</div>	
</div>
`

	},

	{
		name: "Variable fractions of free space ; alternate style #2",

		css: format`
body {
	grid-kiss:
	"╔═10═╗                  ╔═10═╗    "
	"║ .a>║                  ║<.b ║ 3fr"
	"╚════╝                  ╚════╝    "
	"      ╔═20═╗      ╔═20═╗          "
	"      ║ .c ║      ║ .d ║       5fr"
	"      ╚════╝      ╚════╝          "
	"            ╔═30═╗                "
	"            ║ .e ║             7fr"
	"            ╚════╝                "
}

div {   
   background: #eee;
   border: 1px solid #999;
   padding: 1em;
}`,

		html: `
<div class="a">a</div>
<div class="b">b</div>
<div class="c">c</div>
<div class="d">d</div>
<div class="e">e</div>
`

	},

	{
		name: "Vertical and horizontal centering",

		css: format`
body {
  grid-kiss:
    "+-------+"
    "|   ↓   |"
    "|→ div ←|"
    "|   ↑   |"
    "+-------+"
}

div { 
  border: 1px solid black;
  padding: 1rem;
  overflow: scroll;
  resize: both;
}
`,

		html: `<div> Resize me </div>`
	},

	{
		name: "Responsive layout with media queries",

		css: format`
body {
  grid-kiss:
    "+----------+      "
    "|  header  | 80px "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc1  |      "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc2  |      "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc3  |      "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc4  |      "
    "+----------+      "    
}     

@media (min-width:640px){
  body {
    grid-kiss:
    "+----------------------------+      "
    "|        header              | 120px"
    "+----------------------------+      "
    "                                    "
    "+------------+  +------------+      "
    "|   .bloc1   |  |   .bloc2   |      "
    "+------------+  +------------+      "
    "                                    "
    "+------------+  +------------+      "
    "|   .bloc3   |  |   .bloc4   |      "
    "+------------+  +------------+      "
  }
}

@media (min-width: 960px){
  body {
    grid-kiss:
    "+--------------------------------+       "
    "|             header             | 120px "
    "+--------------------------------+       "
    "                                         "
    "+--------------------------------+       "
    "|             .bloc1             | <6rem "
    "+--------------------------------+       "
    "                                         "
    "+--------+  +--------+  +--------+       "
    "| .bloc2 |  | .bloc3 |  | .bloc4 |       "
    "+--------+  +--------+  +--------+       "
  }
}	
	
header { background: yellow }
.bloc1 { background: blue }
.bloc2 { background: green }
.bloc3 { background: purple }
.bloc4 { background: chocolate }	
	
.bloc {
	text-align:center;
	color: white;
	font-size: 48px;
}	
`,

		html: format`
<header> Responsive design layout with media queries
  <br> Try to resize your browser !
</header>	
<div class="bloc bloc1">1</div>
<div class="bloc bloc2">2</div>
<div class="bloc bloc3">3</div>
<div class="bloc bloc4">4</div>
`
	},

	{
		name: "Layout with gaps",
		css: format`
body {	
	grid-kiss:		   
		   "+-----+      +-----+      +-----+  ----"
		   "| .nw |      | .n  |      | .ne | 100px"
		   "+-----+      +-----+      +-----+  ----"		   
		   "                                   50px"		   
		   "+-----+      +-----+      +-----+  ----"
		   "| .w  |      |     |      | .e  | 100px"
		   "+-----+      +-----+      +-----+  ----"
		    "                                  50px"		   
		   "+-----+      +-----+      +-----+  ----"
		   "| .sw |      | .s  |      | .se | 100px"
		   "+-----+      +-----+      +-----+  ----"
		   "|100px| 50px |100px| 50px |100px|      "
}

div {
	background: #ccc;
	border: 1px dashed black;
	text-align: center;
	line-height: 100px;
}
`,

		html: format`
<div class="n">N</div>
<div class="e">E</div>
<div class="s">S</div>
<div class="w">W</div>
<div class="ne">NE</div>
<div class="se">SE</div>
<div class="nw">NW</div>
<div class="sw">SW</div>
`
	},

	{
		name: "All the alignment options",

		css: format`
.justify-start {
	grid-kiss:
	"+---+ +---+ +---+    "
	"| a | | b | | c |    "
	"+---+ +---+ +---+    "
	"+---+ +---+ +---+    "
	"| d | | e | | f |    "
	"+---+ +---+ +---+    "
	"+---+ +---+ +---+    "
	"| g | | h | | i |    "
	"+---+ +---+ +---+    "
	" 50px  50px  50px    "
}

.justify-end {
	grid-kiss:
	"    +---+ +---+ +---+"
	"    | a | | b | | c |"
	"    +---+ +---+ +---+"
	"    +---+ +---+ +---+"
	"    | d | | e | | f |"
	"    +---+ +---+ +---+"
	"    +---+ +---+ +---+"
	"    | g | | h | | i |"
	"    +---+ +---+ +---+"
	"     50px  50px  50px"
}

.justify-center {
	grid-kiss:
	"    +---+ +---+ +---+    "
	"    | a | | b | | c |    "
	"    +---+ +---+ +---+    "
	"    +---+ +---+ +---+    "
	"    | d | | e | | f |    "
	"    +---+ +---+ +---+    "
	"    +---+ +---+ +---+    "
	"    | g | | h | | i |    "
	"    +---+ +---+ +---+    "
	"     50px  50px  50px    "
}

.justify-space-between {
	grid-kiss:
	"+---+    +---+    +---+"
	"| a |    | b |    | c |"
	"+---+    +---+    +---+"
	"+---+    +---+    +---+"
	"| d |    | e |    | f |"
	"+---+    +---+    +---+"
	"+---+    +---+    +---+"
	"| g |    | h |    | i |"
	"+---+    +---+    +---+"
	" 50px     50px     50px"
}

.justify-space-evenly {
	grid-kiss:
	"    +---+  +---+  +---+    "
	"    | a |  | b |  | c |    "
	"    +---+  +---+  +---+    "
	"    +---+  +---+  +---+    "
	"    | d |  | e |  | f |    "
	"    +---+  +---+  +---+    "
	"    +---+  +---+  +---+    "
	"    | g |  | h |  | i |    "
	"    +---+  +---+  +---+    "
	"     50px   50px   50px    "
}

.justify-space-around {
	grid-kiss:
	"  +---+    +---+    +---+  "
	"  | a |    | b |    | c |  "
	"  +---+    +---+    +---+  "
	"  +---+    +---+    +---+  "
	"  | d |    | e |    | f |  "
	"  +---+    +---+    +---+  "
	"  +---+    +---+    +---+  "
	"  | g |    | h |    | i |  "
	"  +---+    +---+    +---+  "
	"   50px     50px     50px  "
}
.align-start {
	grid-kiss:
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"                      "
}

.align-end {
	grid-kiss:
	"                      "
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
}

.align-center {
	grid-kiss:
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
}

.align-space-between {
	grid-kiss:
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
}

.align-space-evenly {
	grid-kiss:
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
}

.align-space-around {
	grid-kiss:
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"                      "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"                      "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
}

.justify-self {
	grid-kiss:
	"+-------+  +-------+  +-------+  +-------+"
	"| <  a  |  | > b < |  | c  >  |  | < d > |"
	"+-------+  +-------+  +-------+  +-------+"
}

.align-self {
	grid-kiss:
	"+-------+  +-------+  +-------+  +-------+"
	"|   ^   |  |   v   |  |       |  |   ^   |"
	"|   a   |  |   b   |  |   c   |  |   d   |"
	"|       |  |   ^   |  |   v   |  |   v   |"
	"+-------+  +-------+  +-------+  +-------+"
}

.grid {
	background-color: #CCC;
	width: 250px;
	height: 250px;
	border: 2px dotted black;
}

.grid-row {
	background-color: #CCC;
	width: 400px;
	height: 100px;
	border: 2px dotted black;
}

a,b,c,d,e,f,g,h,i {
	display: block;		
	box-sizing: border-box;
	font-style: normal;
	font-weight: normal;
	text-align:center;
	background-color: #EEE;
	border: 1px solid black;	
	min-width: 40px;
	min-height: 40px;
}

body {
	padding: 1em;
	box-sizing: border-box;
}

li {
	margin-bottom: 1em;
}
`,

		html: format`
<h3>Horizontal alignment of the grid</h3>
<p>Specifies how all the zones are aligned horizontally inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>

<ul>

<li><code>justify-content: start</code>
when there are two consecutive spaces or more at the end of the rows

<div class="grid justify-start">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: end</code>
when there are two consecutive spaces or more at the beginning of the rows

<div class="grid justify-end">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>


<li><code>justify-content: center</code>
when there are two consecutive spaces or more at the beginning and the end of the rows

<div class="grid justify-center">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: space-between</code>
when there are two consecutive spaces or more between zones

<div class="grid justify-space-between">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: space-evenly</code>
when there are two consecutive spaces or more at the beginning and the end of the rows, and exactly two consecutive spaces between zones

<div class="grid justify-space-evenly">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: space-around</code>
when there are two consecutive spaces or more at the beginning and the end of the rows, and four consecutive spaces or more between zones

<div class="grid justify-space-around">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

</ul>

<h3>Vertical alignment of the grid</h3>

<p>Specifies how all the zones are aligned vertically inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>

<ul>

<li><code>align-content: start</code>
when at least one space row at the end

<div class="grid align-start">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: end</code>
when at least one space row at the beginning

<div class="grid align-end">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: center</code>
when at least one space row at the beginning and one space row at the end

<div class="grid align-center">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: space-between</code>
when there is one space row between zones

<div class="grid align-space-between">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>


<li><code>align-content: space-evenly</code>
when there is one space row at the beginning, at the end and between zones

<div class="grid align-space-evenly">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: space-around</code>
when there is one space row at the beginning and at the end, and two space rows between zones

<div class="grid align-space-around">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

</ul>

<h3>Horizontal alignment inside a zone</h3>

<p>Each zone can specify an alignment indicator. When no indicators are specified, defaults are stretch horizontally and vertically.</p>

<ul>
<li><code>justify-self: start</code> with <code>&lt;</code> or <code>←</code>
<li><code>justify-self: end</code> with <code>&gt;</code> or <code>→</code></li>
<li><code>justify-self: stretch</code> with <code>&lt;</code> and <code>&gt;</code> or <code>←</code> and <code>→</code> in this order</li>
<li><code>justify-self: center</code> with <code>&gt;</code> and <code>&lt;</code> or <code>→</code> and <code>←</code> in this order</li>
</ul>

<div class="grid-row justify-self">
<a>← a</a>  <b>→ b ←</b>  <c>c →</c>  <d>← d →</d> 
</div>

<h3>Vertical alignment inside a zone</h3>

<ul>
<li><code>align-self: start</code> with <code>^</code> or <code>↑</code></li>
<li><code>align-self: end</code> with <code>v</code> or <code>↓</code></li>
<li><code>align-self: stretch</code> with <code>^</code> and <code>v</code> or <code>↑</code> and <code>↓</code> in this order</li>
<li><code>align-self: center</code> with <code>v</code> and <code>^</code> or <code>↓</code> and <code>↑</code> in this order</li>
</ul>

<div class="grid-row align-self">
<a>↑ a</a>  <b>↓ b ↑</b>  <c>↓ c</c>  <d>↑ d ↓</d>
</div>
`
	}

];

/* harmony default export */ __webpack_exports__["a"] = presets;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map