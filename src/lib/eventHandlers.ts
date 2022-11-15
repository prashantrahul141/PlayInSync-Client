let CLIENTHASH: any;

const connectHandler = async () => {
  urlInput.disabled = true;
  connectButton.disabled = true;
  console.log(1);

  if (urlInput.value) {
    const response = await connectHandlerFetcher();
    if (response['response']['state'] === 'Success') {
      CLIENTHASH = response['clientHash'];
      file_div.style.display = 'block';
    }
  } else {
    alert('Please enter a valid Server URL first.');
    urlInput.disabled = false;
    connectButton.disabled = false;
  }
};
