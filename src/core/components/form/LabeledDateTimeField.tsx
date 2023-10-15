import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { DateTimePicker } from "@mantine/dates"

export interface LabeledDateTimeFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledDateTimeField = forwardRef<HTMLInputElement, LabeledDateTimeFieldProps>(
  ({ label, outerProps, labelProps, name, type, ...props }, ref) => {
    const {
      getValues,
      setValue,
      formState: { isSubmitting, errors },
    } = useFormContext()

    // console.log("errors form ==> ", errors)

    return (
      <div {...outerProps}>
        <label {...labelProps} className="flex flex-col items-start text-base">
          {label}
          <DateTimePicker
            valueFormat="DD/MM/YYYY hh:mm a"
            firstDayOfWeek={0}
            defaultValue={getValues(name)}
            onChange={(dateValue) => setValue(name, dateValue)}
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
