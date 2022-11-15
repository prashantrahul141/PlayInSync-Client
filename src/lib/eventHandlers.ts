let CLIENTHASH: any;
let fileName: string;

const connectHandler = async () => {
  urlInput.disabled = true;
  connectButton.disabled = true;

  if (urlInput.value) {
    // valid url
    const response = await connectHandlerFetcher();
    if (response['response']['state'] === 'Success') {
      // When Response is recieved from server.
      urlInput.classList.remove('failure');
      connectButton.classList.remove('failure');
      urlInput.classList.add('success');
      connectButton.classList.add('success');

      CLIENTHASH = response['clientHash'];
      if (response['response']['file'] !== 'None') {
        fileName = response['response']['file'];
        file_text.innerText += ` ${fileName}`;
      }

      file_div.style.display = 'block';
    } else if (response['response']['state'] === 'Failure') {
      // Server didnt respond.
      urlInput.classList.add('failure');
      connectButton.classList.add('failure');

      urlInput.disabled = false;
      connectButton.disabled = false;

      alert('Please enter a valid Server URL first.');
    }
  } else {
    // invalid url
    urlInput.classList.add('failure');
    connectButton.classList.add('failure');

    urlInput.disabled = false;
    connectButton.disabled = false;

    alert('Please enter a valid Server URL first.');
  }
};

const playHandler = (e: Event) => {
  e.preventDefault();
};
