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

const onPlayFetcher = async () => {
  const fetch_url = new URL(CLIENTHASH, SERVERURL);

  try {
    let res = await fetch(fetch_url);
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};

const onPlayPauseFetcher = async () => {
  const fetch_url = new URL(`playpause/${CLIENTHASH}`, SERVERURL);

  try {
    let res = await fetch(fetch_url);
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};

const onSeekFetcher = async (_currentTime: number) => {
  const fetch_url = new URL(`settime/${CLIENTHASH}/${_currentTime}`, SERVERURL);

  try {
    let res = await fetch(fetch_url);
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};

const onRateChangeFetcher = async (_rate: number) => {
  const fetch_url = new URL(
    `setplaybackspeed/${CLIENTHASH}/${_rate}`,
    SERVERURL
  );

  try {
    let res = await fetch(fetch_url);
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};
