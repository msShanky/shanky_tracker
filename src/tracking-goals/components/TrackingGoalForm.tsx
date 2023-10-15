import React, { Suspense } from "react"
import { Form, FormProps } from "@components/form/Form"
import { LabeledTextField } from "@components/form/LabeledTextField"
import { useForm } from "react-hook-form"

import { z } from "zod"
export { FORM_ERROR } from "@components/form/Form"

export function TrackingGoalForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { register } = useForm()
  return (
    <Form<S> {...props}>
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
      <LabeledTextField label="trackerId" name="trackerId" type="number" />
      <LabeledTextField label="recurringPeriod" name="recurringPeriod" />
      <LabeledTextField label="targetUnit" name="targetUnit" type="number" />
    </Form>
  )
}
