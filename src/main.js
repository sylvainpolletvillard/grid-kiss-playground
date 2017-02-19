/* global ace, postcss, gridkiss */
import presets from './presets';
import { initEditors, setEditorsContent, getEditorsContent } from './editor';
import { openOCR } from './ocr';

let processor;

const
	input          = document.querySelector("#input"),
	output         = document.querySelector("#output"),
	demo           = document.querySelector("#demo"),
	html           = document.querySelector("#html"),
	optionsInputs  = [...document.querySelectorAll(".options input[type='checkbox']")],
	presetSelector = document.querySelector("select.presets"),
	ocrButton    = document.querySelector("#ocr-button");

ocrButton.addEventListener("click", openOCR);

for (let option of optionsInputs) {
	option.addEventListener("change", updateOptions);
}

function init(){
	initEditors();

	presetSelector.innerHTML = presets.map((preset, index) => `<option value=${index}>${preset.name}</option>`);
	presetSelector.addEventListener("change", () => {
		setEditorsContent(presets[presetSelector.value]);
		update();
	});

	setEditorsContent(presets[0]);
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

export function update(){
	let { html, css } = getEditorsContent();
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
