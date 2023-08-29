/*
  dependancies
*/

const express = require("express");

/*
  config - express
*/

/*
  endpoint - posts
*/

/*
  listen
*/

const app = express();
const port = 3000;

app.get("/posts", (request, response) => {
  let posts = [
    {
      caption: "Golden Gate Bridge",
      location: "San Fransisco",
    },
    {
      caption: "Golden Gate Bridge",
      location: "San Fransisco",
    },
  ];
  response.send(posts);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("our endpoint is working");
});
