import express from 'express';
import multer from 'multer';


import { storage } from './multerConfig';

const serviceLink = "http://localhost:3000"

const app = express()
import fs from "fs"
const uploader = multer({ storage })





app.use("/files", express.static("uploads"))

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));



app.post("/upload", uploader.single('file'), ((req, res) => {
  try {
    return res.json(`${serviceLink}/files/${req.file?.filename}`)
  } catch (error) {
    console.log(error)
  }
}))


app.delete("/remove/:id", (async (req, res) => {
  try {
    const { id } = req.query
    fs.unlinkSync(`uploads/${id}`);
    return res.send("Imagem deletada")
  } catch (error) {
    return res.send("Imagem não existe")
  }
}))


app.listen(3000)
