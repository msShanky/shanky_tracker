import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getTransactionModes from "src/finance/transaction-modes/queries/getTransactionModes"

const ITEMS_PER_PAGE = 100

export const TransactionModesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ transactionModes, hasMore }] = usePaginatedQuery(getTransactionModes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {transactionModes.map((transactionMode) => (
          <li key={transactionMode.id}>
            <Link
              href={Routes.ShowTransactionModePage({
                transactionModeId: transactionMode.id,
              })}
            >
              {transactionMode.name}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TransactionModesPage = () => {
  return (
    <Layout>
      <Head>
        <title>TransactionModes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTransactionModePage()}>Create TransactionMode</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TransactionModesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TransactionModesPage
