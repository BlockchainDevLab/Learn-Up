import {
    Program,
    AnchorProvider,
    Idl,
    setProvider,
} from "@project-serum/anchor"
import { Connection, PublicKey, Transaction, VersionedTransaction, Keypair, clusterApiUrl } from "@solana/web3.js"
import { IDL } from "./idl/learnup_program"


import dotenv from "dotenv"
import * as bs58 from "bs58"
import { Wallet, workspace } from "@coral-xyz/anchor"
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet"

dotenv.config()

const solanaConnection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed'
);
var secretKey1 = bs58.decode(process.env.PRIVATE_ADM_1 as string)
const admKey = Keypair.fromSecretKey(secretKey1)


const provider = new AnchorProvider(solanaConnection, new Wallet(admKey), {})
setProvider(provider)

const programId = new PublicKey("ENdQMhEY4G3mEMz9yFAVCV2aRJW4VVeqX1VeX2X3iZzP")
const prog = new Program(IDL as Idl, programId, provider)

export { solanaConnection, admKey, prog } 