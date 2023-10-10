import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTransactionMode from "src/finance/transaction-modes/queries/getTransactionMode"
import deleteTransactionMode from "src/finance/transaction-modes/mutations/deleteTransactionMode"

export const TransactionMode = () => {
  const router = useRouter()
  const transactionModeId = useParam("transactionModeId", "number")
  const [deleteTransactionModeMutation] = useMutation(deleteTransactionMode)
  const [transactionMode] = useQuery(getTransactionMode, {
    id: transactionModeId,
  })

  return (
    <>
      <Head>
        <title>TransactionMode {transactionMode.id}</title>
      </Head>

      <div>
        <h1>TransactionMode {transactionMode.id}</h1>
        <pre>{JSON.stringify(transactionMode, null, 2)}</pre>

        <Link
          href={Routes.EditTransactionModePage({
            transactionModeId: transactionMode.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTransactionModeMutation({ id: transactionMode.id })
              await router.push(Routes.TransactionModesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTransactionModePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TransactionModesPage()}>TransactionModes</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TransactionMode />
      </Suspense>
    </div>
  )
}

ShowTransactionModePage.authenticate = true
ShowTransactionModePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTransactionModePage
