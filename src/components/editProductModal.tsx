import {
    CheckCircle,
    DollarSign,
    Eye,
    ImageIcon,
    Loader2Icon,
    Package,
    Pencil,
    Save,
    Upload,
    X
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useEditProduct } from '../hooks/products/useEditProduct';
import type { ProductFormInputType } from '../schema/product-schema';
import type { Product } from '../types';

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    isOpen,
    onClose,
    productId,
    product
}) => {
    const [formData, setFormData] = useState<ProductFormInputType & { image?: File }>({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        category: product.category || 'ELECTRONICS',
        stock: product.stock || 0,
        discount: product.discount || 0,
        rating: 0,
        image: undefined,
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const { editProductAsync, isSubmitting } = useEditProduct(productId);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFormData(prev => ({ ...prev, image: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview('');
        setFormData(prev => ({ ...prev, image: undefined }));
    };

    const isFormValid = () => {
        return formData.name &&
            formData.description &&
            formData.price &&
            formData.category &&
            formData.stock;
    };

    const calculateDiscountedPrice = () => {
        const price = Number(formData.price) || 0;
        const discount = Number(formData.discount) || 0;
        if (discount > 0) {
            return price * (1 - discount / 100);
        }
        return price;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const submitFormData = new FormData();

            submitFormData.append('name', formData.name);
            submitFormData.append('description', formData.description);
            submitFormData.append('price', String(formData.price));
            submitFormData.append('category', formData.category);
            submitFormData.append('rating', String(formData.rating || 0));
            submitFormData.append('stock', String(formData.stock));
            submitFormData.append('discount', String(formData.discount || 0));

            if (formData.image && formData.image instanceof File) {
                submitFormData.append('image', formData.image);
            }

            await editProductAsync(submitFormData);
            onClose();
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[1500px] max-h-[90vh] overflow-hidden p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Pencil className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold">Edit Product</DialogTitle>
                                <DialogDescription>
                                    Update product information for <span className="font-semibold">{formData.name || 'Product'}</span>
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 pb-6">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Product Information */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Package className="text-blue-600" size={24} />
                                            </div>
                                            <div>
                                                <CardTitle>Product Information</CardTitle>
                                                <p className="text-sm text-gray-500 mt-1">Update product details</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor='edit-name' className="text-base font-semibold">
                                                Product Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id='edit-name'
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Wireless Bluetooth Headphones"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor='edit-description' className="text-base font-semibold">
                                                Product Description <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="edit-description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Describe your product in detail..."
                                                maxLength={500}
                                            />
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>Include key features and specifications</span>
                                                <span>{formData.description.length}/500</span>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-base font-semibold">
                                                    Category <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={(value) => handleSelectChange('category', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {categories.map((category) => (
                                                                <SelectItem
                                                                    key={category.value}
                                                                    value={category.value}
                                                                >
                                                                    {category.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor='edit-stock' className="text-base font-semibold">
                                                    Stock Quantity <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    name="stock"
                                                    type="number"
                                                    id="edit-stock"
                                                    value={formData.stock}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                    placeholder="Enter available quantity"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Pricing & Image Side by Side */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Pricing */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <DollarSign className="text-green-600" size={24} />
                                                </div>
                                                <div>
                                                    <CardTitle>Pricing</CardTitle>
                                                    <p className="text-sm text-gray-500 mt-1">Update product pricing</p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="edit-price" className="font-semibold">
                                                    Base Price <span className="text-red-500">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                        <span className="text-gray-700 font-bold">Rp</span>
                                                    </div>
                                                    <Input
                                                        id="edit-price"
                                                        name="price"
                                                        type="number"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        min="0"
                                                        step="1000"
                                                        className="pl-12"
                                                        placeholder="0"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="edit-discount" className="font-semibold">
                                                        Discount
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="edit-discount"
                                                            name="discount"
                                                            type="number"
                                                            value={formData.discount}
                                                            onChange={handleInputChange}
                                                            min="0"
                                                            max="100"
                                                            placeholder="0"
                                                        />
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <span className="text-gray-700 font-bold">%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor='edit-rating' className="font-semibold">
                                                        Rating
                                                    </Label>
                                                    <Input
                                                        id="edit-rating"
                                                        name="rating"
                                                        type="number"
                                                        value={formData.rating}
                                                        onChange={handleInputChange}
                                                        min="0"
                                                        max="5"
                                                        step="0.1"
                                                        placeholder="0.0 - 5.0"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Image Upload */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <ImageIcon className="text-purple-600" size={24} />
                                                </div>
                                                <div>
                                                    <CardTitle>Product Image</CardTitle>
                                                    <p className="text-sm text-gray-500 mt-1">Update product image</p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {imagePreview ? (
                                                    <div className="relative group">
                                                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveImage}
                                                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
                                                            title="Remove image"
                                                            disabled={isSubmitting}
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Label className="block cursor-pointer">
                                                        <div
                                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-all bg-gray-50 hover:bg-blue-50"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                                                                <Upload className="text-blue-600" size={24} />
                                                            </div>
                                                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                                                Click to upload
                                                            </p>
                                                            <p className="text-xs text-gray-500 mb-3">
                                                                or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                PNG, JPG (max. 5MB)
                                                            </p>
                                                        </div>
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            name="image"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                            disabled={isSubmitting}
                                                        />
                                                    </Label>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-amber-100 rounded-lg">
                                                <Eye className="text-amber-600" size={24} />
                                            </div>
                                            <div>
                                                <CardTitle>Live Preview</CardTitle>
                                                <p className="text-sm text-gray-500 mt-1">Real-time product preview</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Product Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                                    <ImageIcon className="text-gray-400 mb-2" size={36} />
                                                    <p className="text-gray-500 text-sm text-center">
                                                        No image uploaded
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                                                    {formData.name || 'Product Name'}
                                                </h4>
                                                <p className="text-gray-500 text-sm mb-2">
                                                    {categories.find(c => c.value === formData.category)?.label || 'Category'}
                                                </p>
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {formData.description || 'Product description will appear here...'}
                                                </p>
                                            </div>

                                            <div className="pt-3 border-t">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-gray-600 text-sm">Price:</span>
                                                    <div className="text-right">
                                                        {formData.discount && Number(formData.discount) > 0 ? (
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <span className="text-lg font-bold text-gray-900">
                                                                        Rp {calculateDiscountedPrice().toLocaleString('id-ID')}
                                                                    </span>
                                                                    <Badge variant="destructive" className="text-xs">
                                                                        {formData.discount}% OFF
                                                                    </Badge>
                                                                </div>
                                                                <span className="text-sm text-gray-500 line-through block">
                                                                    Rp {(Number(formData.price) || 0).toLocaleString('id-ID')}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-lg font-bold text-gray-900">
                                                                Rp {(Number(formData.price) || 0).toLocaleString('id-ID')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {formData.rating && (
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-gray-600 text-sm">Rating:</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className={`text-sm ${i < Math.floor(Number(formData.rating)) ? 'text-yellow-500' : 'text-gray-300'}`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-900">
                                                                {formData.rating}/5
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600 text-sm">Stock:</span>
                                                    <span className={`font-bold ${(Number(formData.stock) || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {formData.stock ? `${Number(formData.stock).toLocaleString('id-ID')} units` : 'Out of stock'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Update Status</h3>
                                            {[
                                                { label: 'Product name', value: formData.name, required: true },
                                                { label: 'Product description', value: formData.description, required: true },
                                                { label: 'Category', value: formData.category, required: true },
                                                { label: 'Base price', value: formData.price, required: true },
                                                { label: 'Stock quantity', value: formData.stock, required: true },
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.value ? 'bg-green-100' : 'bg-gray-100'}`}>
                                                            {item.value ? (
                                                                <CheckCircle className="text-green-600" size={14} />
                                                            ) : (
                                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                            )}
                                                        </div>
                                                        <span className={`text-sm ${item.value ? 'text-gray-900' : 'text-gray-600'}`}>
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <Badge variant={item.value ? "default" : "secondary"} className="text-xs">
                                                        {item.value ? '✓ Complete' : 'Required'}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>

                                        <DialogFooter className="pt-4 border-t space-y-3 sm:space-y-0">
                                            <Button
                                                type="submit"
                                                className="w-full sm:w-auto"
                                                disabled={isSubmitting || !isFormValid()}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Update Product
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={onClose}
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogFooter>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;