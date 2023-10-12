import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTrackingGoal from "src/trackers/tracking-goals/queries/getTrackingGoal"
import deleteTrackingGoal from "src/trackers/tracking-goals/mutations/deleteTrackingGoal"

export const TrackingGoal = () => {
  const router = useRouter()
  const trackingGoalId = useParam("trackingGoalId", "number")
  const [deleteTrackingGoalMutation] = useMutation(deleteTrackingGoal)
  const [trackingGoal] = useQuery(getTrackingGoal, { id: trackingGoalId })

  return (
    <>
      <Head>
        <title>TrackingGoal {trackingGoal.id}</title>
      </Head>

      <div>
        <h1>TrackingGoal {trackingGoal.id}</h1>
        <pre>{JSON.stringify(trackingGoal, null, 2)}</pre>

        <Link
          href={Routes.EditTrackingGoalPage({
            trackingGoalId: trackingGoal.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTrackingGoalMutation({ id: trackingGoal.id })
              await router.push(Routes.TrackingGoalsPage())
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

const ShowTrackingGoalPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TrackingGoalsPage()}>TrackingGoals</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TrackingGoal />
      </Suspense>
    </div>
  )
}

ShowTrackingGoalPage.authenticate = true
ShowTrackingGoalPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTrackingGoalPage
