import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateTrackerEntrySchema } from "src/trackers/tracker-entries/schemas"
import createTrackerEntry from "src/trackers/tracker-entries/mutations/createTrackerEntry"
import { TrackerEntryForm, FORM_ERROR } from "src/tracker-entries/components/TrackerEntryForm"
import { Suspense } from "react"

const NewTrackerEntryPage = () => {
  const router = useRouter()
  const [createTrackerEntryMutation] = useMutation(createTrackerEntry)

  return (
    <Layout title={"Create New TrackerEntry"}>
      <h1>Create New TrackerEntry</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackerEntryForm
          submitText="Create TrackerEntry"
          schema={CreateTrackerEntrySchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const trackerEntry = await createTrackerEntryMutation(values)
              await router.push(Routes.ShowTrackerEntryPage({ trackerEntryId: trackerEntry.id }))
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
        <Link href={Routes.TrackerEntriesPage()}>TrackerEntries</Link>
      </p>
    </Layout>
  )
}

NewTrackerEntryPage.authenticate = true

export default NewTrackerEntryPage
