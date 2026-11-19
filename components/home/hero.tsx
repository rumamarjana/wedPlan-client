import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, PlayIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft blush backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-100/80 via-pink-50/70 to-background"
      />
      <div
        aria-hidden
        className="absolute -top-32 left-[-8rem] size-[28rem] rounded-full bg-rose-300/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-[-10rem] size-[32rem] rounded-full bg-pink-300/30 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Copy */}
        <div className="flex max-w-xl flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-rose-600 shadow-sm backdrop-blur">
            <SparklesIcon className="size-3.5" aria-hidden />
            Your Dream Wedding, Our Plan
          </span>

          <h1 className="font-heading text-4xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Plan Your Perfect Wedding with{" "}
            <span className="text-rose-600">WedPlan</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From venues and photographers to caterers and decorators, discover
            trusted wedding professionals, compare packages, and keep every
            detail of your big day in one place.
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <Button
              nativeButton={false}
              render={<Link href="/browse-services" />}
              className="h-12 gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-7 text-base text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700 hover:shadow-rose-500/40"
            >
              Explore Wedding Services
              <ArrowRightIcon className="size-4" />
            </Button>

            <button
              type="button"
              className="group flex items-center gap-3 rounded-full text-sm font-medium"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30 transition-transform group-hover:scale-105">
                <PlayIcon className="size-4 fill-current" />
              </span>
              Watch Video
            </button>
          </div>
        </div>

        {/* Photo */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-rose-200/70 to-pink-100/60 blur-xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 shadow-2xl shadow-rose-900/15">
            <Image
              src="/hero-couple.jpg"
              alt="Newlywed Indian couple — the bride in a blush lehenga and the groom in a cream sherwani"
              width={1600}
              height={2169}
              priority
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
