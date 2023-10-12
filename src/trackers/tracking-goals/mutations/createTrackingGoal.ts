import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTrackingGoalSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateTrackingGoalSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const trackingGoal = await db.trackingGoal.create({ data: input })

    return trackingGoal
  }
)
