
import * as web3 from "@solana/web3.js"
import * as anchor from "@coral-xyz/anchor";
import { prog } from "./setup";



async function createCourse(course: { title: string; desc: string; video: string; }) {

    const courseData = anchor.web3.Keypair.generate()

    const instructorPubKey = new web3.PublicKey("7rMXcfe1T6nwvewQHgJCuuPqpZ6CPgUarfxhyqK1oido")


    const tx = await prog.methods.createCourse(course.title, course.desc, course.video, new anchor.BN(50)).accounts(
        {
            course: courseData.publicKey,
            instructor: instructorPubKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([courseData]).rpc()


    const latestBlockHash = await prog.provider.connection.getLatestBlockhash();

    await prog.provider.connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: tx,
    });
}

async function main() {

    console.log('START')
    const course = [
        {
            title: "PostgreSQL Tutorial for Beginners",
            desc: "Learn PostgreSQL, one of the world's most advanced and robust open-source relational database systems.",
            video: "https://www.youtube.com/embed/SpfIwlAYaKk/"
        },
        {
            title: "Rust Programming Course for Beginners - Tutorial",
            desc: "Learn the Rust programming language in this course for beginners.",
            video: "https://www.youtube.com/embed/MsocPEZBd-M/"
        },
        {
            title: "Introduction to Programming and Computer Science - Full Course",
            desc: "In this course, you will learn basics of computer programming and computer science.",
            video: "https://www.youtube.com/embed/zOjov-2OZ0E?si=Hr3YfYCUtDlhh9v7"
        },
        {
            title: "Golang Tutorial for Beginners",
            desc: "You will learn everything you need to get started with Go and start using it in your projects.",
            video: "https://www.youtube.com/embed/un6ZyFkqFKo?si=Asorgzn8mpmAwze7"
        }
    ]


    for (var i = 0; i < course.length; i++) {

        console.log(course[i].title)
        console.log("--------")
        await createCourse(course[i])
        console.log("--------")
    }

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


