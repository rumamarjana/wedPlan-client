import { ServiceType } from "@/app/dashboard/vendor/services/new/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getservices = async (data: ServiceType) => {
    const res = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}







// export const getServices = async ({ query }: { query?: string }) => {
//     const res = await fetch(`${BASE_URL}/services${query ? `?${query}` : ''}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     return res.json();
// }
export const getServices = async (query = ''): Promise<ServiceType[]> => {
    const res = await fetch(`${BASE_URL}/services?${query}`)
    return res.json()
}




export const deleteService = async (id: string) => {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: "DELETE",
    });
    return res.json();
}
