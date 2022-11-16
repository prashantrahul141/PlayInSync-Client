"use strict";
const urlInput = document.getElementById('link-input');
const connectButton = document.getElementById('connect');
const file_div = document.getElementById('file-div');
const file_text = document.getElementById('file-text');
const file_input = document.getElementById('file');
const playButton = document.getElementById('play');
const videoPlayerDiv = document.getElementById('video-div');
const videoPlayer = document.getElementById('video-player');
if (document.URL.includes('watch')) {
    onLoadWatch();
    playButton.addEventListener('click', playHandler);
    videoPlayer.addEventListener('pause', onPlayPause);
    videoPlayer.addEventListener('play', onPlayPause);
    videoPlayer.addEventListener('timeupdate', onSeek);
    videoPlayer.addEventListener('ratechange', onRateChange);
}
else {
    connectButton.addEventListener('click', connectHandler);
}
