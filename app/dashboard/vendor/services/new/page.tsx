"use client"

import { useRef, useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { getservices } from "@/lib/api/services"
import { useRouter } from "next/navigation"

export type ServiceType = {
    serviceName: string
    category: string
    description: string
    basePrice: string
    duration: string
    durationUnit: string
    images: string[]
    packageType: string
    features: string[]
    active: boolean
    location: string
}
export const initialForm = {
    serviceName: "",
    category: "",
    description: "",
    basePrice: "",
    duration: "1",
    durationUnit: "days",
    images: [] as string[],
    packageType: "basic",
    features: "",
    active: true,
    location: "",
}

const categories = [
    "Wedding Decoration",
    "Photography",
    "Catering",
    "Makeup",
    "Other",
]

const packageTypes = [
    { value: "basic", label: "Basic" },
    { value: "premium", label: "Premium" },
    { value: "deluxe", label: "Deluxe" },
]

const NewServicePage = () => {
    const [form, setForm] = useState(initialForm)
    const [submitted, setSubmitted] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter() ;    

    const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }))
        setSubmitted(false)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = {
            ...form,
            features: form.features.split(",").map((feature) =>
                feature.trim()).filter(Boolean),
        }

        console.log("New service:", data)
        setSubmitted(true)

        const res = await getservices(data);
        console.log("Response from API:", res);
    }
    toast.add({
        title: "Service Created Successfully!",
        description: "Your wedding service has been added successfully.",
    })
    router.push("/dashboard/vendor/services")
    const handleCancel = () => {
        setForm(initialForm)
        setSubmitted(false)
    }

    return (
        <div className="w-full min-h-full bg-[#fdf2f4] px-5 py-6 md:px-8">
            <h1 className="mb-6 font-heading text-2xl font-semibold text-rose-950">
                Add New Service
            </h1>

            <form onSubmit={handleSubmit} className="space-y-7">
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-rose-950">
                        Basic Information
                    </h2>

                    <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="serviceName">Service Name</Label>
                            <Input
                                id="serviceName"
                                placeholder="Service Name"
                                className="bg-white"
                                value={form.serviceName}
                                onChange={(event) => update("serviceName", event.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={form.category || undefined}
                                onValueChange={(value) => update("category", value ?? "")}
                            >
                                <SelectTrigger id="category" className="w-full bg-white">
                                    <SelectValue placeholder="Wedding Decoration, Photography, Catering, Makeup, etc." />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your service..."
                                className="min-h-24 bg-white"
                                value={form.description}
                                onChange={(event) => update("description", event.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-rose-950">
                        Pricing &amp; Details
                    </h2>

                    <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="basePrice">Base Price</Label>
                            <Input
                                id="basePrice"
                                type="number"
                                min="0"
                                placeholder="$"
                                className="w-48 bg-white"
                                value={form.basePrice}
                                onChange={(event) => update("basePrice", event.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Service Duration</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="duration"
                                    type="number"
                                    min="1"
                                    className="w-24 bg-white"
                                    value={form.duration}
                                    onChange={(event) => update("duration", event.target.value)}
                                />
                                <Select
                                    value={form.durationUnit}
                                    onValueChange={(value) => update("durationUnit", value ?? "days")}
                                >
                                    <SelectTrigger aria-label="Duration unit" className="w-28 bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hours">hours</SelectItem>
                                        <SelectItem value="days">days</SelectItem>
                                        <SelectItem value="weeks">weeks</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-2">
                    <h2 className="text-lg font-semibold text-rose-950">Media Upload</h2>
                    <Label>Service Images</Label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(event) =>
                            update(
                                "images",
                                Array.from(event.target.files ?? []).map((file) => file.name)
                            )
                        }
                    />
                    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border border-dashed border-rose-300 bg-white px-3 py-2">
                        <span className="truncate text-sm text-muted-foreground">
                            {form.images.length > 0
                                ? form.images.join(", ")
                                : "Drag and drop upload or"}
                        </span>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Browse
                        </Button>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-rose-950">Additional Options</h2>

                    <div className="space-y-2">
                        <Label>Package Type</Label>
                        <RadioGroup
                            value={form.packageType}
                            onValueChange={(value) => update("packageType", value)}
                            className="flex flex-wrap gap-6"
                        >
                            {packageTypes.map((option) => (
                                <div key={option.value} className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`package-${option.value}`}
                                    />
                                    <Label htmlFor={`package-${option.value}`}>
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="features">Features/Inclusions</Label>
                        <Input
                            id="features"
                            placeholder="Features/Inclusions"
                            className="bg-white"
                            value={form.features}
                            onChange={(event) => update("features", event.target.value)}
                        />
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-rose-950">
                        Availability &amp; Status
                    </h2>

                    <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <Switch
                                id="active"
                                checked={form.active}
                                onCheckedChange={(checked) => update("active", checked)}
                            />
                            <Label htmlFor="active">Active/Inactive</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="Location"
                                className="bg-white"
                                value={form.location}
                                onChange={(event) => update("location", event.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                    {submitted && (
                        <p role="status" className="mr-auto text-sm text-emerald-700">
                            Service data collected — see the browser console.
                        </p>
                    )}
                    <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-rose-800 hover:bg-rose-900">
                        <Plus /> Add Service
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default NewServicePage
