import { z } from "zod"

export const CreateTrackerEntrySchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  trackerId: z.number(),
  unit: z.number(),
})

export const UpdateTrackerEntrySchema = CreateTrackerEntrySchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTrackerEntrySchema = z.object({
  id: z.number(),
})
