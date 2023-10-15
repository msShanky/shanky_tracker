import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getTrackers from "src/trackers/queries/getTrackers"
import { ActionIcon, Button, Table } from "@mantine/core"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

const ITEMS_PER_PAGE = 100

export const TrackersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ trackers, hasMore }] = usePaginatedQuery(getTrackers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const rows = trackers.map((tracker) => {
    return (
      <Table.Tr key={tracker.id}>
        <Table.Td>{tracker.id}</Table.Td>
        <Table.Td>{tracker.name}</Table.Td>
        <Table.Td>{tracker.baseUnit}</Table.Td>
        <Table.Td>{tracker.description}</Table.Td>
        <Table.Td>{tracker.objective}</Table.Td>
        <Table.Td>{tracker.progress}</Table.Td>
        <Table.Td>{tracker.createdAt.toLocaleString()}</Table.Td>
        <Table.Td>
          <Link href={Routes.ShowTrackerPage({ trackerId: tracker.id })}>
            <ActionIcon className="flex items-center justify-center bg-black w-max">
              <ArrowTopRightOnSquareIcon className="w-5 h-5 stroke-yellow-200 fill-transparent" />
            </ActionIcon>
          </Link>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <div>
      <Table className="my-10">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Tracker ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Base Unit</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Objective</Table.Th>
            <Table.Th>Progress</Table.Th>
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

const TrackersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Trackers</title>
      </Head>
      <div>
        {/* Button Tray */}
        <div className="flex gap-4 my-4">
          <Button className="text-black bg-yellow-200">
            <Link href={Routes.Tracker()}>Back</Link>
          </Button>
          <Button className="text-black bg-yellow-200">
            <Link href={Routes.NewTrackerPage()}>Create Tracker</Link>
          </Button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TrackersList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TrackersPage
