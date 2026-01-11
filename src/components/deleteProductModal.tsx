import { useDeleteProduct } from "../hooks/products/useDeleteProduct";
import type { Product } from "../types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    product: Product;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    isOpen,
    onClose,
    productId,
    product
}) => {
    const { deleteProductAsync, isDeleting } = useDeleteProduct();
    const handleDelete = async () => {
        await deleteProductAsync(productId);
        onClose();
    };

    if (isDeleting) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete the product "{product.name}"?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteProductModal;