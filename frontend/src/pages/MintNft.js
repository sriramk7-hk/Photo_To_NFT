import { ethers } from "ethers"
import { useState } from "react";
import {abi, contractAddress} from "./constants/constant"


export default function MintNft(){

    const [fee, setFee] = useState("0")

    const mintNFT = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.MintNft({
                value: ethers.utils.parse(fee)
            })
            console.log(`Mining ${transactionResponse.hash}`)
            try {
                await provider.once(transactionResponse.hash, (transactionReceipt) => {
                    console.log(`Completed with ${transactionReceipt.confirmations} confiramtions`);
                })
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            
        }

    }

    return(
        <>
            <input type="number" onChange={(event) => {
                setFee(event.target.value);
            }}/>
            <button onClick={mintNFT}>Mint NFT</button>
        </>
        
    )
}