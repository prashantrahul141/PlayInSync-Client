"use strict";
const urlInput = document.getElementById('link-input');
const connectButton = document.getElementById('connect');
const file_div = document.getElementById('file-div');
const file_text = document.getElementById('file-text');
const file_input = document.getElementById('file');
const playButton = document.getElementById('play');
const videoPlayer = document.getElementById('video-player');
if (document.URL.includes('index')) {
    connectButton.addEventListener('click', connectHandler);
}
else if (document.URL.includes('watch')) {
    onLoadWatch();
    playButton.addEventListener('click', playHandler);
}
