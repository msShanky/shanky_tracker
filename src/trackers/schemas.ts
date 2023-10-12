import { z } from "zod"

export const CreateTrackerSchema = z.object({
  name: z.string(),
  objective: z.string(),
  description: z.string(),
  progress: z.string(),
  baseUnit: z.string(),
  destination: z.string(),
})
export const UpdateTrackerSchema = CreateTrackerSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTrackerSchema = z.object({
  id: z.number(),
})
