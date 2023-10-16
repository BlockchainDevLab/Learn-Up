import { Web3Auth } from "@web3auth/modal";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { SolanaWallet } from "@web3auth/solana-provider";

var userData = {}
var web3auth: Web3Auth

export const services = {
    connectWallet : async () => {
        web3auth = new Web3Auth({
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
      
          const web3AuthProvider = await web3auth.connect()
        
          const solanaWallet = (new SolanaWallet(web3AuthProvider))

          const accounts = await solanaWallet.requestAccounts();

          const connectionConfig = await solanaWallet.request({
          method: "solana_provider_config",
          params: [],
          });
      
          const connection = new Connection(connectionConfig.rpcTarget);
      
          // Fetch the balance for the specified public key
          const balance = await connection.getBalance(new PublicKey(accounts[0]));
      
          const user = {
              info : await web3auth.getUserInfo(),
              balance,
              key: accounts[0]
          }
          
          return {user, connection, solanaWallet}
    },
    
    getUserData: () => userData,

    logoutUser: async () => {
      await web3auth.logout()
    }
}