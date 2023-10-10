import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateTransactionModeSchema } from "src/finance/transaction-modes/schemas"
import getTransactionMode from "src/finance/transaction-modes/queries/getTransactionMode"
import updateTransactionMode from "src/finance/transaction-modes/mutations/updateTransactionMode"
import {
  TransactionModeForm,
  FORM_ERROR,
} from "src/finance/transaction-modes/components/TransactionModeForm"

export const EditTransactionMode = () => {
  const router = useRouter()
  const transactionModeId = useParam("transactionModeId", "number")
  const [transactionMode, { setQueryData }] = useQuery(
    getTransactionMode,
    { id: transactionModeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTransactionModeMutation] = useMutation(updateTransactionMode)

  return (
    <>
      <Head>
        <title>Edit TransactionMode {transactionMode.id}</title>
      </Head>

      <div>
        <h1>Edit TransactionMode {transactionMode.id}</h1>
        <pre>{JSON.stringify(transactionMode, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <TransactionModeForm
            submitText="Update TransactionMode"
            schema={UpdateTransactionModeSchema}
            initialValues={transactionMode}
            onSubmit={async (values) => {
              try {
                const updated = await updateTransactionModeMutation({
                  id: transactionMode.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(
                  Routes.ShowTransactionModePage({
                    transactionModeId: updated.id,
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
      </div>
    </>
  )
}

const EditTransactionModePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTransactionMode />
      </Suspense>

      <p>
        <Link href={Routes.TransactionModesPage()}>TransactionModes</Link>
      </p>
    </div>
  )
}

EditTransactionModePage.authenticate = true
EditTransactionModePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTransactionModePage
