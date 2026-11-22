"use client"

import { ChevronDownIcon } from "lucide-react"

import type { FilterOption } from "./types"

type SelectFieldProps = {
  ariaLabel: string
  options: readonly FilterOption[]
  value: string
  name?: string
  placeholder?: string
  onChange: (value: string) => void
  className?: string
}

export function SelectField({
  ariaLabel,
  options,
  value,
  name,
  placeholder,
  onChange,
  className = "",
}: SelectFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={ariaLabel}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full appearance-none rounded-full border border-rose-200 bg-white py-1.5 pr-9 pl-3.5 text-sm text-rose-900 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-rose-500"
      />
    </div>
  )
}
