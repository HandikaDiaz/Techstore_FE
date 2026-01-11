import {
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    Clock,
    Heart,
    Package,
    Share2,
    ShoppingCart,
    Star
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/button';
import { useProductByProductId } from '../hooks/products/useProduct';
import { Card } from '../components/ui/card';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = id ?? '0';
    const { data } = useProductByProductId(productId);

    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const product = data;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                        <Package className="text-gray-400" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        The product you're looking for doesn't exist or has been removed.
                    </p>
                    <Button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center"
                    >
                        <ArrowLeft className="mr-2" size={18} />
                        Back to Products
                    </Button>
                </div>
            </div>
        );
    }

    const finalPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    const handleAddToCart = () => {
        toast.success(`Added ${quantity} ${product.name} to cart!`);
    };

    const handleBuyNow = () => {
        toast.success(`Proceeding to checkout with ${quantity} ${product.name}`);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    // eslint-disable-next-line react-hooks/purity
    const randomReviews = Math.floor(Math.random() * 100) + 50;

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-6">
                    <nav className="flex items-center text-sm text-gray-500">
                        <button
                            onClick={() => navigate('/')}
                            className="hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            Products
                        </button>
                        <ChevronRight size={16} className="mx-2" />
                        <span className="text-gray-900 font-medium">{product.category}</span>
                        <ChevronRight size={16} className="mx-2" />
                        <span className="text-gray-400 truncate">{product.name}</span>
                    </nav>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <div className="mb-4 rounded-2xl overflow-hidden bg-white shadow-lg">
                            <img
                                src={product.image.url}
                                alt={product.name}
                                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {product.stock > 0 && (
                                <span className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1.5">
                                    <CheckCircle size={14} />
                                    In Stock
                                </span>
                            )}
                            {product.discount && (
                                <span className="px-3 py-1.5 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                                    {product.discount}% OFF
                                </span>
                            )}
                            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                Free Shipping
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-3">
                                        {product.category}
                                    </span>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                        {product.name}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className={`p-2.5 rounded-full ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        <Heart
                                            size={20}
                                            fill={isFavorite ? 'currentColor' : 'none'}
                                        />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={
                                                    i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-700 font-medium">
                                        {product.rating.toFixed(1)}
                                    </span>
                                    <span className="text-gray-500">({randomReviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                    <Clock size={16} />
                                    <span className="text-sm">Ships in 24 hours</span>
                                </div>
                            </div>
                        </div>

                        <Card className="border-0 shadow-md">
                            <div className="p-6">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-2">Price</p>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-bold text-gray-900">
                                            Rp {finalPrice.toLocaleString('id-ID')}
                                        </span>
                                        {product.discount && (
                                            <>
                                                <span className="text-xl text-gray-400 line-through">
                                                    Rp {product.price.toLocaleString('id-ID')}
                                                </span>
                                                <span className="px-2.5 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-lg">
                                                    Save {product.discount}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Including VAT • Free shipping for orders over Rp 500K
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-900 mb-3">Quantity</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                                                disabled={quantity <= 1}
                                            >
                                                <span className="text-xl">−</span>
                                            </button>
                                            <span className="w-16 text-center text-lg font-bold">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                                                disabled={quantity >= product.stock}
                                            >
                                                <span className="text-xl">+</span>
                                            </button>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">{product.stock}</span> units available
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="h-12 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleBuyNow}
                                        disabled={product.stock === 0}
                                        className="h-12 flex items-center justify-center gap-2"
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
                                <div className="prose prose-gray max-w-none">
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600">Premium quality materials</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600">1-year manufacturer warranty</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600">Easy returns within 30 days</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 lg:hidden">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="mr-2" size={18} />
                        Back to Products
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;