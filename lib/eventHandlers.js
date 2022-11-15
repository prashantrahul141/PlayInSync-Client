"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CLIENTHASH;
let fileName;
const connectHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    urlInput.disabled = true;
    connectButton.disabled = true;
    if (urlInput.value) {
        // valid url
        const response = yield connectHandlerFetcher();
        if (response['response']['state'] === 'Success') {
            // When Response is recieved from server.
            CLIENTHASH = response['clientHash'];
            if (response['response']['file'] !== 'None') {
                fileName = response['response']['file'];
                localStorage.setItem('FILENAME', fileName || 'None');
            }
            localStorage.setItem('CLIENTHASH', CLIENTHASH);
            window.location.href = './watch.html';
        }
        else if (response['response']['state'] === 'Failure') {
            // Server didnt respond.
            urlInput.disabled = false;
            connectButton.disabled = false;
            alert('Please enter a valid Server URL first.');
        }
    }
    else {
        // invalid url
        urlInput.disabled = false;
        connectButton.disabled = false;
        alert('Please enter a valid Server URL first.');
    }
});
const onLoadWatch = () => {
    CLIENTHASH = localStorage.getItem('CLIENTHASH');
    fileName = localStorage.getItem('FILENAME');
    if (fileName !== 'None') {
        file_text.innerText += ` ${fileName}`;
    }
};
const playHandler = (e) => {
    e.preventDefault();
    if (file_input.files !== null && file_input.files[0] !== undefined) {
        const objectUrl = URL.createObjectURL(file_input.files[0]);
        videoPlayer.style.display = 'block';
        videoPlayer.src = objectUrl;
        file_div.style.display = 'none';
    }
};
