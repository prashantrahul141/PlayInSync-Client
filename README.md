### <p align='center'><b>Play <i>offline</i> videos in Sync across the internet.</b> </p>

# Client Code for PlayInSync

This contains the client code for PlayInSync written in TypeScript using Socket.io, Any changes made on the client (videoplayback) will be sent to the server and synced with all other clients.

### How?

Everytime someone changes the state of video playback (play/pause, seek, playback speed) the client sends that information to the server, and the server stores them, when all other clients connected to the same server request for changes the server sends those updates it stored previously and the clients update their playback state according to the data recieved.

### Why?

Since all clients have the video required to sync even before the sync starts, this removes the hassel of streaming video (which leads to loss in quality and drop in fps)

For server see - https://github.com/prashantrahul141/PlayInSync-Server

# 🛠️ Installation & Set Up

##### 1. Clone the repo

```sh
git clone https://github.com/prashantrahul141/PlayInSync-Client
```

##### 2. The site is completely static, no need for a local server, just open **index.html**

<img width="100%" src="/media/index.jpg" alt="index.jpg">

##### 3. Put in the [server](https://github.com/PlayInSync/PlayInSync-Server) URL

<img width="100%" src="/media/connect.jpg" alt="index.jpg">

##### 4. Choose the video to play, Click **Sync**

<img width="100%" src="/media/pick.jpg" alt="index.jpg">
<img width="100%" src="/media/sync.jpg" alt="index.jpg">

##### 5. Enjoy

<img width="100%" src="/media/enjoy.jpg" alt="index.jpg">

# 💻 Technologies used

- TypeScript
- Socket.io
