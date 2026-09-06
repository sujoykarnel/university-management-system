import app from "./app"

const PORT = process.env.PORT || 5000

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    })

  } catch (error) {
    console.log(`Error Starting the Server:`, error);
    process.exit(1)
  }

}

main()
