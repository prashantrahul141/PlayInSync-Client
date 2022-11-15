const urlInput = document.getElementById('link-input') as HTMLInputElement;
const connectButton = document.getElementById('connect') as HTMLButtonElement;
const file_div = document.getElementById('file-div') as HTMLDivElement;
const file_text = document.getElementById('file-text') as HTMLParagraphElement;

connectButton.addEventListener('click', connectHandler);
