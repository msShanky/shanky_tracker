import { z } from "zod"

export const CreateTrackingGoalSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
  trackerId: z.number(),
  recurringPeriod: z.enum(["DAILY", "WEEKLY", "MONTHLY"]),
  targetUnit: z.number(),
  // isActive: z.boolean(),
})
export const UpdateTrackingGoalSchema = CreateTrackingGoalSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteTrackingGoalSchema = z.object({
  id: z.number(),
})
