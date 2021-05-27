const express = require("express");
const db = require("./tests/db");

db.connect();

const app = express();

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`server radi na portu ${port}`);
});
