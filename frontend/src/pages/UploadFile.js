import { useState } from "react";
import axios from "axios";
import { Blob, NFTStorage } from "nft.storage";
import { ethers } from "ethers";
import { abiM, contractAddressM } from "constants/constants";

const nftapi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzNGVFN0ZjMzUxOTcwMjZEOTQ3Yzk2NkM4MGY5RDc4Q0FmZDhEMjciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3ODk4MjkyMzc2MiwibmFtZSI6IlByb2plY3RfMSJ9.yltH4xETYrpHOyAogkPvo3YGCegeeGyqUoRRDPnMWEg"


export default function UploadFile() {
    const [selectedImage, setSelectImage] = useState("");
    const [viewImage, setViewImage] = useState("");
    const [text, setText] = useState("")
    const [description, setDescription] = useState("");
    const [tokenURILink, setTokenURILink] = useState("");
    const [imageIPFS, setImageIPFS] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    let tokenURITemplate = {
      "title": "Asset Metadata",
      "type": "object",
      "properties": {
          "name": {
              "type": "string",
              "description": ""
          },
          "description": {
              "type": "string",
              "description": ""
          },
          "image": {
              "type": "string",
              "description": ""
          }
      }
  }



    const handleFiles = async () => {
      if(!selectedImage) return
      const formData = new FormData();
      formData.append("File", selectedImage, text.toString());
      const res = await axios.post("/api/saveFile", formData);
      console.log(res)

      let tokenURIMetaData = {...tokenURITemplate}
      tokenURIMetaData.properties.name.description = text;
      tokenURIMetaData.properties.description.description = description;
      tokenURIMetaData.properties.image.description = `ipfs://${res.data.IpfsHash}`;

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
      setTokenURILink(tokenURIURL)
      let tokenURIG = `ipfs://${data}`
      setTokenURI(tokenURIG);
      
    }
    const handleMint = async () => {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signers = providers.getSigner();
      const contract = new ethers.Contract(contractAddressM, abiM, signers);
      try {
        console.log("Minting Tokens")
        const transResp = await contract.mint(tokenURI);
        await transResp.wait(1);
        console.log("Token Minted");
        console.log(transResp)
      } catch (error) {
        console.log(error);
      }
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
              <a href={tokenURILink}>TokenMetaDatLink</a>
              <button onClick={handleFiles}>Upload</button>
              <button onClick={handleMint}>Mint</button>
        </div>
    )
}

