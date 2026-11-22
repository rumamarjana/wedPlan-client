"use client"

import Link from "next/link"

import { GoogleButton } from "@/components/auth/google-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SignInData } from "@/app/(auth)/sign-in/page"
import { authClient } from "@/lib/auth-client"

type SignInFormProps = {
  onSubmit: (data: SignInData) => Promise<void>
}



export function SignInForm({ onSubmit }: SignInFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as SignInData

    onSubmit(data)
  }

  function handleGoogleSignIn() {
    void authClient.signIn.social({ provider: "google", callbackURL: window.location.href })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <GoogleButton onClick={handleGoogleSignIn} />

      <div className="relative text-center text-xs text-muted-foreground">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-background px-3">or</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="h-10"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#8b1d44] text-sm font-semibold text-white shadow-sm hover:bg-[#75163a]"
      >
        Sign In
      </Button>
    </form>
  )
}
