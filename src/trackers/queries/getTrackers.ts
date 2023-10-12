import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetTrackersInput
  extends Pick<Prisma.TrackerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTrackersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: trackers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tracker.count({ where }),
      query: (paginateArgs) => db.tracker.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      trackers,
      nextPage,
      hasMore,
      count,
    }
  }
)
