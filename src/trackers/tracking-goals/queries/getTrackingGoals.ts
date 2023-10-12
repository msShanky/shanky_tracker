import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetTrackingGoalsInput
  extends Pick<Prisma.TrackingGoalFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTrackingGoalsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: trackingGoals,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.trackingGoal.count({ where }),
      query: (paginateArgs) => db.trackingGoal.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      trackingGoals,
      nextPage,
      hasMore,
      count,
    }
  }
)
