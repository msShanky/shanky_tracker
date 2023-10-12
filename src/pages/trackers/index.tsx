import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getTrackers from "src/trackers/queries/getTrackers"

const ITEMS_PER_PAGE = 100

export const TrackersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ trackers, hasMore }] = usePaginatedQuery(getTrackers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {trackers.map((tracker) => (
          <li key={tracker.id}>
            <Link href={Routes.ShowTrackerPage({ trackerId: tracker.id })}>{tracker.name}</Link>
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

const TrackersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Trackers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTrackerPage()}>Create Tracker</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TrackersList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TrackersPage
