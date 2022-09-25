const mongoose = require("mongoose");
const express = require("express");
const { user } = require("./router/users");
const auth = require("./router/auth");
const forgot = require("./router/forgot");
const app = express();
const project = require("./router/projects");
// middle ware
app.use(express.json());
app.use("/backend/api/forgot", forgot);
app.use("/backend/api/users", user);
app.use("/backend/api/auth", auth);
app.use("/backend/api/projects", project);
mongoose
  .connect("mongodb://localhost/backend")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("listening on port 4000");
});
