import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetTrackerEntriesInput
  extends Pick<Prisma.TrackerEntryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTrackerEntriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: trackerEntries,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.trackerEntry.count({ where }),
      query: (paginateArgs) => db.trackerEntry.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      trackerEntries,
      nextPage,
      hasMore,
      count,
    }
  }
)
