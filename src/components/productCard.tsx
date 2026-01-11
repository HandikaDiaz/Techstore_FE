import { Edit, Eye, ShoppingCart, Trash2 } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onEditProduct?: (product: Product) => void;
    onDeleteProduct?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onEditProduct,
    onDeleteProduct,
}) => {
    const calculateDiscountedPrice = () => {
        return product.discount ? product.price * (1 - product.discount / 100) : product.price;
    };

    const finalPrice = calculateDiscountedPrice();

    const navigate = useNavigate();
    const location = useLocation();
    const isProductsPage = location.pathname === '/products';

    const categories = [
        { value: 'ELECTRONICS', label: 'Electronics' },
        { value: 'FASHION', label: 'Fashion' },
        { value: 'HOME', label: 'Home & Living' },
        { value: 'BEAUTY', label: 'Beauty' },
        { value: 'SPORTS', label: 'Sports' },
        { value: 'AUTOMOTIVE', label: 'Automotive' },
        { value: 'BOOKS', label: 'Books' },
        { value: 'MUSIC', label: 'Music' },
    ];

    const categoryLabel = categories.find(c => c.value === product.category)?.label || product.category;

    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="aspect-square overflow-hidden bg-gray-100 border border-gray-200 mb-4">
                <img
                    src={product.image.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <CardContent className="flex-grow px-3">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                            {categoryLabel}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="pt-4 border-t h-25">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm">Price:</span>
                            <div className="text-right">
                                {product.discount && product.discount > 0 ? (
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-xl font-bold text-gray-900">
                                                Rp {finalPrice.toLocaleString('id-ID')}
                                            </span>
                                            <span className="text-sm font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                                                Save {product.discount}%
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500 line-through block">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xl font-bold text-gray-900">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Availability:</span>
                            <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock.toLocaleString('id-ID')} units` : 'Out of stock'}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-6 px-2">
                <div className="grid grid-cols-2 gap-2 w-full">
                    {isProductsPage ? (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-8 text-xs"
                                onClick={() => onEditProduct?.(product)}
                            >
                                <Edit className="mr-1 h-3 w-3" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full h-8 text-xs"
                                onClick={() => onDeleteProduct?.(product)}
                            >
                                <Trash2 className="mr-1 h-3 w-3" />
                                Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-8 text-xs"
                                onClick={handleViewDetails}
                            >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full h-8 text-xs"
                                onClick={() => onAddToCart?.(product)}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart className="mr-1 h-3 w-3" />
                                {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                            </Button>
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;