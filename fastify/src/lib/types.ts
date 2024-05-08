import { z } from "zod"

const user = z.object({
	name: z.string(),
	age: z.number()
})
export type User = z.infer<typeof user>
