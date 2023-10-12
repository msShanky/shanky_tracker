import { z } from "zod"

export const CreateTransactionModeSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  name: z.string(),
  category: z.string(),
})
export const UpdateTransactionModeSchema = CreateTransactionModeSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTransactionModeSchema = z.object({
  id: z.number(),
})
