import express from 'express'
import process from 'process'
import dotenv from 'dotenv'
import router from "./src/routes/routes"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import "./src/models/db"

dotenv.config()

const PORT = process.env.PORT_BACK


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/', router);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app