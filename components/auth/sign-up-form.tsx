"use client"

import { GoogleButton } from "@/components/auth/google-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { SignUpData } from "@/app/(auth)/sign-up/page"
import {
  isUserRole,
  ROLE_DESCRIPTIONS,
  ROLE_LABELS,
  USER_ROLES,
} from "@/lib/roles"

type SignUpFormProps = {
  onSubmit: (data: SignUpData) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const rawRole = formData.get("role")

    const data: SignUpData = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: isUserRole(rawRole) ? rawRole : "customer",
    }

    onSubmit(data)
    console.log("Sign up form data:", data)
  }

  function handleGoogleSignUp() {
    // TODO: integrate Google OAuth later.
    console.log("Continue with Google (sign up) — not implemented yet")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm leading-none font-medium">
          I am signing up as
        </legend>
        <div className="flex flex-col gap-2 pt-2">
          {USER_ROLES.map((role) => (
            <label
              key={role}
              htmlFor={`role-${role}`}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background p-3 transition-colors has-[:checked]:border-[#8b1d44] has-[:checked]:bg-[#8b1d44]/5 has-[:checked]:ring-1 has-[:checked]:ring-[#8b1d44]/30 hover:border-[#8b1d44]/50"
            >
              <input
                id={`role-${role}`}
                type="radio"
                name="role"
                value={role}
                defaultChecked={role === "customer"}
                required
                className="mt-0.5 size-4 shrink-0 accent-[#8b1d44]"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">
                  {ROLE_LABELS[role]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {ROLE_DESCRIPTIONS[role]}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

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
