const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

const port = 8080;

app.listen(port, (err, res) => {
  if (err) console.log("Error while start server!!");
  else console.log(`Server started at port ${port}`);
});
