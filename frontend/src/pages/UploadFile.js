import { useState } from "react";
import axios from "axios";
import { Blob, NFTStorage } from "nft.storage";

const nftapi = process.env.NFTSTORAGE_API_KEY


export default function UploadFile() {
    const [selectedImage, setSelectImage] = useState("");
    const [viewImage, setViewImage] = useState("");
    const [text, setText] = useState("")
    const [description, setDescription] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [imageIPFS, setImageIPFS] = useState("");
    let tokenURITemplate = {
      name: "",
      description: "",
      image: "",
    }
    const handleFiles = async () => {
      if(!selectedImage) return
      const formData = new FormData();
      formData.append("File", selectedImage, text.toString());
      const res = await axios.post("/api/saveFile", formData);
      console.log(res)

      let tokenURIMetaData = {...tokenURITemplate}
      tokenURIMetaData.name = text;
      tokenURIMetaData.description = description;
      tokenURIMetaData.image = `ipfs://${res.data.IpfsHash}`;

      let imageIPFSURL = `https://ipfs.io/ipfs/${res.data.IpfsHash}`

      setImageIPFS(imageIPFSURL)

      console.log(tokenURIMetaData);
      //console.log(nftapi)


      const client = new NFTStorage({token: nftapi});
      const blob = new Blob([JSON.stringify(tokenURIMetaData)], {"type": "application/json"})
      const data = await client.storeBlob(blob)

      console.log(data);
      
      let tokenURIURL = `https://ipfs.io/ipfs/${data}`;
      console.log(tokenURIURL)
      setTokenURI(tokenURIURL)

      
    }
    return(
        <div className="flex flex-col items-center p-10 space-y-6">
            <img src={viewImage} alt="Upload file within 100MB" height="100" width="100"></img>
            
            <input type="text" onChange={(event) => {
                setText(event.target.value);
              }}/>
              <input type="text" onChange={(event) => {
                setDescription(event.target.value)
              }}/>
              <input type="file" name="SelectImage"  onChange={({target})=>{
              if(target.files){
                const file = target.files[0];
                setViewImage(URL.createObjectURL(file));
                setSelectImage(file);
              }
              }} />
              <a href={imageIPFS}>ImageLink</a>
              <a href={tokenURI}>TokenMetaDatLink</a>
              <button onClick={handleFiles}>Upload</button>
        </div>
    )
}

