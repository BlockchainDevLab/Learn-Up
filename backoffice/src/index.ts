async function main() {
  console.log("------------------------------------")
  console.log('create-course')
  console.log('create-instructor')
}


main()
  .then(() => {
    console.log("------------------------------------")
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })


