"use client"

import type { FormEvent } from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CATEGORY_OPTIONS } from "./constants"
import { SelectField } from "./select-field"
import { useFilterParams } from "./use-filter-params"

export function BrowseHero() {
  const { searchParams, setParam, setParams } = useFilterParams()

  const search = searchParams.get("search") ?? ""
  const category = searchParams.get("category") ?? ""

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    setParams({
      search: String(form.get("search") ?? "").trim(),
      category: String(form.get("category") ?? ""),
    })
  }

  return (
    <section>
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-200/80 via-pink-100/80 to-rose-100/70">
        <div
          aria-hidden
          className="absolute -top-24 -right-16 size-80 rounded-full bg-rose-300/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-semibold text-rose-950 sm:text-4xl">
            Browse Wedding Services
          </h1>
          <p className="mt-2 text-sm text-rose-900/70 sm:text-base">
            Find the perfect services for your big day
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="border-b border-rose-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
          <div className="relative flex-1">
            <SearchIcon
              aria-hidden
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-rose-400"
            />
            <Input
              key={search}
              type="search"
              name="search"
              defaultValue={search}
              aria-label="Search services"
              placeholder="Search services..."
              className="h-10 rounded-full border-rose-200 bg-white pr-3 pl-9"
            />
          </div>

          <SelectField
            ariaLabel="Search category"
            name="category"
            options={CATEGORY_OPTIONS}
            value={category}
            placeholder="All Categories"
            onChange={(value) => setParam("category", value)}
            className="sm:w-52"
          />

          <Button
            type="submit"
            className="h-10 rounded-full bg-rose-900 px-8 text-white hover:bg-rose-950"
          >
            Search
          </Button>
        </div>
      </form>
    </section>
  )
}
