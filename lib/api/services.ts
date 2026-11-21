import { ServiceType } from "@/app/dashboard/vendor/services/new/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


 export   const getservices = async (data: ServiceType) => {
    const res = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}