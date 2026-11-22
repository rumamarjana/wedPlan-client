import {
  BrowseHero,
  FilterSidebar,
  ServiceResults,
} from "@/components/browse-services"
import { parsePrice } from "@/components/browse-services/constants"
import { getServices, type ApiService } from "@/lib/api/services"

// The API does not filter on benefits or price, so those are applied here.
const BENEFIT_PATTERNS: Record<string, RegExp> = {
  consultation: /consult/i,
  custom: /custom/i,
  onsite: /on[\s-]?site/i,
}

const BrowseServicesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams()

  Object.entries(search).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((item) => urlSearch.append(key, item))
    } else if (value) {
      urlSearch.set(key, value)
    }
  })

  const query = urlSearch.toString()

  let services: ApiService[] = []
  let hasError = false

  try {
    const fetched = await getServices(query)
    const priceParam = urlSearch.get("maxPrice")
    const maxPrice = priceParam === null ? NaN : Number(priceParam)
    const benefit = urlSearch.get("benefits")
    const benefitPattern = benefit ? BENEFIT_PATTERNS[benefit] : undefined

    services = fetched.filter((service) => {
      if (Number.isFinite(maxPrice) && parsePrice(service.basePrice) > maxPrice) {
        return false
      }

      if (
        benefitPattern &&
        !service.features?.some((feature) => benefitPattern.test(feature))
      ) {
        return false
      }

      return true
    })
  } catch (error) {
    console.error("Failed to load services:", error)
    hasError = true
  }

  return (
    <main className="min-h-screen bg-[#fdf7f8]">
      <BrowseHero />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <FilterSidebar />

        <div>
          {hasError && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-rose-200 bg-white p-3 text-sm text-rose-800"
            >
              Services could not be loaded. Please try again later.
            </p>
          )}
          <ServiceResults services={services} />
        </div>
      </div>
    </main>
  )
}

export default BrowseServicesPage
