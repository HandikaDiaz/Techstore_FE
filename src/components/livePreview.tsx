import React from 'react';
import { Eye, ImageIcon } from 'lucide-react';
import type { ProductFormInputType } from '../schema/product-schema';
import { Card } from './ui/card';

interface LivePreviewProps {
    formData: ProductFormInputType;
    imagePreview: string;
    calculateDiscountedPrice: () => number;
}

const LivePreview: React.FC<LivePreviewProps> = ({
    formData,
    imagePreview,
    calculateDiscountedPrice,
}) => {
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

    return (
        <Card className="border-0 shadow-lg sticky top-6">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Eye className="text-amber-600" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
                        <p className="text-gray-500 text-sm mt-1">Real-time product preview</p>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-200 mb-4">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Product Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                <ImageIcon className="text-gray-400 mb-3" size={48} />
                                <p className="text-gray-500 text-sm text-center">
                                    Product image will appear here
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                            {formData.name || 'Your Product Name'}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                            {categories.find(c => c.value === formData.category)?.label || 'Product Category'}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-3">
                            {formData.description || 'Product description will appear here...'}
                        </p>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm">Price:</span>
                            <div className="text-right">
                                {formData.discount ? (
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-xl font-bold text-gray-900">
                                                Rp {calculateDiscountedPrice().toLocaleString('id-ID')}
                                            </span>
                                            <span className="text-sm font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                                                Save {formData.discount}%
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500 line-through block">
                                            Rp {((formData.price) || 0).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xl font-bold text-gray-900">
                                        Rp {((formData.price) || 0).toLocaleString('id-ID')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Availability:</span>
                            <span className={`font-bold ${((formData.stock) || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formData.stock ? `${(formData.stock).toLocaleString('id-ID')} units` : 'Out of stock'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LivePreview;