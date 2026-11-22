"use client"

import { SORT_OPTIONS } from "./constants"
import { SelectField } from "./select-field"
import { ServiceCard } from "./service-card"
import type { BrowseService } from "./types"

export function ServiceResults({ services }: { services: BrowseService[] }) {
  function handleSortChange() {
    // Sort handler will be wired up later.
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-rose-900/70">
          Showing 1-{services.length} of {services.length} services
        </p>
        <SelectField
          ariaLabel="Sort services"
          options={SORT_OPTIONS}
          defaultValue="newest"
          onChange={handleSortChange}
          className="w-40"
        />
      </div>

      {services.length === 0 ? (
        <p className="rounded-xl border border-dashed border-rose-200 bg-white p-12 text-center text-sm text-rose-900/60">
          No services found. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
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
