import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateTrackingGoalSchema } from "src/trackers/tracking-goals/schemas"
import getTrackingGoal from "src/trackers/tracking-goals/queries/getTrackingGoal"
import updateTrackingGoal from "src/trackers/tracking-goals/mutations/updateTrackingGoal"
import { TrackingGoalForm, FORM_ERROR } from "src/tracking-goals/components/TrackingGoalForm"

export const EditTrackingGoal = () => {
  const router = useRouter()
  const trackingGoalId = useParam("trackingGoalId", "number")
  const [trackingGoal, { setQueryData }] = useQuery(
    getTrackingGoal,
    { id: trackingGoalId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTrackingGoalMutation] = useMutation(updateTrackingGoal)

  return (
    <>
      <Head>
        <title>Edit TrackingGoal {trackingGoal.id}</title>
      </Head>

      <div>
        <h1>Edit TrackingGoal {trackingGoal.id}</h1>
        <pre>{JSON.stringify(trackingGoal, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <TrackingGoalForm
            submitText="Update TrackingGoal"
            schema={UpdateTrackingGoalSchema}
            initialValues={trackingGoal}
            onSubmit={async (values) => {
              try {
                const updated = await updateTrackingGoalMutation({
                  // id: trackingGoal.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowTrackingGoalPage({ trackingGoalId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditTrackingGoalPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTrackingGoal />
      </Suspense>

      <p>
        <Link href={Routes.TrackingGoalsPage()}>TrackingGoals</Link>
      </p>
    </div>
  )
}

EditTrackingGoalPage.authenticate = true
EditTrackingGoalPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTrackingGoalPage
