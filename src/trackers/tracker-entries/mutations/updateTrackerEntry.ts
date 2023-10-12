import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTrackerEntrySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateTrackerEntrySchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const trackerEntry = await db.trackerEntry.update({ where: { id }, data })

    return trackerEntry
  }
)
