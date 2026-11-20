'use client'

import Link from "next/link"

import { AuthCard } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/sign-in-form"
import { authClient } from "@/lib/auth-client";

// export const metadata = {
//   title: "Sign In — WedPlan",
//   description: "Sign in to your WedPlan account.",
// }
export type SignInData = {
  email: string
  password: string
}

export default function SignInPage() {


  const handleSignIn = async (data: SignInData) => {
    const { data: signInResponse, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });
     if (error) {
      console.log("Sign in Error:", error)
      return
    }
    console.log("Sign in response:", signInResponse);
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
