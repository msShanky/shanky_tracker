import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTrackerEntry from "src/trackers/tracker-entries/queries/getTrackerEntry"
import deleteTrackerEntry from "src/trackers/tracker-entries/mutations/deleteTrackerEntry"

export const TrackerEntry = () => {
  const router = useRouter()
  const trackerEntryId = useParam("trackerEntryId", "number")
  const [deleteTrackerEntryMutation] = useMutation(deleteTrackerEntry)
  const [trackerEntry] = useQuery(getTrackerEntry, { id: trackerEntryId })

  return (
    <>
      <Head>
        <title>TrackerEntry {trackerEntry.id}</title>
      </Head>

      <div>
        <h1>TrackerEntry {trackerEntry.id}</h1>
        <pre>{JSON.stringify(trackerEntry, null, 2)}</pre>

        <Link
          href={Routes.EditTrackerEntryPage({
            trackerEntryId: trackerEntry.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTrackerEntryMutation({ id: trackerEntry.id })
              await router.push(Routes.TrackerEntriesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTrackerEntryPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TrackerEntriesPage()}>TrackerEntries</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TrackerEntry />
      </Suspense>
    </div>
  )
}

ShowTrackerEntryPage.authenticate = true
ShowTrackerEntryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTrackerEntryPage
