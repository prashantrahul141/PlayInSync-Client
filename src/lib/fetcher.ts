const connectHandlerFetcher = async () => {
  const clientHash = Math.random().toString(36).substring(7);
  const fetch_url = new URL(clientHash, urlInput.value);
  let res = await fetch(fetch_url, {
    method: 'POST',
  });
  let response = await res.json();
  return { clientHash, response };
};

//https://localhost:3000/
