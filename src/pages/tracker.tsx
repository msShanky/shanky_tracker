import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Button, Drawer, Title } from "@mantine/core"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useDisclosure } from "@mantine/hooks"
import { TrackerEntryInstant } from "src/tracker-entries/components/TrackerEntryInstant"
import { useQuery } from "@blitzjs/rpc"
import getTrackerDashboard from "src/trackers/queries/getTrackerDashboard"
import { Card, BarChart } from "@tremor/react"
import { Suspense } from "react"

const Tracker: BlitzPage = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [dashboardInfo, { isFetching, isError }] = useQuery(getTrackerDashboard, null)
  console.log(dashboardInfo, "Dashboard data")

  return (
    <Layout title="Tracker">
      <main className="flex-col flex-1 py-4 justify-evenly">
        <section className="flex justify-between gap-4 mt-6">
          <div className="flex gap-6">
            <Button className="text-black bg-yellow-200 w-max">
              <Link href={Routes.TrackersPage()}>Manage Trackers</Link>
            </Button>
            <Button className="text-black bg-yellow-200 w-max">
              <Link href={Routes.TrackerEntriesPage()}>Tracker Entry</Link>
            </Button>
            <Button className="text-black bg-yellow-200 w-max">
              <Link href={Routes.TrackingGoalsPage()}>Tracker Goals</Link>
            </Button>
          </div>
          <div>
            <Button
              className="p-2 text-black transition-all bg-yellow-200 rounded-full group hover:bg-stone-800 hover:text-stone-300 hover:px-4"
              classNames={{
                label: "flex gap-2",
              }}
              onClick={open}
            >
              <PlusIcon className="w-6 h-6 stroke-black group-hover:stroke-stone-300" />
              <p className="hidden group-hover:block">Create Instant Entry</p>
            </Button>
          </div>
        </section>
        <section className="my-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Card className="bg-white">
              <Title>Daily Smoke Tracker</Title>
              <BarChart
                className="mt-6"
                data={dashboardInfo}
                index="day"
                categories={["totalUnits"]}
                colors={["emerald", "gray"]}
                // valueFormatter={valueFormatter}
                yAxisWidth={40}
              />
            </Card>
          </Suspense>
        </section>
      </main>
      <Drawer opened={opened} onClose={close} title="New Entry" position="right">
        {/* Drawer content */}
        <TrackerEntryInstant closeDrawer={close} />
      </Drawer>
    </Layout>
  )
}

export default Tracker
