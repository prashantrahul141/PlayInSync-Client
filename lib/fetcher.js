"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fetcher for connecting to the server.
const connectHandlerFetcher = () => __awaiter(void 0, void 0, void 0, function* () {
    const clientHash = Math.random().toString(36).substring(7);
    const fetch_url = new URL(clientHash, urlInput.value);
    try {
        let res = yield fetch(fetch_url, {
            method: 'POST',
        });
        if (res) {
            let response = yield res.json();
            return { clientHash, response };
        }
    }
    catch (err) {
        console.log(err);
    }
    return { response: { state: 'Failure' } };
});
// Fetcher for sync/play event.
const onPlayFetcher = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(CLIENTHASH, SERVERURL);
    try {
        let res = yield fetch(fetch_url);
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
// Fetcher for when resumed/paused
const onPlayPauseFetcher = (currentVideoState_) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(`update/${CLIENTHASH}`, SERVERURL);
    try {
        let res = yield fetch(fetch_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentVideoState_),
        });
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
// Fetcher for when seeked.
const onSeekFetcher = (currentVideoState_) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(`update/${CLIENTHASH}`, SERVERURL);
    try {
        let res = yield fetch(fetch_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentVideoState_),
        });
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
// Fetcher for video playback speed changes
const onRateChangeFetcher = (currentVideoState_) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(`update/${CLIENTHASH}`, SERVERURL);
    try {
        let res = yield fetch(fetch_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentVideoState_),
        });
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
const changeListenerFetcher = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(CLIENTHASH, SERVERURL);
    try {
        let res = yield fetch(fetch_url);
        if (res) {
            let response = yield res.json();
            if (res.status === 200 || res.status === 304) {
                return Object.assign({ changed: false }, response);
            }
            else if (res.status === 201) {
                return Object.assign({ changed: true }, response);
            }
        }
    }
    catch (err) { }
});
