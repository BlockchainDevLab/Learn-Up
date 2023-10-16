import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor"
import { Connection, PublicKey, Transaction, VersionedTransaction, Keypair } from "@solana/web3.js"
import { IDL } from "./idl/learnup_program"
import { SolanaWallet } from "@web3auth/solana-provider"


export async function InitialSetup(connection: Connection, solanaWallet: SolanaWallet) {

  const accounts = await solanaWallet.requestAccounts()

  interface AnchorWallet {
    publicKey: PublicKey;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
  }

  const adapterWeb3Wallet: AnchorWallet = {
    publicKey: new PublicKey(accounts[0]),
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T) { return solanaWallet.signTransaction(transaction) },
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]) { return solanaWallet.signAllTransactions(transactions) }
  }
  const MockWallet = {
    publicKey: Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
  }
  const wallet = adapterWeb3Wallet || MockWallet
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "processed", })
  setProvider(provider)

  const programId = new PublicKey("ENdQMhEY4G3mEMz9yFAVCV2aRJW4VVeqX1VeX2X3iZzP")
  const courseProgram = new Program(IDL as Idl, programId, provider)

  return courseProgram
}



