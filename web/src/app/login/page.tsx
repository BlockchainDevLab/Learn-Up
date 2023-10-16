"use client"
import { Web3Auth } from "@web3auth/modal";

export default async function Page() {
    
  async function connect() {
    console.log(process)
    
    const web3auth = new Web3Auth({
      clientId: process.env.NEXT_PUBLIC_WEB3_CLIENT_ID as string, // Get your Client ID from the Web3Auth Dashboard
      web3AuthNetwork: "sapphire_devnet",
      chainConfig: {
        chainNamespace: "solana",
        rpcTarget: "https://api.devnet.solana.com",
        displayName: "Solana devnet",
        blockExplorer: "https://explorer.solana.com/?cluster=devnet",
        ticker: "SOL",
        tickerName: "Solana",
      },
    });

    await web3auth.initModal()

    await web3auth.connect()
  } 
      
    return (
      <>
        <strong>Hello world</strong><br/>
        <button onClick={connect}>Conectar</button>
      </>
    )
}