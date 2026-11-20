"use client"

import { GoogleButton } from "@/components/auth/google-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { SignUpData } from "@/app/(auth)/sign-up/page"

type SignUpFormProps = {
  onSubmit: (data: SignUpData) => void
}

export function SignUpForm({onSubmit }: SignUpFormProps) {
  // TODO: integrate real sign-up later — for now just collect the form data.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
const data = Object.fromEntries(
    new FormData(event.currentTarget)
  ) as unknown as SignUpData

  onSubmit(data)
    console.log("Sign up form data:", data)
  }

  function handleGoogleSignUp() {
    // TODO: integrate Google OAuth later.
    console.log("Continue with Google (sign up) — not implemented yet")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <GoogleButton onClick={handleGoogleSignUp} />

      <div className="relative text-center text-xs text-muted-foreground">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-background px-3">or</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            required
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            className="h-10"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#8b1d44] text-sm font-semibold text-white shadow-sm hover:bg-[#75163a]"
      >
        Create Account
      </Button>
    </form>
  )
}
