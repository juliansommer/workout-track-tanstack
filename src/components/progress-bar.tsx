import { ProgressProvider } from "@bprogress/react"

export default function ProgressBar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProgressProvider
      color="#0A2FFF"
      height="3px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
