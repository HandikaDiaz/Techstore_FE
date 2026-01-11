import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";
import Cookies from "js-cookie";

export function useDeleteProduct() {
    async function deleteProduct(productId: string) {
        const res = await api.delete(`/product/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        });
        return res.data;
    };

    const { mutateAsync: deleteProductAsync, isPending: isDeleting } = useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product'] });
            toast.success('Product deleted successfully!');
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
            toast.error(`Error deleting product: ${error.message || 'Unknown error'}`);
        }
    });

    return {
        isDeleting,
        deleteProductAsync,
    };
};