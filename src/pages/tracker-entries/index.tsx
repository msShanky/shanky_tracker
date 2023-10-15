import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getTrackerEntries from "src/trackers/tracker-entries/queries/getTrackerEntries"
import { ActionIcon, Button, Table } from "@mantine/core"
import { ArrowTopRightOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import deleteTrackerEntry from "src/trackers/tracker-entries/mutations/deleteTrackerEntry"
import dayjs from "dayjs"

const ITEMS_PER_PAGE = 100

export const TrackerEntriesList = () => {
  const router = useRouter()
  const [deleteTrackerEntryMutation] = useMutation(deleteTrackerEntry)
  const page = Number(router.query.page) || 0
  const [{ trackerEntries, hasMore }] = usePaginatedQuery(getTrackerEntries, {
    orderBy: { entryDateTime: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const rows = trackerEntries.map((trackerEntry) => {
    return (
      <Table.Tr key={trackerEntry.id}>
        <Table.Td>{trackerEntry.id}</Table.Td>
        <Table.Td>{trackerEntry.trackerId}</Table.Td>
        <Table.Td>{trackerEntry.unit}</Table.Td>
        <Table.Td>{dayjs(trackerEntry.entryDateTime).format("DD/MM/YYYY hh:mm a")}</Table.Td>
        <Table.Td>{dayjs(trackerEntry.createdAt).format("DD/MM/YYYY hh:mm a")}</Table.Td>
        <Table.Td className="flex gap-2">
          <Link href={Routes.ShowTrackerEntryPage({ trackerEntryId: trackerEntry.id })}>
            <ActionIcon className="flex items-center justify-center bg-black w-max">
              <ArrowTopRightOnSquareIcon className="w-5 h-5 stroke-yellow-200 fill-transparent" />
            </ActionIcon>
          </Link>
          <ActionIcon
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteTrackerEntryMutation({ id: trackerEntry.id })
                await router.push(Routes.TrackerEntriesPage())
              }
            }}
            className="flex items-center justify-center bg-black w-max"
          >
            <TrashIcon className="w-5 h-5 stroke-yellow-200 fill-transparent" />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <div>
      <Table className="my-10">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Entry ID</Table.Th>
            <Table.Th>Tracker ID</Table.Th>
            <Table.Th>Unit</Table.Th>
            <Table.Th>Entry At</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <div className="fixed flex w-full gap-4 bottom-28">
        <Button
          disabled={page === 0}
          onClick={goToPreviousPage}
          className="text-black bg-yellow-200"
        >
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage} className="text-black bg-yellow-200">
          Next
        </Button>
      </div>
    </div>
  )
}

const TrackerEntriesPage = () => {
  return (
    <Layout>
      <Head>
        <title>TrackerEntries</title>
      </Head>

      <div>
        {/* Button Tray */}
        <div className="flex gap-4 my-4">
          <Button className="text-black bg-yellow-200">
            <Link href={Routes.Tracker()}>Back</Link>
          </Button>
          <Button className="text-black bg-yellow-200">
            <Link href={Routes.NewTrackerEntryPage()}>Create Tracker Entry</Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TrackerEntriesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TrackerEntriesPage
