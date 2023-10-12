import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTracker from "src/trackers/queries/getTracker"
import deleteTracker from "src/trackers/mutations/deleteTracker"

export const Tracker = () => {
  const router = useRouter()
  const trackerId = useParam("trackerId", "number")
  const [deleteTrackerMutation] = useMutation(deleteTracker)
  const [tracker] = useQuery(getTracker, { id: trackerId })

  return (
    <>
      <Head>
        <title>Tracker {tracker.id}</title>
      </Head>

      <div>
        <h1>Tracker {tracker.id}</h1>
        <pre>{JSON.stringify(tracker, null, 2)}</pre>

        <Link href={Routes.EditTrackerPage({ trackerId: tracker.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTrackerMutation({ id: tracker.id })
              await router.push(Routes.TrackersPage())
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

const ShowTrackerPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TrackersPage()}>Trackers</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Tracker />
      </Suspense>
    </div>
  )
}

ShowTrackerPage.authenticate = true
ShowTrackerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTrackerPage
