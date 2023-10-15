import React, { Suspense } from "react"
import { Form, FormProps } from "@components/form/Form"
import { LabeledTextField } from "@components/form/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "@components/form/Form"

export function TrackerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField label="Name" name="name" />
      <LabeledTextField label="Objective" name="objective" />
      <LabeledTextField label="Description" name="description" />
      <LabeledTextField label="Progress" name="progress" />
      <LabeledTextField label="BaseUnit" name="baseUnit" />
      <LabeledTextField label="Destination" name="destination" />
    </Form>
  )
}
