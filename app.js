const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const connect = require("./services/connection");
const routes = require("./routes");

connect(mongoose);

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//Routes
routes(app);

app.listen(process.env.PORT || 4001, () => {
    console.log(`Listening on ${process.env.PORT || 4001}`);
});