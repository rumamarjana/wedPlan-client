"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronRightIcon, HeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function ServiceGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const activeImage = images[activeIndex] ?? images[0]

  return (
    <div>
      <div className="relative aspect-[4/3] w-full bg-rose-100 sm:aspect-[16/10]">
        <Image
          key={activeImage}
          src={activeImage}
          alt={name}
          fill
          unoptimized
          priority
          sizes="(max-width: 640px) 100vw, 672px"
          className="object-cover"
        />

        <button
          type="button"
          onClick={() => setIsFavorite((value) => !value)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-md transition-colors hover:bg-white"
        >
          <HeartIcon
            className={cn("size-4", isFavorite && "fill-rose-500 text-rose-500")}
          />
        </button>

        <button
          type="button"
          onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
          aria-label="Next photo"
          className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-rose-700 shadow-md transition-colors hover:bg-white"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto bg-white p-2.5">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={cn(
              "relative size-14 shrink-0 overflow-hidden rounded-lg bg-rose-100",
              index === activeIndex && "ring-2 ring-rose-600 ring-offset-1"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              unoptimized
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
