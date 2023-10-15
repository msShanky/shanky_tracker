import React from "react"
import { FORM_ERROR, TrackerEntryForm } from "./TrackerEntryForm"
import {
  CreateTrackerEntryFormSchema,
  CreateTrackerEntrySchema,
} from "src/trackers/tracker-entries/schemas"
import { useMutation } from "@blitzjs/rpc"
import createTrackerEntry from "src/trackers/tracker-entries/mutations/createTrackerEntry"
import { TrackerEntry } from "@prisma/client"
import { Routes } from "@blitzjs/next"

type TrackerEntryInstantProps = {
  closeDrawer: () => void
}

export const TrackerEntryInstant = (props: TrackerEntryInstantProps) => {
  const { closeDrawer } = props
  const [createTrackerEntryMutation] = useMutation(createTrackerEntry)

  const handleFormSubmit = async (values) => {
    const postBody: Omit<TrackerEntry, "id" | "createdAt" | "updatedAt"> = {
      trackerId: parseInt(values.trackerId),
      unit: values.unit ?? 1,
      entryDateTime: values.entryDateTime ?? new Date(),
    }

    try {
      await createTrackerEntryMutation(postBody)
      // await Routes.TrackersPage()
      closeDrawer()
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <div>
      <TrackerEntryForm
        submitText="Create TrackerEntry"
        schema={CreateTrackerEntryFormSchema}
        onSubmit={async (values) => {
          console.log("Form values for instant entry tracker", values)
          await handleFormSubmit(values)
        }}
      />
    </div>
  )
}
