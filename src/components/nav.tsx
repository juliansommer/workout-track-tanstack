import { Link, useRouter } from "@tanstack/react-router"
import { Dumbbell } from "lucide-react"
import { useEffect, useState } from "react"

import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { buttonVariants } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function Nav() {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    async function fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user?.id ?? null)
    }
    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?.id ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.navigate({ to: "/" })
    router.invalidate()
  }

  return (
    <nav className="mb-16 flex h-full w-full flex-between items-center justify-between pt-3">
      <Link className="flex items-center justify-center" to="/">
        <Dumbbell className="mr-2 h-6 w-6" />
        <span className="font-bold">Workout Track</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden gap-3 md:flex">
        <Link
          className={buttonVariants({ variant: "outline" })}
          params={{ page: "1" }}
          to="/exercises/p/$page"
        >
          Exercises
        </Link>
        {user ? (
          <>
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/plans"
            >
              Plans
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/workouts"
            >
              Workouts
            </Link>
            <button
              className={buttonVariants({ variant: "default" })}
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <Link className={buttonVariants({ variant: "default" })} to="/login">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex gap-3 md:hidden">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={buttonVariants({ variant: "default" })}
                type="button"
              >
                Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link params={{ page: "1" }} to="/exercises/p/$page">
                  Exercises
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/plans">Plans</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/workouts">Workouts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout} type="button">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link className={buttonVariants({ variant: "default" })} to="/login">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
