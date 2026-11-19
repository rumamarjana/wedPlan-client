"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {  HeartIcon, MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/browse-services" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
]

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-xl font-semibold tracking-tight",
        className
      )}
    >
      <HeartIcon className="size-6 shrink-0 text-rose-500" strokeWidth={2} />
      <span>
        Wed<span className="text-rose-600">Plan</span>
      </span>
    </Link>
  )
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "text-rose-600"
          : "text-foreground/80 hover:bg-muted hover:text-foreground"
      )}
    >
      {label}
    </Link>
  )
}



export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
         

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <MenuIcon />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-0 sm:max-w-xs">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo />
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 px-4 py-4"
                aria-label="Mobile"
              >
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                        className={cn(
                          "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          pathname === link.href
                            ? "bg-muted text-rose-600"
                            : "text-foreground/80 hover:bg-muted hover:text-foreground"
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>

             
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
