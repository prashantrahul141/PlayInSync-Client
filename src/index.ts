const urlInput = document.getElementById('link-input') as HTMLInputElement;
const connectButton = document.getElementById('connect') as HTMLButtonElement;
const file_div = document.getElementById('file-div') as HTMLDivElement;
const file_text = document.getElementById('file-text') as HTMLParagraphElement;
const file_input = document.getElementById('file') as HTMLInputElement;
const playButton = document.getElementById('play') as HTMLButtonElement;
const videoPlayerDiv = document.getElementById('video-div') as HTMLDivElement;
const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;

if (document.URL.includes('watch')) {
  onLoadWatch();

  playButton.addEventListener('click', playHandler);

  videoPlayer.addEventListener('pause', sendUpdate);
  videoPlayer.addEventListener('play', sendUpdate);
  videoPlayer.addEventListener('seeked', sendUpdate);
  videoPlayer.addEventListener('ratechange', sendUpdate);
} else {
  connectButton.addEventListener('click', connectHandler);
}
