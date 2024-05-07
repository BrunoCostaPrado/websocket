import express, { Application } from "express"

import { Server } from "socket.io"
import { fileURLToPath } from "url"
import http from "http"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const APP_PORT = 3000

class App {
	private app: Application
	private http: http.Server
	private io: Server

	constructor() {
		this.app = express()
		this.http = http.createServer(this.app)
		this.io = new Server(this.http)
		this.listenSocket()
		this.setupRoutes()
	}
	listenServer() {
		this.http.listen(3000, () => console.log(`Server is running on Port:${APP_PORT}`))
	}

	listenSocket() {
		this.io.on("connection", (socket) => {
			console.log("User connected", socket.id)

			socket.on("message", (msg) => {
				console.log("Message from client", msg)
				this.io.emit("message", msg)
			})
		})
	}
	setupRoutes() {
		this.app.get("/", (req, res) => {
			res.sendFile(__dirname + "/index.html")
		})
	}
}
const app = new App()

app.listenServer()

// const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`

// app.use("/public", express.static("public"))
// app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"))
// app.get("/admin", (req, res) => res.sendFile(__dirname + "/public/admin.html"))

// server.listen(APP_PORT, () => {
// 	console.log(`Server started at ${APP_URL}:${APP_PORT}`)
// })
