import formidable from "formidable";
import path, { resolve } from "path";
const dir = path.join(process.cwd(), "/NFTImages");
import fs from "fs";
const pinataSDK = require("@pinata/sdk");
require("dotenv").config();

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);



export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  //const files = fs.readdirSync(dir);
  const parseFile = () => {
    const options = {
      //uploadDir: path.join(process.cwd(), "/NFTImages"),
      multiples: true,
      // filename: (name, ext, part, form) => {
      //   let filename = part.originalFilename;
      //   return filename.split(".")[0].concat(".png");
      // },
    };
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (!files.File.originalFilename) {
        //res.setHeader("content-type", "application/json")
        res.status(400).send("No File Uploaded")
        return
      }

      uploadToPinata(files)
      

    });

  };

  async function uploadToPinata(files){
    try {
        const readableFileStream = fs.createReadStream(files.File.filepath.toString());
        const options = {
        pinataMetadata: {
            name: files.File.originalFilename.toLowerCase()
        },
    };

    pinata
      .pinFileToIPFS(readableFileStream, options)
      .then((result) => {
        console.log(result);
        res.setHeader('Content', 'application/json');
        res.status(200).send(result)
        return result;
      })
      .catch((err) => {
        res.status(400).send(err)
        console.log(err)
      });
    } catch (error) {
        console.log(error);
    }

};

  

  if (req.method == "POST") {
    parseFile();
    // new Promise((resolve, reject) => {
    //     var a = uploadToPinata()
    //     if(a){
    //         resolve(a)
    //     }else{
    //         reject(a)
    //     }
    // }).then((message) => {
    //     console.log(message);
    // }).catch((error) => {
    //     console.log(error)
    // })
    // fs.unlinkSync(`${dir}/${files[0]}`)
    //res.setHeader("content-type", "application/json")
    //res.status(200).json({ response: "Successful" });
  }
}
