import { ConnectButton } from "@rainbow-me/rainbowkit";
function NavBar() {
    return(
        <div className="flex flex-row p-4 bg-black justify-between">
            <div className="text-4xl pl-[15px] text-white ">புதினா</div>
            <div>
                <ConnectButton label="Connect Wallet" />
            </div>
        </div>
        
    )
}

export default NavBar;