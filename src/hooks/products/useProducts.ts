import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function useProducts() {
    async function getProducts() {
        const res = await api.get('/product/get-all');
        return res.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    return {
        data: data || [],
        isLoading,
        error
    };
};