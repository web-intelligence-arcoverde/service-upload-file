import express from 'express';
import multer from 'multer';

import { storage } from './multerConfig';

const app = express()
import fs from "fs"
const uploader = multer({ storage })

app.use("/files", express.static("uploads"))


app.post("/upload", uploader.single('file'), ((req, res) => {
  try {
    return res.json(req.file?.filename)
  } catch (error) {
    console.log(error)
  }
}))


app.get("/remove", ((req, res) => {
  console.log(req.params)
  //fs.unlinkSync(`uploads/${idFile?.id}`);
  return res.send("aq")
}))


app.listen(3000)
