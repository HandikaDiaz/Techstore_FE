import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ProductFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: { min: number; max: number };
    onPriceChange: (min: number, max: number) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    sortBy,
    onSortChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'name', label: 'Name A-Z' },
    ];

    return (
        <Card className="mb-6 px-5 border-white">
            <div className="md:hidden mb-4">
                <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center">
                        <Filter size={16} className="mr-2" />
                        Filters & Sort
                    </div>
                    <ChevronDown
                        size={16}
                        className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden md:block'}`}>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Categories
                        </h3>
                        <div className="space-y-2">
                            <Select value={selectedCategory} onValueChange={onCategoryChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Min: Rp {priceRange.min.toLocaleString('id-ID')}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50000000"
                                    step="1000000"
                                    value={priceRange.min}
                                    onChange={(e) => onPriceChange(Number(e.target.value), priceRange.max)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Max: Rp {priceRange.max.toLocaleString('id-ID')}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50000000"
                                    step="1000000"
                                    value={priceRange.max}
                                    onChange={(e) => onPriceChange(priceRange.min, Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Sort By
                        </h3>
                        <div className="space-y-2">
                            <Select value={sortBy} onValueChange={onSortChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {sortOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortBy === option.value
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t md:hidden">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            onCategoryChange('All');
                            onPriceChange(0, 50000000);
                            onSortChange('featured');
                        }}
                    >
                        Clear All Filters
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductFilter;