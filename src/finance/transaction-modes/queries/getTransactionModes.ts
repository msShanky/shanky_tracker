import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetTransactionModesInput
  extends Pick<Prisma.TransactionModeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTransactionModesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: transactionModes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.transactionMode.count({ where }),
      query: (paginateArgs) => db.transactionMode.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      transactionModes,
      nextPage,
      hasMore,
      count,
    }
  }
)
