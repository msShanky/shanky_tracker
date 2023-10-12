import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTrackerSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateTrackerSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tracker = await db.tracker.create({ data: input })

    return tracker
  }
)
