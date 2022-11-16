let CLIENTHASH: any;
let fileName: string;
let SERVERURL: string;
let lockDuration = 2000;
let lastLocked = -1000;

// get current playback State Local.
const getPlaybackState = (): currentVideoState => {
  const playState = !videoPlayer.paused;
  const playbackTime = videoPlayer.currentTime;
  const playbackSpeed = videoPlayer.playbackRate;

  return { playState, playbackTime, playbackSpeed };
};

// connecting to the server.
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
      localStorage.setItem('SERVERURL', urlInput.value);
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

// handeling first load of /watch page
const onLoadWatch = async () => {
  CLIENTHASH = localStorage.getItem('CLIENTHASH');
  fileName = localStorage.getItem('FILENAME') || 'None';
  SERVERURL = localStorage.getItem('SERVERURL') || 'http://0.0.0.0:3000';
  if (fileName !== 'None') {
    file_text.innerText += ` ${fileName}`;
  }
};

// handeling when sync/play button is pressed
const playHandler = async (e: Event) => {
  e.preventDefault();

  if (file_input.files !== null && file_input.files[0] !== undefined) {
    const objectUrl = URL.createObjectURL(file_input.files[0]);
    videoPlayerDiv.style.display = 'block';
    videoPlayer.src = objectUrl;
    file_div.style.display = 'none';

    const response = await onPlayFetcher();
    if (response) {
      videoPlayer.currentTime = response.playbackTime;
      if (response.playState === true) {
        videoPlayer.play();
      }
      videoPlayer.playbackRate = response.playbackSpeed;
      // listening for changes on the server.
      setInterval(changeListener, 2000);
    }
  }
};

// handeling play and pause

const onPlayPause = async (e: Event) => {
  if (performance.now() - lastLocked > lockDuration) {
    const currentVideoState = getPlaybackState();
    await onPlayPauseFetcher(currentVideoState);
    return;
  }
};

// handeling seeks
let timing = 0;
const onSeek = async () => {
  if (performance.now() - lastLocked > lockDuration) {
    let previousTime = timing;
    let currentTime = Math.round(videoPlayer.currentTime);
    if (currentTime > previousTime + 1 || currentTime < previousTime - 1) {
      const currentVideoState = getPlaybackState();
      await onSeekFetcher(currentVideoState);
    }
    timing = currentTime;
    return;
  }
};

// handeling playbackspeed
// for somereason idk 'ratechange' event gets
// called twice, to handel that using 'lastRateChangeCalled'.
let firstLoadOnRateChange = true;
const onRateChange = async () => {
  if (!firstLoadOnRateChange && performance.now() - lastLocked > lockDuration) {
    const currentVideoState = getPlaybackState();
    await onRateChangeFetcher(currentVideoState);
    return;
  }
  firstLoadOnRateChange = false;
};

// listens for changes
const changeListener = async () => {
  const res = await changeListenerFetcher();
  if (res.changed) {
    lastLocked = performance.now();
    videoPlayer.currentTime = res.playbackTime;
    videoPlayer.playbackRate = res.playbackSpeed;
  }
  res.playState ? videoPlayer.play() : videoPlayer.pause();
};
