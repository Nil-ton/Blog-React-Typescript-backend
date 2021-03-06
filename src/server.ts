import express from "express"
import cors from "cors"
import router from "./routes"

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

server.listen(
	process.env.PORT || 8080,
	() => console.log(`http://localhost:${process.env.PORT || 8080}`)
)