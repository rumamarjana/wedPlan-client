"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Pencil, Plus, Star, Tag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { deleteService, getServices } from "@/lib/api/services"
import type { ServiceType } from "./new/page"

type Service = ServiceType & { id: string; rating: number; reviews: number }
type ApiService = Partial<ServiceType> & {
  _id?: string
  id?: string
  rating?: number
  reviews?: number
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-rose-950">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-2xl leading-none text-rose-900/60"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ServiceCard({
  service,
  onView,
  onEdit,
  onDelete,
}: {
  service: Service
  onView: (service: Service) => void
  onEdit: (service: Service) => void
  onDelete: (service: Service) => void
}) {
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
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView(service)}
          >
            <Eye /> View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(service)}
          >
            <Pencil /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1 bg-rose-100 text-rose-900 hover:bg-rose-200"
            onClick={() => onDelete(service)}
          >
            <Trash2 /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [viewing, setViewing] = useState<Service | null>(null)
  const [editing, setEditing] = useState<Service | null>(null)

  useEffect(() => {
    // Show a success toast after being redirected from the Add Service page.
    if (sessionStorage.getItem("serviceAdded") === "true") {
      sessionStorage.removeItem("serviceAdded")
      toast.add({
        type: "success",
        title: "Service Added Successfully!",
        description: "Your wedding service has been added successfully.",
      })
    }
  }, [])

  useEffect(() => {
    getServices()
      .then((data) => {
        if (!Array.isArray(data)) return
        setServices(
          data.map((item: ApiService) => ({
            serviceName: item.serviceName ?? "",
            category: item.category ?? "",
            description: item.description ?? "",
            basePrice: item.basePrice ?? "0",
            duration: item.duration ?? "1",
            durationUnit: item.durationUnit ?? "days",
            images: item.images ?? [],
            packageType: item.packageType ?? "basic",
            features: item.features ?? [],
            active: item.active ?? true,
            location: item.location ?? "",
            id: item._id ?? item.id ?? "",
            rating: item.rating ?? 0,
            reviews: item.reviews ?? 0,
          }))
        )
      })
      .catch((error) => console.error("Failed to load services:", error))
  }, [])

  const handleDelete = async (service: Service) => {
    setServices((current) => current.filter((item) => item.id !== service.id))
    try {
      await deleteService(service.id)
    } catch (error) {
      console.error("Failed to delete service:", error)
    }
  }

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    if (!editing) return
    setServices((current) =>
      current.map((item) => (item.id === editing.id ? editing : item))
    )
    setEditing(null)
  }

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

      {services.length === 0 && (
        <p className="text-sm text-rose-900/60">No services found.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onView={setViewing}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {viewing && (
        <Modal title={viewing.serviceName} onClose={() => setViewing(null)}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-rose-100">
            <Image
              src={viewing.images[0] ?? "/hero-couple.jpg"}
              alt={viewing.serviceName}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="mt-4 space-y-2 text-sm text-rose-900/80">
            <p className="text-xl font-semibold text-rose-950">
              ₹ {viewing.basePrice}+
            </p>
            <p className="flex items-center gap-1">
              <Tag className="size-4" /> {viewing.category} · {viewing.location}
            </p>
            <p className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {viewing.rating} ({viewing.reviews} reviews)
            </p>
            <p>{viewing.description}</p>
            <p className="text-rose-900/60">
              {viewing.duration} {viewing.durationUnit} · {viewing.packageType}{" "}
              package · {viewing.active ? "Active" : "Draft"}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {viewing.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-lg bg-rose-50 px-2 py-1 text-xs text-rose-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {editing && (
        <Modal title="Edit Service" onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-3">
            <label className="block text-sm">
              Service Name
              <input
                className="mt-1 w-full rounded-lg border p-2"
                value={editing.serviceName}
                onChange={(event) =>
                  setEditing({ ...editing, serviceName: event.target.value })
                }
              />
            </label>
            <label className="block text-sm">
              Category
              <input
                className="mt-1 w-full rounded-lg border p-2"
                value={editing.category}
                onChange={(event) =>
                  setEditing({ ...editing, category: event.target.value })
                }
              />
            </label>
            <label className="block text-sm">
              Price (₹)
              <input
                className="mt-1 w-full rounded-lg border p-2"
                value={editing.basePrice}
                onChange={(event) =>
                  setEditing({ ...editing, basePrice: event.target.value })
                }
              />
            </label>
            <label className="block text-sm">
              Location
              <input
                className="mt-1 w-full rounded-lg border p-2"
                value={editing.location}
                onChange={(event) =>
                  setEditing({ ...editing, location: event.target.value })
                }
              />
            </label>
            <label className="block text-sm">
              Description
              <textarea
                className="mt-1 w-full rounded-lg border p-2"
                rows={3}
                value={editing.description}
                onChange={(event) =>
                  setEditing({ ...editing, description: event.target.value })
                }
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.active}
                onChange={(event) =>
                  setEditing({ ...editing, active: event.target.checked })
                }
              />
              Active
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-rose-900 hover:bg-rose-950">
                Save
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default ServicesPage
