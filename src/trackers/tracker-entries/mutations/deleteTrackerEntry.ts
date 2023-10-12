import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTrackerEntrySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteTrackerEntrySchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const trackerEntry = await db.trackerEntry.deleteMany({ where: { id } })

    return trackerEntry
  }
)
