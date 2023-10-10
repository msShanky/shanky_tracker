import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Button } from "@mantine/core"

const Finance: BlitzPage = () => {
  return (
    <Layout title="Finance">
      <main className={styles.main}>
        {/* Menu Button Tray */}
        <div>
          <Link href={Routes.TransactionModesPage()}>
            <Button className="bg-black rounded-lg text-yellow-400 hover:cursor-pointer hover:text-white hover:bg-neutral-600">
              Transaction Mode
            </Button>
          </Link>
          {/* <Button className="bg-black rounded-lg text-yellow-400">Transaction Mode</Button> */}
        </div>
      </main>
    </Layout>
  )
}

export default Finance
