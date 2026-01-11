import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { api } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export function useCreateProduct() {
    async function createProduct(data: FormData) {
        const res = await api.post('/product/create', data, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    };

    const { mutateAsync: createProductAsync, isPending: isSubmitting } = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
            toast.success('Product created successfully!');
        },
        onError: (error) => {
            console.error('Error creating product:', error);
            toast.error(`Error creating product: ${error.message || 'Unknown error'}`);
        }
    });

    return {
        isSubmitting,
        createProductAsync,
    };
}