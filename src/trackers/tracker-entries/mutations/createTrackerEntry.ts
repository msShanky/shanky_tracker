import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTrackerEntrySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateTrackerEntrySchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const trackerEntry = await db.trackerEntry.create({ data: input })

    return trackerEntry
  }
)
