import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTrackingGoalSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteTrackingGoalSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const trackingGoal = await db.trackingGoal.deleteMany({ where: { id } })

    return trackingGoal
  }
)
