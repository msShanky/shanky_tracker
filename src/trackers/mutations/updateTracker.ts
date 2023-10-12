import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTrackerSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateTrackerSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tracker = await db.tracker.update({ where: { id }, data })

    return tracker
  }
)
