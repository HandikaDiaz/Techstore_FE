import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import ProductGrid from '../components/productGrid';
import { useProductByUser } from '../hooks/products/useProduct';
import type { Product } from '../types';
import EditProductModal from '../components/editProductModal';
import DeleteProductModal from '../components/deleteProductModal';

const ProductList: React.FC = () => {
    const { data, isFetching, refetch } = useProductByUser();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | "">("");

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedProduct("");
        refetch();
    };

    const handleDeleteProduct = async (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedProduct("");
        refetch();
    };


    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2Icon className='animate-spin h-8 w-8' />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Product List</h1>
                <p className="text-gray-600">
                    Discover our curated collection of premium products
                </p>
            </div>

            <ProductGrid
                products={data || []}
                loading={isFetching}
                emptyMessage="You don't have any products yet"
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
            />

            {selectedProduct && (
                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    productId={selectedProduct.id}
                    product={selectedProduct}
                />
            )}
            {selectedProduct && (
                <DeleteProductModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    productId={selectedProduct.id}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default ProductList;