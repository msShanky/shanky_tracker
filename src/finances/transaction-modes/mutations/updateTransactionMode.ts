import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTransactionModeSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateTransactionModeSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transactionMode = await db.transactionMode.update({
      where: { id },
      data,
    })

    return transactionMode
  }
)
