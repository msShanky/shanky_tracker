import React, { Suspense } from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function TransactionModeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        name="name"
        placeholder="Name of the transaction mode"
        label={"Name of the transaction mode"}
      />
      <LabeledTextField
        name="category"
        placeholder="Category of the transaction mode"
        label={"Category of the transaction mode"}
      />
    </Form>
  )
}
