import { update } from "./main";

const REGEX_GRID_KISS_DEFINITION = /grid-kiss:[^};]+/;

const
	input          = document.querySelector("#input"),
	html           = document.querySelector("#html"),
	cssEditor      = ace.edit(input),
	htmlEditor     = ace.edit(html);

export function initEditors(){
	cssEditor.on("input", update);
	htmlEditor.on("input", update);

	initEditor(cssEditor, "css");
	initEditor(htmlEditor, "html");
}

export function initEditor(editor, mode){
	editor.setTheme("ace/theme/textmate");
	editor.getSession().setMode(`ace/mode/${mode}`);
	editor.getSession().setOption("useWorker", false); // disable syntax checking since it is not customizable
	editor.setShowPrintMargin(false);
	editor.setHighlightActiveLine(false);
	editor.setFontSize(16);
	editor.$blockScrolling = Infinity;
}

export function setEditorsContent({ css, html }){
	cssEditor.setValue(css, -1);
	htmlEditor.setValue(html, -1);
}

export function getEditorsContent() {
	return {
		html: htmlEditor.getValue(),
		css: cssEditor.getValue()
	}
}

export function replaceGridDefinition(newDefinition){
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