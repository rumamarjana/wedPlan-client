'use client';
import Link from "next/link"

import { AuthCard } from "@/components/auth/auth-card"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"
import { isUserRole, UserRole } from "@/lib/roles"
// import { cookieNameRegex } from "better-auth/cookies"

export type SignUpData = {
  fullName: string
  email: string
  password: string
  role: UserRole
}


// export const metadata = {
//   title: "Sign Up — WedPlan",
//   description: "Create your WedPlan account.",
// }

export default function SignUpPage() {

  const handleSignUp = async (data: SignUpData)  => {

      // console.log("Received form data:", data)

    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.fullName,
      email: data.email,
      password: data.password,
      role: isUserRole(data.role) ? data.role : "customer",
      callbackURL: "/",
    });
    if (error) {
      console.log("Signup Error:", error)
      return
    }
    console.log("Sign up response:", signUpResponse);
  }



  return (
    <AuthCard
      imageSrc="/signup-bouquet.jpg"
      imageAlt="A bride holding a bouquet of pink and cream roses"
      title="Create Your Account"
      subtitle="Join WedPlan today!"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#8b1d44] hover:underline"
          >
            Sign In
          </Link>
        </>
      }
    >
      <SignUpForm onSubmit={handleSignUp} />
    </AuthCard>
  )
}
