import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTrackingGoalSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateTrackingGoalSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const trackingGoal = await db.trackingGoal.update({ where: { id }, data })

    return trackingGoal
  }
)
