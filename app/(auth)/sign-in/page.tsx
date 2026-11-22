"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthCard } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/sign-in-form"
import { authClient } from "@/lib/auth-client"
import { toast } from "@/components/ui/toast"

export type SignInData = {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()

  const handleSignIn = async (data: SignInData) => {
    // Read the URL when the form is submitted so the page can stay static.
    const redirectTo =
      new URLSearchParams(window.location.search).get("redirectTo") || "/"

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    })

    if (error) {
      console.error("Sign in error:", error)
      toast.add({ type: "error", title: "Sign in failed", description: error.message || "Check your email and password." })
      return
    }
    toast.add({ type: "success", title: "Welcome back", description: "You have signed in successfully." })
    router.push(redirectTo)
  }

  return (
    <AuthCard
      imageSrc="/signin-rings.jpg"
      imageAlt="Two gold wedding rings resting on soft pink and cream roses"
      title="Welcome Back!"
      subtitle="Sign in to your WedPlan account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#8b1d44] hover:underline"
          >
            Sign Up
          </Link>
        </>
      }
    >
      <SignInForm onSubmit={handleSignIn} />
    </AuthCard>
  )
}
