import Image from "next/image"
import type { ReactNode } from "react"






export function AuthCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  footer,
  children,
}: {
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
  footer: ReactNode
  children: ReactNode
}) {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-gradient-to-b from-rose-100/60 via-background to-rose-50 p-4 sm:p-6 lg:p-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-rose-100 bg-background shadow-xl shadow-rose-900/10 md:grid-cols-2 dark:border-rose-900/50">
        {/* Decorative photo */}
        <div className="relative m-3 hidden overflow-hidden rounded-xl md:block">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-[2rem]">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-6">{children}</div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </div>
    </main>
  )
}
