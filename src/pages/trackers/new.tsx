import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateTrackerSchema } from "src/trackers/schemas"
import createTracker from "src/trackers/mutations/createTracker"
import { TrackerForm, FORM_ERROR } from "src/trackers/components/TrackerForm"

const NewTrackerPage = () => {
  const router = useRouter()
  const [createTrackerMutation] = useMutation(createTracker)

  return (
    <Layout title={"Create New Tracker"}>
      <h1>Create New Tracker</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackerForm
          submitText="Create Tracker"
          schema={CreateTrackerSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const tracker = await createTrackerMutation(values)
              await router.push(Routes.ShowTrackerPage({ trackerId: tracker.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.TrackersPage()}>Trackers</Link>
      </p>
    </Layout>
  )
}

NewTrackerPage.authenticate = true

export default NewTrackerPage
