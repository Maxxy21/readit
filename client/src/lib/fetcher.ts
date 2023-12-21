import axiosInstance from "@/lib/axios";

const fetcher = async (url: string) => {
    try {
        const res = await axiosInstance.get(url);
        return res.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export default fetcher;