import axiosInstance from "@/src/config/axios";

export function getSiteConfig() {
    return axiosInstance.get('/dashboard/config');
}
