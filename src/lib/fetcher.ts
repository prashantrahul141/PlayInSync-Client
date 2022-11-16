type currentVideoState = {
  playState: boolean;
  playbackTime: number;
  playbackSpeed: number;
};

// Fetcher for connecting to the server.
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

// Fetcher for sync/play event.
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

// Fetcher for when resumed/paused
const onPlayPauseFetcher = async (currentVideoState_: currentVideoState) => {
  const fetch_url = new URL(`update/${CLIENTHASH}`, SERVERURL);

  try {
    let res = await fetch(fetch_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentVideoState_),
    });
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};

// Fetcher for when seeked.
const onSeekFetcher = async (currentVideoState_: currentVideoState) => {
  const fetch_url = new URL(`update/${CLIENTHASH}`, SERVERURL);

  try {
    let res = await fetch(fetch_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentVideoState_),
    });
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};

// Fetcher for video playback speed changes
const onRateChangeFetcher = async (currentVideoState_: currentVideoState) => {
  const fetch_url = new URL(`update/${CLIENTHASH}`, SERVERURL);

  try {
    let res = await fetch(fetch_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentVideoState_),
    });
    if (res) {
      let response = await res.json();
      return response;
    }
  } catch (err) {}
};

const changeListenerFetcher = async () => {
  const fetch_url = new URL(CLIENTHASH, SERVERURL);

  try {
    let res = await fetch(fetch_url);
    if (res) {
      let response = await res.json();

      if (res.status === 200 || res.status === 304) {
        return { changed: false, ...response };
      } else if (res.status === 201) {
        return { changed: true, ...response };
      }
    }
  } catch (err) {}
};
