import * as anchor from "@project-serum/anchor"
import { PublicKey, Transaction } from "@solana/web3.js"
import { SolanaWallet } from "@web3auth/solana-provider";

export const createCourse = async (program, name, uri, publicKey) => {

  console.log(publicKey)
  console.log(program)

  const balance = await program.provider.connection.getBalance(new PublicKey(publicKey));
  console.log(balance.toString());

  const blogAcc = anchor.web3.Keypair.generate()

  const tx = await program.methods.postBlog(name, uri).accounts(
    {
      blog: blogAcc.publicKey,
      author: new PublicKey(publicKey),
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([blogAcc]).rpc()

  const latestBlockHash = await program.provider.connection.getLatestBlockhash();

  await program.provider.connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: tx,
  });

  console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
}