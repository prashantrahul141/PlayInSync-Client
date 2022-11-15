let CLIENTHASH: any;

const connectHandler = async () => {
  urlInput.disabled = true;
  connectButton.disabled = true;

  if (urlInput.value) {
    const response = await connectHandlerFetcher();
    if (response['response']['state'] === 'Success') {
      urlInput.classList.remove('failure');
      connectButton.classList.remove('failure');
      urlInput.classList.add('success');
      connectButton.classList.add('success');
      CLIENTHASH = response['clientHash'];
      if (response['response']['file'] !== 'None') {
        file_text.innerText += ` ${response['response']['file']}`;
      }
      file_div.style.display = 'block';
    } else if (response['response']['state'] === 'Failure') {
      urlInput.classList.add('failure');
      connectButton.classList.add('failure');
      urlInput.disabled = false;
      connectButton.disabled = false;
      alert('Please enter a valid Server URL first.');
    }
  } else {
    urlInput.classList.add('failure');
    connectButton.classList.add('failure');
    urlInput.disabled = false;
    connectButton.disabled = false;
    alert('Please enter a valid Server URL first.');
  }
};
