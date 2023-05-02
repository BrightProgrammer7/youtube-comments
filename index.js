// GoogleAPI:
import fs from "fs";
import { google } from "googleapis";
// import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

// Use the API key in code from .env file
const api = process.env.GOOGLE_API_KEY;
const vid = process.env.VIDEO_ID;
 
console.log(api, vid)

// access ytb api
const ytb = google.youtube({
  version: "v3",
  auth: api,
});

// const videoId =  // Change this to your desired video ID

// axios.get("https://www.googleapis.com/youtube/v3/commentThreads", {
//   params: {
//     part: "snippet",
//     videoId: videoId,
//     key: "YOUR_API_KEY_HERE"
//   }
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });

// call ytb comments
ytb.commentThreads.list(
  {
    part: "snippet",
    videoID: vid,
    // videoId: "pEfrdAtAmqk",
  },
  (err, data) => {
    // display data packet
    if (err) throw err;
    console.log(data);
    let json = JSON.stringify(data.data.items);
    console.log(json);
    fs.writeFile("comments", json, "utf8", (err) => {
      if (err) throw err;
      console.log("The file has been successfully saved");
    });
  }
);
