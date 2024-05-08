import a from "fastify"
var t = 3e3,
	n = "0.0.0.0",
	o = await a()
import r from "@fastify/websocket"
o.register(r, { options: { maxPayload: 1048576 } })
o.get("/hello", async (s, e) => await e.status(202).send("hello"))
o.register(async function (s) {
	s.get("/hello-ws", { websocket: !0 }, (e, c) => {
		e.on("message", (l) => {
			e.send("Hi")
		}),
			e.on("close", () => {
				console.log("WebSocket connection closed")
			})
	})
})
async function i() {
	await o.listen({ port: t, host: n }), console.log(`Server listening on ${n}:${t}`)
}
i()
export { i as main }
