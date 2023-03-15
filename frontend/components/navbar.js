import { ConnectButton } from "@rainbow-me/rainbowkit";
function NavBar() {
    return(
        <div className="flex flex-row p-4 bg-black flex-wrap">
            <div className="text-4xl pl-[15px] text-white">Pudhina</div>
            <div className="pr-[15px]">
                <ConnectButton label="Connect Wallet" />
            </div>
        </div>
        
    )
}

export default NavBar;