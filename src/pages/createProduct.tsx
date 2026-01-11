import React, { useState } from 'react';
import CreateProductForm from '../components/createProductForm';
import LivePreview from '../components/livePreview';
import type { ProductFormInputType } from '../schema/product-schema';

const CreateProduct: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormInputType & { image?: File }>({
        name: '',
        description: '',
        price: 0,
        category: 'ELECTRONICS',
        stock: 0,
        discount: 0,
        rating: 0,
        image: undefined,
    });
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: name === 'price' || name === 'stock' || name === 'discount' || name === 'rating' 
                    ? (value === '' ? 0 : Number(value))
                    : value,
            };
            return newData;
        });
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
            };
            reader.readAsDataURL(file);
            
            setFormData(prev => ({
                ...prev,
                image: file,
            }));
        }
    };

    const removeImage = () => {
        setImagePreview('');
        setFormData(prev => ({
            ...prev,
            image: undefined,
        }));
    };

    const calculateDiscountedPrice = () => {
        const price = formData.price || 0;
        const discount = formData.discount || 0;
        if (discount > 0) {
            return price * (1 - discount / 100);
        }
        return price;
    };

    const isFormValid = () => {
        const valid = !!(formData.name && formData.price && formData.stock);
        return valid;
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-2 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
                    <p className="text-gray-600 mt-2">
                        Add a new product to your inventory. Fill in all required fields marked with *
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <CreateProductForm
                            formData={formData}
                            imagePreview={imagePreview}
                            onInputChange={handleInputChange}
                            onSelectChange={handleSelectChange}
                            onImageUpload={handleImageUpload}
                            onRemoveImage={removeImage}
                            isFormValid={isFormValid()}
                        />
                    </div>

                    <div className="space-y-6">
                        <LivePreview
                            formData={formData}
                            imagePreview={imagePreview}
                            calculateDiscountedPrice={calculateDiscountedPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;