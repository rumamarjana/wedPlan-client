import Link from "next/link"

import { AuthCard } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata = {
  title: "Sign In — WedPlan",
  description: "Sign in to your WedPlan account.",
}

export default function SignInPage() {
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
      <SignInForm />
    </AuthCard>
  )
}
