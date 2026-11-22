"use client"

import type { ReactNode } from "react"

import {
  BENEFIT_OPTIONS,
  CATEGORY_OPTIONS,
  LOCATION_OPTIONS,
  MAX_PRICE,
} from "./constants"
import { SelectField } from "./select-field"
import type { FilterOption } from "./types"

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-rose-950">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function RadioOption({
  name,
  option,
  onChange,
}: {
  name: string
  option: FilterOption
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-rose-900/80">
      <input
        type="radio"
        name={name}
        value={option.value}
        onChange={onChange}
        className="size-4 border-rose-300 accent-rose-600"
      />
      {option.label}
    </label>
  )
}

export function FilterSidebar() {
  function handleFilterChange() {



    
  }

  return (
    <aside className="h-fit rounded-xl border border-rose-100 bg-white p-4 lg:sticky lg:top-20">
      <h2 className="text-base font-semibold text-rose-950">Filter By</h2>

      <div className="mt-5 space-y-6">
        <FilterSection title="Category">
          <div className="space-y-2.5">
            {CATEGORY_OPTIONS.map((option) => (
              <RadioOption
                key={option.value}
                name="category"
                option={option}
                onChange={handleFilterChange}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <p className="mb-3 text-xs text-rose-900/70">
            Price – $0 – ${MAX_PRICE.toLocaleString("en-US")}+
          </p>
          <input
            type="range"
            name="maxPrice"
            min={0}
            max={MAX_PRICE}
            step={1000}
            defaultValue={MAX_PRICE}
            onChange={handleFilterChange}
            aria-label="Maximum price"
            className="w-full accent-rose-600"
          />
        </FilterSection>

        <FilterSection title="Location">
          <SelectField
            ariaLabel="Location"
            options={LOCATION_OPTIONS}
            placeholder="All Locations"
            onChange={handleFilterChange}
          />
        </FilterSection>

        <FilterSection title="Benefits">
          <div className="space-y-2.5">
            {BENEFIT_OPTIONS.map((option) => (
              <RadioOption
                key={option.value}
                name="benefits"
                option={option}
                onChange={handleFilterChange}
              />
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  )
}
