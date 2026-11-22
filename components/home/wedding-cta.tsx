import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

/**
 * Slim promotional banner that sits directly above the footer on the home page.
 */
export function WeddingCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-r from-[#fdeef2] via-[#f9dce6] to-[#f4c9d8] px-6 py-8 sm:px-10 sm:py-10">
        {/* Floral photo, faded into the blush background */}
        <div aria-hidden className="absolute inset-y-0 right-0 w-3/5 sm:w-2/5">
          <Image
            src="/signup-bouquet.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 60vw, 40vw"
            className="object-cover object-[50%_72%] opacity-90"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 30%, black 65%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 30%, black 65%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9dce6]/40 to-transparent" />
        </div>

        <div
          aria-hidden
          className="absolute -top-16 left-1/3 size-40 rounded-full bg-white/40 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="font-heading text-2xl leading-tight font-bold text-[#4a1d2a] sm:text-[28px]">
              Make Your Dream Wedding
              <br />
              Come True
            </h2>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#6b4a55] sm:text-sm">
              Join thousands of happy couples who planned their perfect day
              with WedPlan.
            </p>
          </div>

          <Link
            href="/browse-services"
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#6b1f3a] px-5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#52142d] sm:text-sm"
          >
            Get Started
            <ArrowRightIcon className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
