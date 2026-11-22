"use client"

import { useMemo } from "react"

import { parsePrice, SORT_OPTIONS } from "./constants"
import { SelectField } from "./select-field"
import { ServiceCard } from "./service-card"
import type { BrowseService } from "./types"
import { useFilterParams } from "./use-filter-params"

export function ServiceResults({ services }: { services: BrowseService[] }) {
  const { searchParams, setParam } = useFilterParams()
  const sort = searchParams.get("sort") ?? "newest"

  const sortedServices = useMemo(() => {
    const result = [...services]

    switch (sort) {
      case "price-asc":
        return result.sort(
          (a, b) => parsePrice(a.basePrice) - parsePrice(b.basePrice)
        )
      case "price-desc":
        return result.sort(
          (a, b) => parsePrice(b.basePrice) - parsePrice(a.basePrice)
        )
      case "rating":
        return result.sort((a, b) => parsePrice(b.rating) - parsePrice(a.rating))
      default:
        return result
    }
  }, [services, sort])

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-rose-900/70">
          Showing 1-{sortedServices.length} of {sortedServices.length} services
        </p>
        <SelectField
          ariaLabel="Sort services"
          options={SORT_OPTIONS}
          value={sort}
          onChange={(value) => setParam("sort", value === "newest" ? "" : value)}
          className="w-40"
        />
      </div>

      {sortedServices.length === 0 ? (
        <p className="rounded-xl border border-dashed border-rose-200 bg-white p-12 text-center text-sm text-rose-900/60">
          No services found. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sortedServices.map((service) => (
            <ServiceCard
              key={service._id ?? service.id ?? service.serviceName}
              service={service}
            />
          ))}
        </div>
      )}
    </section>
  )
}
