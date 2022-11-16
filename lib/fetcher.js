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
const onPlayPauseFetcher = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(`playpause/${CLIENTHASH}`, SERVERURL);
    try {
        let res = yield fetch(fetch_url);
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
const onSeekFetcher = (_currentTime) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(`settime/${CLIENTHASH}/${_currentTime}`, SERVERURL);
    try {
        let res = yield fetch(fetch_url);
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
const onRateChangeFetcher = (_rate) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch_url = new URL(`setplaybackspeed/${CLIENTHASH}/${_rate}`, SERVERURL);
    try {
        let res = yield fetch(fetch_url);
        if (res) {
            let response = yield res.json();
            return response;
        }
    }
    catch (err) { }
});
