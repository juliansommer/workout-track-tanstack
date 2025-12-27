import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

import { usersQueryOptions } from "../utils/users"

export const Route = createFileRoute("/users")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions())
  },
  component: UsersComponent,
})

function UsersComponent() {
  const usersQuery = useSuspenseQuery(usersQueryOptions())

  return (
    <div className="flex gap-2 p-2">
      <ul className="list-disc pl-4">
        {[
          ...usersQuery.data,
          { id: "i-do-not-exist", name: "Non-existent User", email: "" },
        ].map((user) => {
          return (
            <li className="whitespace-nowrap" key={user.id}>
              <Link
                activeProps={{ className: "text-black font-bold" }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                params={{
                  userId: String(user.id),
                }}
                to="/users/$userId"
              >
                <div>{user.name}</div>
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
