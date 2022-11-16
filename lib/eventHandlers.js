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
let SERVERURL;
// connecting to the server.
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
                localStorage.setItem('SERVERURL', urlInput.value);
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
// handeling first load of /watch page
const onLoadWatch = () => __awaiter(void 0, void 0, void 0, function* () {
    CLIENTHASH = localStorage.getItem('CLIENTHASH');
    fileName = localStorage.getItem('FILENAME') || 'None';
    SERVERURL = localStorage.getItem('SERVERURL') || 'http://0.0.0.0:3000';
    if (fileName !== 'None') {
        file_text.innerText += ` ${fileName}`;
    }
});
// handeling when sync/play button is pressed
const playHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (file_input.files !== null && file_input.files[0] !== undefined) {
        const objectUrl = URL.createObjectURL(file_input.files[0]);
        videoPlayerDiv.style.display = 'block';
        videoPlayer.src = objectUrl;
        file_div.style.display = 'none';
        const response = yield onPlayFetcher();
        if (response) {
            videoPlayer.currentTime = response.playbackTime;
            if (response.playState === true) {
                videoPlayer.play();
            }
            videoPlayer.playbackRate = response.playbackSpeed;
        }
    }
});
// handeling play and pause
let firstLoadPlayPause = true;
const onPlayPause = (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstLoadPlayPause) {
        // const currentTime_ = videoPlayer.currentTime;
        yield onPlayPauseFetcher();
        return;
    }
    firstLoadPlayPause = false;
});
// handeling seeks
let timing = 0;
let firstLoadOnSeek = true;
const onSeek = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstLoadOnSeek) {
        let previousTime = timing;
        let currentTime = Math.round(videoPlayer.currentTime);
        if (currentTime > previousTime + 1 || currentTime < previousTime - 1) {
            yield onSeekFetcher(videoPlayer.currentTime);
        }
        timing = currentTime;
        return;
    }
    firstLoadOnSeek = false;
});
// handeling playbackspeed
// for somereason idk 'ratechange' event gets
// called twice, to handel that using 'lastRateChangeCalled'.
let lastRateChangeCalled = 0;
let firstLoadOnRateChange = true;
const onRateChange = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstLoadOnRateChange) {
        if (performance.now() - lastRateChangeCalled > 1000) {
            lastRateChangeCalled = performance.now();
            yield onRateChangeFetcher(videoPlayer.playbackRate);
        }
        return;
    }
    firstLoadOnRateChange = false;
});
