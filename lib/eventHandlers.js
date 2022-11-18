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
let clientIO;
let SERVERURL;
let lockDuration = 1000;
let lastLocked = -1000;
// get current playback State Local.
const getPlaybackState = () => {
    const playState = !videoPlayer.paused;
    const playbackTime = videoPlayer.currentTime;
    const playbackSpeed = videoPlayer.playbackRate;
    return { playState, playbackTime, playbackSpeed };
};
// connecting to the server.
const connectHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    urlInput.disabled = true;
    connectButton.disabled = true;
    if (urlInput.value) {
        try {
            const res = yield fetch(urlInput.value);
            if (res) {
                let response = yield res.json();
                if (response['state'] === 'Success') {
                    localStorage.setItem('SERVERURL', urlInput.value);
                    window.location.href = './watch.html';
                }
            }
        }
        catch (err) {
            urlInput.disabled = false;
            connectButton.disabled = false;
            console.log(err);
            alert('Failed to connect to the server.');
        }
    }
    else {
        urlInput.disabled = false;
        connectButton.disabled = false;
        alert('Please enter a valid server url.');
    }
});
// handeling first load of /watch page
const onLoadWatch = () => {
    SERVERURL = localStorage.getItem('SERVERURL') || 'http://0.0.0.0:3000';
};
// handeling when sync/play button is pressed
const playHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (file_input.files !== null && file_input.files[0] !== undefined) {
        const objectUrl = URL.createObjectURL(file_input.files[0]);
        videoPlayerDiv.style.display = 'block';
        videoPlayer.src = objectUrl;
        file_div.style.display = 'none';
        // @ts-ignore
        clientIO = io(SERVERURL);
        clientIO.on('connect', (socket) => {
            console.log('Connected.');
        });
        clientIO.on('recieve-update', onReceiveUpdate);
    }
});
const sendUpdate = (e) => {
    if (performance.now() - lastLocked > lockDuration) {
        const currentVideoState = getPlaybackState();
        clientIO.emit('update', currentVideoState);
    }
};
const onReceiveUpdate = (playbackState) => {
    lastLocked = performance.now();
    videoPlayer.currentTime = playbackState.playbackTime;
    videoPlayer.playbackRate = playbackState.playbackSpeed;
    playbackState.playState ? videoPlayer.play() : videoPlayer.pause();
};
