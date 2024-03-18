const express = require("express");
const cors = require("cors");
require("express-async-errors");
const connection = require("./config/db");

const app = express();

connection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("hello"));

app.use("/user", require("./routes/user"));
app.use("/todos", require("./routes/todo"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));