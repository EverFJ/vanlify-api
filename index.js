require("dotenv").config({
    path: ".env",
});
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const {
    PORT,
    URI
} = process.env;
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/users", userRoutes);
app.use("/locations", locationRoutes);

if (!PORT || !URI) {
    console.log(
        "You need to include .env file. Please contact your lead developper :)"
    );
    return;
}

mongoose.connect(URI, (err) => {
    if (err) {
        console.log(`Error while connecting to ${URI}`);
        console.log(err);
        process.exit(1);
    }
    console.log(`Mongoose is connected to ${URI}`);
});

app.listen(PORT, () => {
    console.log(`VanlifY API driving on port ${PORT}`);
});