const connectHandlerFetcher = async () => {
  const clientHash = Math.random().toString(36).substring(7);
  const fetch_url = new URL(clientHash, urlInput.value);
  try {
    let res = await fetch(fetch_url, {
      method: 'POST',
    });
    if (res) {
      let response = await res.json();
      return { clientHash, response };
    }
  } catch (err) {
    console.log(err);
  }

  return { response: { state: 'Failure' } };
};

//https://localhost:3000/
