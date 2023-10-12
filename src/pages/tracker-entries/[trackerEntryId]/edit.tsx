import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateTrackerEntrySchema } from "src/trackers/tracker-entries/schemas"
import getTrackerEntry from "src/trackers/tracker-entries/queries/getTrackerEntry"
import updateTrackerEntry from "src/trackers/tracker-entries/mutations/updateTrackerEntry"
import { TrackerEntryForm, FORM_ERROR } from "src/tracker-entries/components/TrackerEntryForm"

export const EditTrackerEntry = () => {
  const router = useRouter()
  const trackerEntryId = useParam("trackerEntryId", "number")
  const [trackerEntry, { setQueryData }] = useQuery(
    getTrackerEntry,
    { id: trackerEntryId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTrackerEntryMutation] = useMutation(updateTrackerEntry)

  return (
    <>
      <Head>
        <title>Edit TrackerEntry {trackerEntry.id}</title>
      </Head>

      <div>
        <h1>Edit TrackerEntry {trackerEntry.id}</h1>
        <pre>{JSON.stringify(trackerEntry, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <TrackerEntryForm
            submitText="Update TrackerEntry"
            schema={UpdateTrackerEntrySchema}
            initialValues={trackerEntry}
            onSubmit={async (values) => {
              try {
                const updated = await updateTrackerEntryMutation({
                  // id: trackerEntry.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowTrackerEntryPage({ trackerEntryId: updated.id }))
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

const EditTrackerEntryPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTrackerEntry />
      </Suspense>

      <p>
        <Link href={Routes.TrackerEntriesPage()}>TrackerEntries</Link>
      </p>
    </div>
  )
}

EditTrackerEntryPage.authenticate = true
EditTrackerEntryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTrackerEntryPage
