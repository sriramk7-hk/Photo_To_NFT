// import '@/styles/globals.css'
// import { RainbowKitProvider, getDefaultWallets, Chain } from '@rainbow-me/rainbowkit';
// import { WagmiConfig, configureChains, createConfig } from 'wagmi';
// import {sepolia} from "wagmi/chains"
// import {alchemyProvider} from 'wagmi/providers/alchemy'
// import "@rainbow-me/rainbowkit/styles.css"

// const {chains, provider} = configureChains(
//   [sepolia],
//   [alchemyProvider({apiKey: process.env.SEPOLIA_API_KEY})]
// )
// const projectId = "2790926731e750e785299f0ac70cc1bb"
// const {connectors} = getDefaultWallets({
//   appName: "Pudhina",
//   projectId,
//   chains
// })

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   provider
// })


export default function App({ Component, pageProps }) {
  return(
    // <WagmiConfig>
    //   <RainbowKitProvider modalSize="compact">
        
    //   </RainbowKitProvider>
    // </WagmiConfig>
    <Component {...pageProps} />
  )
}
