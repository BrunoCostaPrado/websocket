import { app, host, port } from "@/lib/fastify"

import websocket from "@fastify/websocket"

app.register(websocket, { options: { maxPayload: 1048576 } })

app.get("/hello", async (req, reply) => {
	return await reply.status(202).send("hello")
})

app.register(async function (app) {
	app.get("/hello-ws", { websocket: true }, (socket, req) => {
		socket.on("message", (message) => {
			socket.send("Hi")
		})

		socket.on("close", () => {
			// Handle WebSocket connection close here
			console.log("WebSocket connection closed")
		})
	})
})

export async function main() {
	await app.listen({ port, host })

	console.log(`Server listening on ${host}:${port}`)
}

main()
