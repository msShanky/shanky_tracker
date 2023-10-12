import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTransactionModeSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteTransactionModeSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transactionMode = await db.transactionMode.deleteMany({
      where: { id },
    })

    return transactionMode
  }
)
