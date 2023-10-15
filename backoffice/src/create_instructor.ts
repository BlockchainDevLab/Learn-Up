
import * as web3 from "@solana/web3.js"
import * as anchor from "@coral-xyz/anchor";
import { solanaConnection, prog } from "./setup";



async function createInstructor(nm: string, desc: string) {


    const instructorData = anchor.web3.Keypair.generate()

    console.log(instructorData.publicKey)

    const tx = await prog.methods.createInstructor(nm, desc).accounts(
        {
            instructor: instructorData.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([instructorData]).rpc()

    const latestBlockHash = await prog.provider.connection.getLatestBlockhash();

    await prog.provider.connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: tx,
    });

}

async function main() {

    console.log('START')
    const balance = await solanaConnection.getBalance(new web3.PublicKey('DG8XN3r8u3UaTF2CRo3TVxxPnYNTwhXjXjJmofCxB615'))
    console.log(balance)
    console.log("")
    await createInstructor("freecodecamp", "Learn to code for free.")
    console.log('FINISH')
}


main()
    .then(() => {
        console.log("Finished successfully")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })


