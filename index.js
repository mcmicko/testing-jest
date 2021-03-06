const express = require("express");
const db = require("./db");

const app = express();

db.connect();

//init middleware
app.use(express.json({ extended: false }));

app.use("/posts", require("./controller/posts"));
app.use("/users", require("./controller/users"));

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`server radi na portu ${port}`);
});
