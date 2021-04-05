const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./Routes/User/User");
const TradeRoutes = require("./Routes/Trade/Trade");
const SecurityRoutes = require("./Routes/Security/Security");
const app = express();
app.use(express.json());
const url =
  "mongodb+srv://test123:test123@cluster0.snlcs.mongodb.net/portfolio?retryWrites=true&w=majority";
mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", UserRoutes);
app.use("/trade", TradeRoutes);
app.use("/portfolio", SecurityRoutes);
const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Running in port ${port} `);
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connection is established");
});
