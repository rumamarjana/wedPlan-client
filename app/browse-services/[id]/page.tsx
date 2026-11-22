import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  ChevronDownIcon,
  Clock3Icon,
  MapPinIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  UserRoundIcon,
} from "lucide-react"

import { formatPrice } from "@/components/browse-services/constants"
import { BookingBar, ServiceGallery } from "@/components/service-details"
import { getServiceById, type ApiService } from "@/lib/api/services"

type ServiceDetails = ApiService & {
  rating?: number
  reviews?: number
  vendorName?: string
}

const FALLBACK_IMAGES = [
  "/hero-couple.jpg",
  "/signin-rings.jpg",
  "/signup-bouquet.jpg",
]

const FALLBACK_FEATURES = [
  "Professional Team",
  "Premium Setup",
  "On-Time Service",
]

const FEATURE_ICONS = [BadgeCheckIcon, SparklesIcon, Clock3Icon]

function DetailsHeader() {
  return (
    <header className="border-b border-rose-100 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50">
      <div className="relative mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <Link
          href="/browse-services"
          aria-label="Back to services"
          className="flex size-9 items-center justify-center rounded-full text-rose-900 transition-colors hover:bg-rose-100"
        >
          <ArrowLeftIcon className="size-5" />
        </Link>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap text-rose-950">
          Service Details
        </h1>

        <div className="flex items-center gap-1 text-rose-900">
          <button
            type="button"
            aria-label="Search"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-rose-100"
          >
            <SearchIcon className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-rose-100"
          >
            <UserRoundIcon className="size-4.5" />
          </button>
          <span className="ml-1 flex items-center gap-0.5 rounded-full bg-rose-100 py-0.5 pr-1 pl-2 text-xs font-semibold text-rose-900">
            WP
            <ChevronDownIcon className="size-3" />
          </span>
        </div>
      </div>
    </header>
  )
}

const ServicesDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  let service: ApiService | null = null
  let hasError = false

  try {
    service = await getServiceById(id)
  } catch (error) {
    console.error("Failed to load service:", error)
    hasError = true
  }

  if (hasError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#fdf7f8] px-4 text-center">
        <p className="text-lg font-semibold text-rose-950">
          Service could not be loaded
        </p>
        <p className="text-sm text-rose-900/70">Please try again later.</p>
        <Link
          href="/browse-services"
          className="mt-2 rounded-full bg-rose-900 px-6 py-2 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Back to services
        </Link>
      </main>
    )
  }

  if (!service) notFound()

  const details = service as ServiceDetails
  const name = details.serviceName || "Untitled service"
  const images = details.images?.length ? details.images : FALLBACK_IMAGES
  const features = details.features?.length ? details.features : FALLBACK_FEATURES
  const rating = details.rating ?? 4.9
  const reviews = details.reviews ?? 124
  const description =
    details.description ||
    "Make your special day more beautiful with our premium decoration services."

  return (
    <main className="min-h-screen bg-[#fdf7f8] pb-28">
      <DetailsHeader />

      <div className="mx-auto w-full max-w-2xl sm:px-4 sm:py-6">
        <div className="overflow-hidden bg-white sm:rounded-2xl sm:border sm:border-rose-100 sm:shadow-sm">
          <ServiceGallery images={images} name={name} />

          <div className="space-y-5 px-4 pt-4 pb-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-heading text-2xl leading-tight font-semibold text-rose-950">
                {name}
              </h2>
              <p className="shrink-0 pt-1 text-lg font-bold text-rose-700">
                ৳ {formatPrice(details.basePrice)}+
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <StarIcon className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-rose-950">{rating}</span>
              <span className="text-rose-700/80">({reviews} reviews)</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-rose-900/70">
              <MapPinIcon className="size-3.5 text-rose-500" />
              <span>{details.location || "Dhaka"}</span>
              <span className="text-rose-300">•</span>
              <span>{details.vendorName || "Dream Decor"}</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-rose-950">
                About This Service
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-rose-900/70">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length]

                return (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50/70 px-2.5 py-1.5 text-xs font-medium text-rose-900"
                  >
                    <Icon className="size-3.5 text-rose-600" />
                    {feature}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <BookingBar
        serviceName={name}
        serviceId={id}
      />
    </main>
  )
}

export default ServicesDetailPage
