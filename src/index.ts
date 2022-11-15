const urlInput = document.getElementById('link-input') as HTMLInputElement;
const connectButton = document.getElementById('connect') as HTMLButtonElement;
const file_div = document.getElementById('file-div') as HTMLDivElement;
const file_text = document.getElementById('file-text') as HTMLParagraphElement;
const file_input = document.getElementById('file') as HTMLInputElement;
const playButton = document.getElementById('play') as HTMLButtonElement;

connectButton.addEventListener('click', connectHandler);

playButton.addEventListener('click', playHandler);
