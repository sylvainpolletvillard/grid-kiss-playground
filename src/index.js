/* global ace */
require("@babel/polyfill");

const
	postcss = require('postcss'),
	gridkiss = require('postcss-grid-kiss'),
	presets = require('./presets');

let processor;

const
	input = document.querySelector("#input"),
	output = document.querySelector("#output"),
	demo = document.querySelector("#demo-frame"),
	html = document.querySelector("#html"),
	optionsInputs = [...document.querySelectorAll(".options input[type='checkbox']")],
	presetSelector = document.querySelector("select.presets"),
	cssEditor = ace.edit(input),
	htmlEditor = ace.edit(html);

initEditor(cssEditor, "css");
initEditor(htmlEditor, "html");

cssEditor.on("input", update);
htmlEditor.on("input", update);

for (let option of optionsInputs) {
	option.addEventListener("change", () => {
		changeOptions();
		update();
	});
}

presetSelector.innerHTML = presets.map((preset, index) => `<option value=${index}>${preset.name}</option>`);
presetSelector.addEventListener("change", () => {
	selectPreset(presets[presetSelector.value]);
	update();
});

window.onload = function () {
	if (demo.contentDocument.readyState === 'complete') {
		init();
	} else {
		demo.onload = init;
	}
}

function init() {
	const presetByHash = presets.find(p => p.hash === window.location.hash.slice(1));
	selectPreset(presetByHash || presets[0]);
	changeOptions();
	update();
	initGithubButtons();
}

function selectPreset(preset) {
	cssEditor.setValue(preset.css, -1);
	htmlEditor.setValue(preset.html, -1);
	window.location.hash = preset.hash;
	presetSelector.value = presets.indexOf(preset);
}

function changeOptions() {
	const options = {};
	for (let checkbox of optionsInputs) {
		options[checkbox.parentElement.textContent.trim()] = checkbox.checked;
	}
	processor = postcss([gridkiss(options)]);
}

function update() {
	demo.contentDocument.body.innerHTML = htmlEditor.getValue();
	processor.process(cssEditor.getValue())
		.then(result => {
			output.textContent = result.css;
			const warnings = result.warnings().map(w => {
				let p = document.createElement("p")
				p.className = "warning"
				p.textContent = w.toString();
			})
			if (warnings && warnings.length > 0) {
				warnings.forEach(p => output.prepend(p))
			}

			setTimeout(() => {
				demo.contentDocument.querySelector("#css_injected").textContent = output.textContent;
			}, 10);
		})
		.catch(error => {
			let p = document.createElement("p")
			p.className = "error"
			p.textContent = error.stack;
			output.prepend(p)
		})
}

function initEditor(editor, mode) {
	editor.setTheme("ace/theme/textmate");
	editor.getSession().setMode(`ace/mode/${mode}`);
	editor.getSession().setOption("useWorker", false); // disable syntax checking since it is not customizable
	editor.setShowPrintMargin(false);
	editor.setHighlightActiveLine(false);
	editor.setFontSize(16);
	editor.$blockScrolling = Infinity;
}

function initGithubButtons() {
	const script = document.createElement("script");
	script.src = "https://buttons.github.io/buttons.js";
	document.body.appendChild(script);
}