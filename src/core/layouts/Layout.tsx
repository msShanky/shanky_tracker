import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, Group } from "@mantine/core"
import { SideNav } from "@components/common"

type BlitzLayoutProps = { title?: string; children?: React.ReactNode }

const Layout: BlitzLayout<BlitzLayoutProps> = (props) => {
  const { title, children } = props
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <>
      <Head>
        <title>{title || "shanky-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header className="flex items-center justify-between w-full bg-yellow-200">
          <Group className="" h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="md" />
          </Group>
          <div>
            <a href="/api/auth/google/login">Log In Google</a>
          </div>
        </AppShell.Header>
        <AppShell.Navbar className="bg-yellow-200 border-yellow-400" p="md">
          <SideNav />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  )
}

export default Layout
