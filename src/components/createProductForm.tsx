import { CheckCircle, DollarSign, ImageIcon, Loader2Icon, Package, Upload, X } from 'lucide-react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useCreateProduct } from '../hooks/products/useCreateProduct';
import type { ProductFormInputType } from '../schema/product-schema';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../components/ui/select';
import { Card } from './ui/card';

interface CreateProductFormProps {
    formData: ProductFormInputType & { image?: File | string };
    imagePreview: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (name: string, value: string) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    isFormValid: boolean;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
    formData,
    imagePreview,
    onInputChange,
    onSelectChange,
    onImageUpload,
    onRemoveImage,
    isFormValid,
}) => {
    const { createProductAsync, isSubmitting } = useCreateProduct();
    const navigate = useNavigate();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

            await createProductAsync(submitFormData);
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        onImageUpload(e);
    };

    const handleRemoveImage = () => {
        onRemoveImage();
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Product Information</h2>
                                <p className="text-gray-500 mt-1">Basic details about your product</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <Label htmlFor='name' className="block text-base font-semibold text-gray-700">
                                    Product Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id='name'
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={onInputChange}
                                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="e.g., Wireless Bluetooth Headphones"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor='description' className="block text-base font-semibold text-gray-700">
                                    Product Description <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={onInputChange}
                                    rows={5}
                                    className="w-full px-5 py-4 text-base border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                                    placeholder="Describe your product in detail..."
                                    maxLength={500}
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Include key features and specifications</span>
                                    <span>{formData.description.length}/500</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-base font-semibold text-gray-700">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => {
                                            onSelectChange('category', value);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
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
                                    <Label htmlFor='stock' className="block text-base font-semibold text-gray-700">
                                        Stock Quantity <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        name="stock"
                                        type="number"
                                        id="stock"
                                        value={formData.stock}
                                        onChange={onInputChange}
                                        min="0"
                                        className="w-full px-5 py-2 text-base border border-gray-300 rounded-md focus:ring-3 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter available quantity"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Pricing & Image Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg h-full">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Pricing</h2>
                                    <p className="text-gray-500 text-sm mt-1">Set product pricing</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                                        Base Price <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <span className="text-gray-700 font-bold">Rp</span>
                                        </div>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => {
                                                onInputChange(e);
                                            }}
                                            min="0"
                                            step="1000"
                                            className="w-full pl-14 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="discount" className="block text-sm font-semibold text-gray-700">
                                        Discount
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="discount"
                                            name="discount"
                                            type="number"
                                            value={formData.discount}
                                            onChange={onInputChange}
                                            min="0"
                                            max="100"
                                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="0"
                                        />
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <span className="text-gray-700 font-bold">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 shadow-lg h-fit">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <ImageIcon className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Product Image</h2>
                                    <p className="text-gray-500 text-sm mt-1">Upload main product image</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {imagePreview ? (
                                    <div className="relative group">
                                        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 border-2 border-gray-200">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105"
                                            title="Remove image"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <Label className="block cursor-pointer">
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all duration-300 bg-gray-50 hover:bg-blue-50"
                                            onClick={() => {
                                                fileInputRef.current?.click();
                                            }}
                                        >
                                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                                                <Upload className="text-blue-600" size={28} />
                                            </div>
                                            <p className="text-lg font-semibold text-gray-700 mb-2">
                                                Click to upload
                                            </p>
                                            <p className="text-sm text-gray-500 mb-3">
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
                                        />
                                    </Label>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-4">
                    <div className="pt-6 mt-6 border-t">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements Status</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Product name', value: formData.name, required: true },
                                { label: 'Product description', value: formData.description, required: true },
                                { label: 'Category selection', value: formData.category, required: true },
                                { label: 'Base price', value: formData.price, required: true },
                                { label: 'Stock quantity', value: formData.stock, required: true },
                                { label: 'Product image', value: imagePreview, required: false },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.value ? 'bg-green-100 border-2 border-green-200' : 'bg-gray-100 border-2 border-gray-200'}`}>
                                            {item.value ? (
                                                <CheckCircle className="text-green-600" size={16} />
                                            ) : (
                                                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                            )}
                                        </div>
                                        <span className={`text-sm ${item.value ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {item.value ? '✓ Complete' : 'Required'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer"
                        disabled={isSubmitting || !isFormValid}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-3">
                                <Loader2Icon className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></Loader2Icon>
                                Creating...
                            </span>
                        ) : (
                            'Publish Product'
                        )}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full py-4 text-base rounded-xl"
                        onClick={() => {
                            navigate('/products');
                        }}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CreateProductForm;