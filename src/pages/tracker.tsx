import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Title } from "@mantine/core"

const Tracker: BlitzPage = () => {
  return (
    <Layout title="Tracker">
      <main className={styles.main}>
        <Title>Tracker page</Title>
      </main>
    </Layout>
  )
}

export default Tracker
