import { getServices } from "@/lib/api/services";



const BrowseServicesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>
}) => {

    const search = await searchParams
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();  
    
    console.log('search', query);
  const services = await getServices({ query });

    return (
        <div>
            Browse Services Page
            <ul>    
                {services.map((service: any) => (
                    <li key={service.id}>
                        <h3>{service.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BrowseServicesPage