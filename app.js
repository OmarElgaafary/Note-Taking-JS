const express = require("express");
const app = express();

require("dotenv").config();

const router = require("./router/note-routes.js");
app.use("/note", router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the note taking app.");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
