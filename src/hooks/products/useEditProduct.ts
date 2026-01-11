import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { api } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export function useEditProduct(productId: string) {
    async function editProduct(data: FormData) {
        const res = await api.put(`/product/edit/${productId}`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        });
        return res.data;
    };

    const { mutateAsync: editProductAsync, isPending: isSubmitting } = useMutation({
        mutationKey: ['editProduct'],
        mutationFn: editProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product'] });
            toast.success('Product edited successfully!');
        },
        onError: (error) => {
            console.error('Error editing product:', error);
            toast.error(`Error editing product: ${error.message || 'Unknown error'}`);
        }
    });

    return {
        isSubmitting,
        editProductAsync,
    };
};