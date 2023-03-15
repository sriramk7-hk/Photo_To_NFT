import {  useEffect, useState } from "react";
import axios, { Axios } from "axios";

export default function UploadFile() {
    const [selectedImage, setSelectImage] = useState("");
    const [viewImage, setViewImage] = useState("");
    const [text, setText] = useState("")

    const handleFiles = async () => {
      if(!selectedImage) return
      const formData = new FormData();
      formData.append("File", selectedImage, text.toString());
      const data = await axios.post("/api/saveFile", formData);
      console.log(data)

      // await axios.get("api/saveFile").then((resp) => {
      //   console.log(resp)
      // })
      
      
    }
    return(
        <div className="flex flex-col items-center p-10 space-y-6">
            <img src={viewImage} alt="Upload file within 100MB" height="100" width="100"></img>
            <input type="text" onChange={(event) => {
                setText(event.target.value);
              }}/>
              <input type="file" name="SelectImage"  onChange={({target})=>{
              if(target.files){
                const file = target.files[0];
                setViewImage(URL.createObjectURL(file));
                setSelectImage(file);
              }
              }} />
              <button onClick={handleFiles}>Upload</button>
        </div>
    )
}

