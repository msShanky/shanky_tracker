import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateTrackingGoalSchema } from "src/trackers/tracking-goals/schemas"
import createTrackingGoal from "src/trackers/tracking-goals/mutations/createTrackingGoal"
import { TrackingGoalForm, FORM_ERROR } from "src/tracking-goals/components/TrackingGoalForm"
import { Suspense } from "react"

const NewTrackingGoalPage = () => {
  const router = useRouter()
  const [createTrackingGoalMutation] = useMutation(createTrackingGoal)

  return (
    <Layout title={"Create New TrackingGoal"}>
      <h1>Create New TrackingGoal</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackingGoalForm
          submitText="Create TrackingGoal"
          schema={CreateTrackingGoalSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const trackingGoal = await createTrackingGoalMutation(values)
              await router.push(Routes.ShowTrackingGoalPage({ trackingGoalId: trackingGoal.id }))
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
        <Link href={Routes.TrackingGoalsPage()}>TrackingGoals</Link>
      </p>
    </Layout>
  )
}

NewTrackingGoalPage.authenticate = true

export default NewTrackingGoalPage
