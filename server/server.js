const express = require("express");

const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/database");
const router = require("./routes/router");

const app = express();
const PORT = 3000;


connectDB()

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.use('/',router)








app.listen(PORT, () => console.log(` app listening on PORT ${PORT}!`));
