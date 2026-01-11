import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductFilter from '../components/productFilter';
import ProductGrid from '../components/productGrid';
import { Button } from '../components/ui/button';
import { useProducts } from '../hooks/products/useProducts';
import { categories, type Product } from '../types';

interface Params {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}

const Home: React.FC = () => {
    const { data, isLoading, error } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('category') || 'All'
    );
    const [priceRange, setPriceRange] = useState({
        min: parseInt(searchParams.get('minPrice') || '0'),
        max: parseInt(searchParams.get('maxPrice') || '50000000'),
    });
    const [sortBy, setSortBy] = useState(
        searchParams.get('sort') || 'featured'
    );

    useEffect(() => {
        const params: Params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (priceRange.min > 0) params.minPrice = priceRange.min;
        if (priceRange.max < 50000000) params.maxPrice = priceRange.max;
        if (sortBy !== 'featured') params.sort = sortBy;

        setSearchParams(params as Record<string, string | string[]>);
    }, [selectedCategory, priceRange, sortBy, setSearchParams]);

    useEffect(() => {
        let products = [...data];

        if (selectedCategory !== 'All') {
            products = products.filter(product => product.category === selectedCategory);
        }

        products = products.filter(
            product => product.price >= priceRange.min && product.price <= priceRange.max
        );

        switch (sortBy) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setTimeout(() => {
            setFilteredProducts(products);
            setLoading(false);
        }, 300);
    }, [selectedCategory, priceRange, sortBy, data]);

    const handleAddToCart = (product: Product) => {
        toast.success(`${product.name} added to cart!`);
    };

    const handlePriceChange = (min: number, max: number) => {
        setPriceRange({ min, max });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Products</h2>
                <p className="text-gray-600 mb-4">Please try refreshing the page.</p>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                >
                    Refresh Page
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className='flex flex-col gap-8'>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Premium Electronics & Gadgets
                                </h1>
                                <p className="text-xl mb-8 opacity-90">
                                    Discover the latest tech products with unbeatable prices and exceptional quality.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/products">
                                    <Button variant="outline" size="lg" className="border-white text-black hover:bg-gray-300 hover:text-blue-600 flex items-center cursor-pointer">
                                        Shop Now <ArrowRight className="ml-2" size={20} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop"
                                alt="Hero"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
                <p className="text-gray-600">
                    Discover our curated collection of premium products
                </p>
            </div>

            <ProductFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredProducts.length}</span> products
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => {
                            setSelectedCategory('All');
                            setPriceRange({ min: 0, max: 50000000 });
                            setSortBy('featured');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        Clear all filters
                    </button>
                </div>
            </div>

            <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                loading={loading}
                emptyMessage="No products match your filters"
            />
        </div>
    );
};

export default Home;