import {
  BrowseHero,
  FilterSidebar,
  ServiceResults,
} from "@/components/browse-services"
import { getServices, type ApiService } from "@/lib/api/services"

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
      value.forEach((item) => urlSearch.append(key, item))
    } else if (value !== undefined) {
      urlSearch.set(key, value)
    }
  })

  const query = urlSearch.toString()

  let services: ApiService[] = []
  let hasError = false

  try {
    services = await getServices(query)
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
