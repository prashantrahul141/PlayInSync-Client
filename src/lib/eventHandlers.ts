let CLIENTHASH: any;
let fileName: string | null;

const connectHandler = async () => {
  urlInput.disabled = true;
  connectButton.disabled = true;

  if (urlInput.value) {
    // valid url
    const response = await connectHandlerFetcher();
    if (response['response']['state'] === 'Success') {
      // When Response is recieved from server.

      CLIENTHASH = response['clientHash'];
      if (response['response']['file'] !== 'None') {
        fileName = response['response']['file'];
        localStorage.setItem('FILENAME', fileName || 'None');
      }
      localStorage.setItem('CLIENTHASH', CLIENTHASH);
      window.location.href = './watch.html';
    } else if (response['response']['state'] === 'Failure') {
      // Server didnt respond.
      urlInput.disabled = false;
      connectButton.disabled = false;

      alert('Please enter a valid Server URL first.');
    }
  } else {
    // invalid url
    urlInput.disabled = false;
    connectButton.disabled = false;

    alert('Please enter a valid Server URL first.');
  }
};

const onLoadWatch = () => {
  CLIENTHASH = localStorage.getItem('CLIENTHASH');
  fileName = localStorage.getItem('FILENAME');
  if (fileName !== 'None') {
    file_text.innerText += ` ${fileName}`;
  }
};

const playHandler = (e: Event) => {
  e.preventDefault();

  if (file_input.files !== null && file_input.files[0] !== undefined) {
    const objectUrl = URL.createObjectURL(file_input.files[0]);
    videoPlayer.style.display = 'block';
    videoPlayer.src = objectUrl;
    file_div.style.display = 'none';
  }
};
