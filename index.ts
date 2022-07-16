import express from 'express';
import multer from 'multer';


import { storage } from './multerConfig';

const app = express()
import fs from "fs"
const uploader = multer({ storage })


const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'image-upload',
  password: 'root',
  dialect: 'postgres',
  port: 5432
});

app.use("/files", express.static("uploads"))

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
  if (err) {
    return console.error(
      'Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error(
        'Error executing query', err.stack)
    }

    console.log("Connected to Database !")
  })
})


app.get('/db', (req, res, next) => {
  console.log("TEST DATA :");
  pool.query('Select * from users')
    .then(testData => {
      console.log(testData);
      res.send(testData.rows);
    })
})


app.post("/upload", uploader.single('file'), ((req, res) => {
  try {
    return res.json(req.file?.filename)
  } catch (error) {
    console.log(error)
  }
}))


app.delete("/remove/:id", ((req, res) => {
  console.log(req.query)
  //fs.unlinkSync(`uploads/${idFile?.id}`);
  return res.send("aq")
}))


app.listen(3000)
