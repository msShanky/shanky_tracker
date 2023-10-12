import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getTrackingGoals from "src/trackers/tracking-goals/queries/getTrackingGoals"

const ITEMS_PER_PAGE = 100

export const TrackingGoalsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ trackingGoals, hasMore }] = usePaginatedQuery(getTrackingGoals, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {trackingGoals.map((trackingGoal) => (
          <li key={trackingGoal.id}>
            <Link
              href={Routes.ShowTrackingGoalPage({
                trackingGoalId: trackingGoal.id,
              })}
            >
              {trackingGoal.targetUnit}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TrackingGoalsPage = () => {
  return (
    <Layout>
      <Head>
        <title>TrackingGoals</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTrackingGoalPage()}>Create TrackingGoal</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TrackingGoalsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TrackingGoalsPage
