import { Skeleton } from "@mantine/core"
import Link from "next/link"

const sideNavMenuItems = [
  {
    label: "Home",
    pageLink: "/",
  },
  {
    label: "Finance",
    pageLink: "/finance",
  },
  {
    label: "Tracker",
    pageLink: "/tracker",
  },
]

export const SideNav = () => {
  return (
    <div>
      {!sideNavMenuItems &&
        Array(2)
          .fill(0)
          .map((_, index) => <Skeleton key={index} h={28} mt="sm" animate={true} />)}
      {sideNavMenuItems && (
        <div className="flex flex-col gap-2 ">
          {sideNavMenuItems.map((item) => (
            <Link key={`${item.label.toLowerCase()}`} href={item.pageLink}>
              <p className="underline text-xl">{item.label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
