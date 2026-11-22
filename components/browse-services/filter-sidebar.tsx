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
import { useFilterParams } from "./use-filter-params"

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
  checked,
  onChange,
}: {
  name: string
  option: FilterOption
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-rose-900/80">
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        onClick={() => {
          // Radios don't emit a change event when an already checked option is
          // clicked, so clear the filter here to make selections toggleable.
          if (checked) onChange()
        }}
        className="size-4 border-rose-300 accent-rose-600"
      />
      {option.label}
    </label>
  )
}

export function FilterSidebar() {
  const { searchParams, setParam, toggleParam } = useFilterParams()

  const category = searchParams.get("category") ?? ""
  const location = searchParams.get("location") ?? ""
  const benefits = searchParams.get("benefits") ?? ""

  const priceParam = searchParams.get("maxPrice")
  const parsedPrice = priceParam === null ? NaN : Number(priceParam)
  const maxPrice =
    Number.isFinite(parsedPrice) && parsedPrice >= 0
      ? Math.min(parsedPrice, MAX_PRICE)
      : MAX_PRICE

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
                checked={category === option.value}
                onChange={() => toggleParam("category", option.value)}
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
            value={maxPrice}
            onChange={(event) =>
              setParam(
                "maxPrice",
                event.target.value === String(MAX_PRICE) ? "" : event.target.value
              )
            }
            aria-label="Maximum price"
            className="w-full accent-rose-600"
          />
        </FilterSection>

        <FilterSection title="Location">
          <SelectField
            ariaLabel="Location"
            options={LOCATION_OPTIONS}
            value={location}
            placeholder="All Locations"
            onChange={(value) => setParam("location", value)}
          />
        </FilterSection>

        <FilterSection title="Benefits">
          <div className="space-y-2.5">
            {BENEFIT_OPTIONS.map((option) => (
              <RadioOption
                key={option.value}
                name="benefits"
                option={option}
                checked={benefits === option.value}
                onChange={() => toggleParam("benefits", option.value)}
              />
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  )
}
