import { z } from "zod"
import { useQuery } from "@blitzjs/rpc"
import React, { Suspense, useState } from "react"
import { Form, FormProps } from "@components/form/Form"
import { LabeledSelectField, LabeledTextField, LabeledDateTimeField } from "@components/form"

import getTrackers from "src/trackers/queries/getTrackers"
import { Switch } from "@mantine/core"
export { FORM_ERROR } from "@components/form/Form"

export function TrackerEntryForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [checked, setChecked] = useState(false)
  const [{ trackers, hasMore, count }] = useQuery(getTrackers, {})

  const trackerSelectEntries = trackers.map((entry) => {
    return { value: entry.id.toString(), label: entry.name }
  })

  return (
    <Form<S> {...props}>
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="Is Custom Entry"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LabeledSelectField label="TrackerID" name="trackerId" options={trackerSelectEntries} />
      </Suspense>
      {checked && (
        <>
          <LabeledTextField label="Unit" name="unit" type="number" />
          <LabeledDateTimeField label="Entry Date" name="entryDateTime" type="number" />
        </>
      )}
    </Form>
  )
}
