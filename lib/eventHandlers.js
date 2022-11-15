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
const connectHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    urlInput.disabled = true;
    connectButton.disabled = true;
    console.log(1);
    if (urlInput.value) {
        const response = yield connectHandlerFetcher();
        if (response['response']['state'] === 'Success') {
            CLIENTHASH = response['clientHash'];
            file_div.style.display = 'block';
        }
    }
    else {
        alert('Please enter a valid Server URL first.');
        urlInput.disabled = false;
        connectButton.disabled = false;
    }
});