import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateTransactionModeSchema } from "src/finance/transaction-modes/schemas"
import createTransactionMode from "src/finance/transaction-modes/mutations/createTransactionMode"
import {
  TransactionModeForm,
  FORM_ERROR,
} from "src/finance/transaction-modes/components/TransactionModeForm"
import { Suspense } from "react"
import { Button } from "@mantine/core"

const NewTransactionModePage = () => {
  const router = useRouter()
  const [createTransactionModeMutation] = useMutation(createTransactionMode)

  return (
    <Layout title={"Create New TransactionMode"}>
      <h1 className="text-xl font-normal">Create New TransactionMode</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionModeForm
          submitText="Create"
          schema={CreateTransactionModeSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            console.log("The values received for form submit ==> ", values)
            try {
              const transactionMode = await createTransactionModeMutation(values)
              await router.push(
                Routes.ShowTransactionModePage({
                  transactionModeId: transactionMode.id,
                })
              )
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <Button className="text-black bg-orange-500">
        <Link href={Routes.TransactionModesPage()}>Cancel</Link>
      </Button>
    </Layout>
  )
}

NewTransactionModePage.authenticate = true

export default NewTransactionModePage
