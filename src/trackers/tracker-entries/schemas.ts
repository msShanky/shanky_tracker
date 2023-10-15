import { z } from "zod"

export const CreateTrackerEntrySchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  trackerId: z.number(),
  unit: z.number(),
  entryDateTime: z.date(),
})

export const CreateTrackerEntryFormSchema = z.object({
  trackerId: z.string(),
  unit: z.number().optional(),
  entryDateTime: z.date().optional(),
})

export const CreateInstantTrackerEntrySchema = z.object({
  trackerId: z.number(),
  unit: z.number(),
  entryDateTime: z.date(),
})

export const UpdateTrackerEntrySchema = CreateTrackerEntrySchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTrackerEntrySchema = z.object({
  id: z.number(),
})
