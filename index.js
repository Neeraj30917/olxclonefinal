const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routesUrls = require('./routes/routes')
// const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

// local mongod connection used
mongoose
    .connect(process.env.DATABASE_ACCESS, () => console.log("Database Connected Succcessfully"));
app.use(express.json())
// app.use(cors())
app.use('/app', routesUrls)


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`))