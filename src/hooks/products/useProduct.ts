import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import Cookies from "js-cookie";
import type { Product } from "../../types";

export function useProductByProductId(productId: string) {
    async function getProductDetail() {
        const res = await api.get(`/product/get/${productId}`);
        return res.data;
    };

    const { data, isFetching } = useQuery<Product>({
        queryKey: ['product', productId],
        queryFn: getProductDetail,
    });

    return {
        data,
        isFetching,
    };
};

export function useProductByUser() {
    async function getProductsByUser() {
        const res = await api.get('/product/user-products', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        });
        return res.data;
    };

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: getProductsByUser,
    });

    return {
        data,
        isFetching,
        refetch
    };
};