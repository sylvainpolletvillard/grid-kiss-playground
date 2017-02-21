/* global Tesseract */

import {replaceGridDefinition} from "./editor"

const ocrContainer   = document.querySelector("#ocr-container"),
      ocrProgress    = ocrContainer.querySelector("progress"),
      ocrMessage     = ocrContainer.querySelector("#ocr-status"),
      ocrOutput      = ocrContainer.querySelector("textarea"),
      cameraVideo    = ocrContainer.querySelector('#camera-video'),
      cameraPhoto    = ocrContainer.querySelector('#camera-photo'),
      photoButton    = ocrContainer.querySelector('#photo-btn'),
      photoInput     = ocrContainer.querySelector('#photo-input'),
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

photoInput.addEventListener('change', ev => readOCR(photoInput.files[0]));

validateButton.addEventListener('click', ev => {
	ocrContainer.hidden = true;
	replaceGridDefinition(ocrOutput.value);
	ev.preventDefault();
}, false);

export function openOCR(){
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
	readOCR(cameraPhoto);
}

function readOCR(source){
	ocrProgress.value = 0;
	ocrMessage.textContent = "Please wait...";
	ocrContainer.querySelector("p").textContent = "Please wait...";

	Tesseract.recognize(source, {
		tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyz +-*/()<>%┌┐└┘│─"
	})
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