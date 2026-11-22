"use client"

import Image from "next/image"
import Link from "next/link"
import { HeartIcon, StarIcon } from "lucide-react"

import { formatPrice } from "./constants"
import type { BrowseService } from "./types"

export function ServiceCard({ service }: { service: BrowseService }) {
  function handleFavorite() {
    // Favorite handler will be wired up later.
  }

  const serviceId = service._id ?? service.id

  const content = (
    <>
      <div className="relative aspect-[4/3] bg-rose-100">
        <Image
          src={service.images?.[0] ?? "/hero-couple.jpg"}
          alt={service.serviceName ?? "Wedding service"}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-rose-950">
          {service.serviceName ?? "Untitled service"}
        </h3>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-rose-900">
            ${formatPrice(service.basePrice)}
          </p>
          <span className="flex items-center gap-1 text-xs text-rose-900/70">
            <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
            {service.rating ?? "—"}
          </span>
        </div>
      </div>
    </>
  )

  return (
    <article className="relative overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      {serviceId ? (
        <Link href={`/browse-services/${serviceId}`} className="block">
          {content}
        </Link>
      ) : (
        content
      )}

      <button
        type="button"
        onClick={handleFavorite}
        aria-label="Save service"
        className="absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm transition-colors hover:bg-white hover:text-rose-600"
      >
        <HeartIcon className="size-4" />
      </button>
    </article>
  )
}
