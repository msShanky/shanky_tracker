import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Button, Drawer, Title } from "@mantine/core"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useDisclosure } from "@mantine/hooks"
import { TrackerEntryInstant } from "src/tracker-entries/components/TrackerEntryInstant"

const Tracker: BlitzPage = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Layout title="Tracker">
      <main className="flex-col flex-1 py-4 justify-evenly">
        <Title className="text-xl font-normal text-black">Tracker page</Title>
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
      </main>
      <Drawer opened={opened} onClose={close} title="New Entry" position="right">
        {/* Drawer content */}
        <TrackerEntryInstant closeDrawer={close} />
      </Drawer>
    </Layout>
  )
}

export default Tracker
