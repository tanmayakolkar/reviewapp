require('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");

const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        success: false,
        message: "UnhandledError exception",
        error: err
    })
});

app.use('/api', routes);
app.all('*', (req, res) => {
    return res.status(404).send({
        status: 404,
        success: false,
        message: "Route not found"
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
