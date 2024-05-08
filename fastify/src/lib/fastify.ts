import Fastify, { FastifyInstance } from "fastify"

const port: number = 3000
const host: string = "0.0.0.0"

const app: FastifyInstance = await Fastify()

export { port, host, app }
