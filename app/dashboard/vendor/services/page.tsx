"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Pencil, Plus, Star, Tag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ServiceType } from "./new/page"

type Service = ServiceType & { rating: number; reviews: number }

const services: Service[] = [
  {
    serviceName: "Wedding Decoration",
    category: "Wedding Decoration",
    description:
      "Floral mandap and stage setup with fresh flowers and drapery.",
    basePrice: "25,000",
    duration: "2",
    durationUnit: "days",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    ],
    packageType: "Premium",
    features: ["Floral mandap", "Stage backdrop", "Guest seating"],
    active: true,
    location: "Dhaka",
    rating: 4.9,
    reviews: 124,
  },
  {
    serviceName: "Outdoor Stage Lighting",
    category: "Wedding Decoration",
    description: "String lights and spotlights for a magical outdoor evening.",
    basePrice: "15,000",
    duration: "1",
    durationUnit: "days",
    images: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    ],
    packageType: "Basic",
    features: ["String lights", "Spotlights"],
    active: true,
    location: "Chattogram",
    rating: 4.8,
    reviews: 80,
  },
  {
    serviceName: "Traditional Gate Design",
    category: "Wedding Decoration",
    description: "Decorated entrance gate with marigold garlands and drapes.",
    basePrice: "8,000",
    duration: "1",
    durationUnit: "days",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    ],
    packageType: "Deluxe",
    features: ["Marigold garlands", "Fabric draping"],
    active: true,
    location: "Dhaka",
    rating: 4.7,
    reviews: 45,
  },
  {
    serviceName: "Indoor Canopy Setup",
    category: "Wedding Decoration",
    description: "Canopy and ceiling decor for intimate indoor ceremonies.",
    basePrice: "12,000",
    duration: "1",
    durationUnit: "days",
    images: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    ],
    packageType: "Basic",
    features: ["Canopy frame", "Ceiling florals"],
    active: false,
    location: "Sylhet",
    rating: 4.6,
    reviews: 32,
  },
]

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
      <div className="relative aspect-[16/10] bg-rose-100">
        <Image
          src={service.images[0] ?? "/hero-couple.jpg"}
          alt={service.serviceName}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${service.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}
          >
            {service.active ? "Active" : "Draft"}
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
            {service.packageType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-rose-950">
          {service.serviceName}
        </h3>
        <p className="font-semibold text-rose-950">₹ {service.basePrice}+</p>

        <div className="flex flex-wrap gap-4 text-sm text-rose-900/70">
          <span className="flex items-center gap-1">
            <Tag className="size-3.5" /> {service.category}
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {service.rating} ({service.reviews} reviews)
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-rose-900/60">
          {service.description}
        </p>

        <div className="mt-auto flex gap-2 border-t border-rose-100 pt-3">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye /> View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Pencil /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1 bg-rose-100 text-rose-900 hover:bg-rose-200"
          >
            <Trash2 /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

const ServicesPage = () => {
  return (
    <div className="min-h-full bg-[#fdf2f4] p-5 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-rose-950">My Services</h1>
          <p className="text-sm text-rose-900/60">
            Manage and showcase your wedding services
          </p>
        </div>
        <Button
          render={<Link href="/dashboard/vendor/services/new" />}
          className="bg-rose-900 hover:bg-rose-950"
        >
          <Plus /> Add New Service
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.serviceName} service={service} />
        ))}
      </div>
    </div>
  )
}

export default ServicesPage
