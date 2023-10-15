import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { Select } from "@mantine/core"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  options: Array<{ value: any; label: string }>
}

export const LabeledSelectField = forwardRef<HTMLInputElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, type, options, ...props }, ref) => {
    const {
      getValues,
      setValue,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <label {...labelProps} className="flex flex-col items-start text-base">
          {label}
          <Select
            placeholder="Pick value"
            data={options}
            value={getValues(name)}
            onChange={(event) => {
              // setStateValue(event)
              setValue(name, event)
            }}
            // onSelect={(value) => {
            //   console.log("Value from select", value.currentTarget.id)
            //   setValue(value)
            // }}
          />
        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />
      </div>
    )
  }
)
