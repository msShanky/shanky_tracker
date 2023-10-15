import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
// import "src/styles/globals.css"
import React from "react"

import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { withBlitz } from "src/blitz-client"
import { MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core"

import "src/core/styles/index.css"

const myColors: MantineColorsTuple = [
  "#fff8e1",
  "#ffefcc",
  "#ffdd9b",
  "#ffca64",
  "#ffba38",
  "#ffb01b",
  "#ffab09",
  "#e39500",
  "#ca8500",
  "#af7100",
]

const theme = createTheme({
  colors: {
    myColors,
  },
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
