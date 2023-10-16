import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { LearnupProgram } from "../target/types/learnup_program";
import {
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccount,
    getOrCreateAssociatedTokenAccount,
    createMint,
    mintTo
} from "@solana/spl-token";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { Keypair } from "@solana/web3.js";


describe("course_program", () => {

    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider)
    const program = anchor.workspace.LearnupProgram as Program<LearnupProgram>

    const courseData = anchor.web3.Keypair.generate()

    const studentKey = anchor.web3.Keypair.generate()

    const studentData = anchor.web3.Keypair.generate()

    const instructorData = anchor.web3.Keypair.generate()

    const treasuryAddress = anchor.web3.Keypair.generate()

    const mockTokenMint = anchor.web3.Keypair.generate()

    const infoCoursesAccount = anchor.web3.Keypair.generate()

    const payerSigner = (provider.wallet as NodeWallet).payer;

    const payerKeypar = anchor.web3.Keypair.fromSecretKey(payerSigner.secretKey)

    async function requestSOL() {

        await provider.connection.requestAirdrop(studentKey.publicKey, 10000000000000000)

        await provider.connection.requestAirdrop(payerSigner.publicKey, 100000000000000000)

        let tx = await provider.connection.requestAirdrop(treasuryAddress.publicKey, 90000000000000000)
        const { blockhash, lastValidBlockHeight } = await provider.connection.getLatestBlockhash()

        await provider.connection.confirmTransaction(
            {
                blockhash,
                lastValidBlockHeight,
                signature: tx,
            },
            "finalized"
        )
    }

    it('course_program - initialize', async () => {

        await requestSOL()
        //start mint 
        const txMint = await createMint(
            provider.connection,
            payerSigner,
            treasuryAddress.publicKey,
            treasuryAddress.publicKey,
            8,   // Decimals
            mockTokenMint,
            null,
            TOKEN_PROGRAM_ID      // SPL token program ID.
        );

        //  pub fn initialize(ctx: Context<InitializeCourse>, init_course: InitCourse)


        const initCourse = {
            percentageTreasury: new anchor.BN(25),
            percentageInstructor: new anchor.BN(75),
            tokenAddress: mockTokenMint.publicKey,
            treasuryAddress: treasuryAddress.publicKey
        } as any;


        const tx = await program.methods.initialize(initCourse).accounts(
            {
                infoCourses: infoCoursesAccount.publicKey,
                admin: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([infoCoursesAccount]).rpc()

        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
        });

        /*
        console.log("Your transaction signature", tx);
        const infoAccount = await program.account.infoCourses.fetch(infoCoursesAccount.publicKey);
        console.log("Account Info Course:", infoAccount)
        console.log("Account Info Course Instructor:", infoAccount.percentageInstructor.toNumber())
        console.log("Account Info Course Treasury:", infoAccount.percentageTreasury.toNumber())
        */


    });

    it("create_student", async () => {

        const tx = await program.methods.createStudent("ESTUDANTE 01", "ipfs://454543554543545/01.json").accounts(
            {
                student: studentData.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([studentData]).rpc()

        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
        });

    });


    it("create_instructor", async () => {

        const tx = await program.methods.createInstructor("Instructor 01", "ipfs://454543554543545/01.json").accounts(
            {
                instructor: instructorData.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([instructorData]).rpc()

        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
        });

    });


    it("create_course", async () => {

        var title = "Report course blockchain"
        var course_uri = "ipfs://bafybeiel4r55724bykxs7do4mreq2n4widbnesrxlp5c5kieigstierp6q/2023-03-1050.json"

        const tx = await program.methods.createCourse(title, course_uri, course_uri, new anchor.BN(50)).accounts(
            {
                course: courseData.publicKey,
                instructor: instructorData.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([courseData]).rpc()


        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
        });

    });

    it('add_course', async () => {

        const tx = await program.methods.addCourse().accounts(
            {
                course: courseData.publicKey,
                student: studentData.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([payerSigner]).rpc()


        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
        });
    });



    it('pay_course', async () => {

        // Generate keypairs for the new accounts

        /*  const fromKp = pg.wallet.keypair;
          const toKp = new anchor.web3.Keypair();
  
          // Create a new mint and initialize it
          const mintKp = new anchor.web3.Keypair();
          const mint = await createMint(
              pg.program.provider.connection,
              pg.wallet.keypair,
              fromKp.publicKey,
              null,
              0
          );
  
          // Create associated token accounts for the new accounts
          const fromAta = await createAssociatedTokenAccount(
              pg.program.provider.connection,
              pg.wallet.keypair,
              mint,
              fromKp.publicKey
          );
          const toAta = await createAssociatedTokenAccount(
              pg.program.provider.connection,
              pg.wallet.keypair,
              mint,
              toKp.publicKey
          );
          // Mint tokens to the 'from' associated token account
          const mintAmount = 1000;
          await mintTo(
              pg.program.provider.connection,
              pg.wallet.keypair,
              mint,
              fromAta,
              pg.wallet.keypair.publicKey,
              mintAmount
          );
  
          // Send transaction
          const transferAmount = new BN(500);
  
          const txHash = await pg.program.methods
              .transferSplTokens(transferAmount)
              .accounts({
                  from: fromKp.publicKey,
                  fromAta: fromAta,
                  toAta: toAta,
                  tokenProgram: TOKEN_PROGRAM_ID,
              })
              .signers([pg.wallet.keypair, fromKp])
              .rpc();
              */


        /*#[account(mut)]
        pub course: Account<'info, Course>,
        #[account(mut)]
        pub info: Account<'info, InfoCourses>,
        pub student_sig: Signer<'info>,
        #[account(mut)]
        pub student_tk: Account<'info, TokenAccount>,
        #[account(mut)]
        pub instructor_tk: Account<'info, TokenAccount>,
        #[account(mut)]
        pub treasury_tk: Account<'info, TokenAccount>,
        pub token_program: Program<'info, Token>,
        */

        await requestSOL()

        const student = (await program.account.student.fetch(studentData.publicKey)) ?? {}
        console.log(student.accountKey)

        const instructor = (await program.account.instructor.fetch(instructorData.publicKey)) ?? {}
        console.log(instructor.accountKey)

        const info = (await program.account.infoCourses.all()) ?? []
        console.log(info[0].account.treasuryAddress)


        /*

        const mint2 = await createMint(
            provider.connection,
            treasuryAddress,
            student.accountKey,
            treasuryAddress.publicKey,
            9 // We are using 9 to match the CLI decimal default exactly
        );

        console.log(mint2.toBase58());
*/

        /*
   
      const studentTokenAccount = await getOrCreateAssociatedTokenAccount(
          provider.connection,
          payerKeypar,
          mintTk,
          student.accountKey,
      )


      console.log(studentTokenAccount)
      */



        /*
        const studentTokenAccount = await getOrCreateAssociatedTokenAccount(
            provider.connection,
            payerSigner,
            mint,
            student.PublicKey,
        )

      
        const course = (await program.account.student.fetch(studentData.publicKey)) ?? {}
        const tx = await program.methods.payCourse().accounts(
            {
                course: courseData.publicKey,
                info: infoCoursesAccount.publicKey,
                student_tk:studentTokenAccount, 
                instructor_tk:studentTokenAccount, 
                treasury_tk:studentTokenAccount, 
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([payerSigner]).rpc()


        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
        });
        */
    });

});
