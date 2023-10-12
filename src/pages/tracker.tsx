import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Button, Title } from "@mantine/core"

const Tracker: BlitzPage = () => {
  return (
    <Layout title="Tracker">
      <main className="flex-col flex-1 py-4 justify-evenly">
        <Title className="text-xl font-normal text-black">Tracker page</Title>
        <div className="flex gap-4 mt-6">
          <Button className="text-black w-max bg-gradient-to-r from-yellow-200 to-yellow-400">
            <Link href={Routes.TrackersPage()}>Manage Trackers</Link>
          </Button>
          <Button className="text-black w-max bg-gradient-to-r from-yellow-200 to-yellow-400">
            <Link href={Routes.TrackerEntriesPage()}>Tracker Entry</Link>
          </Button>
          <Button className="text-black w-max bg-gradient-to-r from-yellow-200 to-yellow-400">
            <Link href={Routes.TrackingGoalsPage()}>Tracker Goals</Link>
          </Button>
        </div>
      </main>
    </Layout>
  )
}

export default Tracker
