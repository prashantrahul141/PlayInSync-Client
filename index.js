"use strict";
const urlInput = document.getElementById('link-input');
const connectButton = document.getElementById('connect');
const file_div = document.getElementById('file-div');
const file_text = document.getElementById('file-text');
const file_input = document.getElementById('file');
const playButton = document.getElementById('play');
connectButton.addEventListener('click', connectHandler);
playButton.addEventListener('click', playHandler);
