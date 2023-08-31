/*
  dependancies
*/

const express = require("express");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

/*
  config - express
*/

const app = express();
const port = 3000;

/*
  config -firebase
*/

const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const serviceAccount = require("./keys/quasagram-SAkey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

/*
  endpoint - posts
*/

app.get("/posts", (request, response) => {
  //fix CORS error
  response.set("Access-Control-Allow-Origin", "*");

  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

/*
  listen
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("our endpoint is working");
});
