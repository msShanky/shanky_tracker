import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTrackerSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteTrackerSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tracker = await db.tracker.deleteMany({ where: { id } })

    return tracker
  }
)
