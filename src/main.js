/* global ace */
import postcss from 'postcss';
import gridkiss from 'postcss-grid-kiss';
import presets from './presets';

let processor;

const
	input          = document.querySelector("#input"),
	output         = document.querySelector("#output"),
	demo           = document.querySelector("#demo"),
	html           = document.querySelector("#html"),
	optionsInputs  = [...document.querySelectorAll(".options input[type='checkbox']")],
	presetSelector = document.querySelector("select.presets"),
	cssEditor      = ace.edit(input),
	htmlEditor     = ace.edit(html);

initEditor(cssEditor, "css");
initEditor(htmlEditor, "html");

cssEditor.on("input", update);
htmlEditor.on("input", update);

for (let option of optionsInputs) {
	option.addEventListener("change", updateOptions);
}

presetSelector.innerHTML = presets.map((preset, index) => `<option value=${index}>${preset.name}</option>`);
presetSelector.addEventListener("change", () => {
	selectPreset(presets[presetSelector.value]);
	update();
});

window.onload = function() {
	if (demo.contentDocument.readyState === 'complete') {
		init();
	} else {
		demo.onload = init;
	}
}

function init(){
	selectPreset(presets[0]);
	updateProcessor();
	update();
}

function selectPreset(preset){
	cssEditor.setValue(preset.css, -1);
	htmlEditor.setValue(preset.html, -1);
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
	demo.contentDocument.body.innerHTML = htmlEditor.getValue();
	processor.process(cssEditor.getValue())
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

function initEditor(editor, mode){
	editor.setTheme("ace/theme/textmate");
	editor.getSession().setMode(`ace/mode/${mode}`);
	editor.getSession().setOption("useWorker", false); // disable syntax checking since it is not customizable
	editor.setShowPrintMargin(false);
	editor.setHighlightActiveLine(false);
	editor.setFontSize(16);
	editor.$blockScrolling = Infinity;
}
