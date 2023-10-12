import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getTrackerEntries from "src/trackers/tracker-entries/queries/getTrackerEntries"

const ITEMS_PER_PAGE = 100

export const TrackerEntriesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ trackerEntries, hasMore }] = usePaginatedQuery(getTrackerEntries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {trackerEntries.map((trackerEntry) => (
          <li key={trackerEntry.id}>
            <Link
              href={Routes.ShowTrackerEntryPage({
                trackerEntryId: trackerEntry.id,
              })}
            >
              {trackerEntry.id}
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

const TrackerEntriesPage = () => {
  return (
    <Layout>
      <Head>
        <title>TrackerEntries</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTrackerEntryPage()}>Create TrackerEntry</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TrackerEntriesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TrackerEntriesPage
