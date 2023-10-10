import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTransactionModeSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateTransactionModeSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transactionMode = await db.transactionMode.create({ data: input })

    return transactionMode
  }
)
