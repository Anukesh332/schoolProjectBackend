const express = require("express");

const { rolerouter } = require("./routes/Class-router");
const { rolerouters } = require("./routes/Student-router");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 5000;


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/Class", rolerouter);
app.use("/Student", rolerouters);
app.listen(PORT, () => {

  console.log("Server is running..");

});

module.exports = app





// java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 8000 -sharedDb