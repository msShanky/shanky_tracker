import { resolver } from "@blitzjs/rpc"
import dayjs from "dayjs"
import db, { Prisma } from "db"

interface GetTrackersInput
  extends Pick<Prisma.TrackerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async () => {
  const date = dayjs()
  // const startDate = new Date(date.year(), date.month() - 1, 1) // Note: month is 0-indexed
  // const endDate = new Date(date.year(), date.month(), 0) // Last day of the selected month

  // Query the database to get all entries within the selected month
  const entries = await db.trackerEntry.findMany({
    where: {
      entryDateTime: {
        gte: date.startOf("month").toDate(),
        lte: date.endOf("month").toDate(),
      },
      trackerId: 1,
    },
    select: {
      entryDateTime: true,
      unit: true,
    },
  })

  // Create an object to store data for each day of the month
  const dailyData: { [day: number]: number } = {}

  // Initialize dailyData with 0 values for each day
  for (let day = 1; day <= date.endOf("month").date(); day++) {
    dailyData[day] = 0
  }

  // Aggregate the units for each day
  entries.forEach((entry) => {
    const entryDate = new Date(entry.entryDateTime)
    const day = entryDate.getDate()
    dailyData[day] += entry.unit
  })

  // Convert the aggregated data to an array of objects
  const chartData = Object.keys(dailyData).map((day) => ({
    day: parseInt(day),
    totalUnits: dailyData[day],
  }))

  return chartData
})
