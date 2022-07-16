import multer from 'multer';

import path from "path"

import { removeAccentSpace } from './util/removePatternBrazil';

export const storage = multer.diskStorage({
  destination: (red, file, callback) => {
    callback(null, path.resolve("uploads"))

  },
  filename: (req, file, callback) => {
    const time = new Date().getTime()

    var origim = "cad-unico"



    callback(null, `${time}_${file.originalname}`)
  }
})