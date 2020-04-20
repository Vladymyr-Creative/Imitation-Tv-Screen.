'use strict';
import Application from './Screen1.js';

const img = "favicon.ico";
let data = {
    "accounts": [
        {
            "title": "title item 1",
            "img":   img
        },
        {
            "title": "title item 2",
            "img":   img
        },
        {
            "title": "title item 3",
            "img":   img
        },
    ]
};

let app = new Application(data['accounts']);