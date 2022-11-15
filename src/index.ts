const urlInput = document.getElementById('link-input') as HTMLInputElement;
const connectButton = document.getElementById('connect') as HTMLButtonElement;
const file_div = document.getElementById('file-div') as HTMLDivElement;
const file_text = document.getElementById('file-text') as HTMLParagraphElement;
const file_input = document.getElementById('file') as HTMLInputElement;
const playButton = document.getElementById('play') as HTMLButtonElement;
const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;

if (document.URL.includes('index')) {
  connectButton.addEventListener('click', connectHandler);
} else if (document.URL.includes('watch')) {
  onLoadWatch();
  playButton.addEventListener('click', playHandler);
}
