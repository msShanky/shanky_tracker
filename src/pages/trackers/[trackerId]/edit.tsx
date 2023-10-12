import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateTrackerSchema } from "src/trackers/schemas"
import getTracker from "src/trackers/queries/getTracker"
import updateTracker from "src/trackers/mutations/updateTracker"
import { TrackerForm, FORM_ERROR } from "src/trackers/components/TrackerForm"

export const EditTracker = () => {
  const router = useRouter()
  const trackerId = useParam("trackerId", "number")
  const [tracker, { setQueryData }] = useQuery(
    getTracker,
    { id: trackerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTrackerMutation] = useMutation(updateTracker)

  return (
    <>
      <Head>
        <title>Edit Tracker {tracker.id}</title>
      </Head>

      <div>
        <h1>Edit Tracker {tracker.id}</h1>
        <pre>{JSON.stringify(tracker, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <TrackerForm
            submitText="Update Tracker"
            schema={UpdateTrackerSchema}
            initialValues={tracker}
            onSubmit={async (values) => {
              try {
                const updated = await updateTrackerMutation({
                  id: tracker.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowTrackerPage({ trackerId: updated.id }))
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

const EditTrackerPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTracker />
      </Suspense>

      <p>
        <Link href={Routes.TrackersPage()}>Trackers</Link>
      </p>
    </div>
  )
}

EditTrackerPage.authenticate = true
EditTrackerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTrackerPage
