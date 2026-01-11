export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: imageUrl;
    category: Category;
    rating: number;
    stock: number;
    discount?: number;
}
export interface CartItem {
    product: Product;
    quantity: number;
}

export interface imageUrl {
    id: string;
    url: string;
}

export interface FilterOptions {
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name';
}

export enum Category {
    ELECTRONICS = 'ELECTRONICS',
    FASHION = 'FASHION',
    HOME = 'HOME',
    BEAUTY = 'BEAUTY',
    SPORTS = 'SPORTS',
    AUTOMOTIVE = 'AUTOMOTIVE',
    BOOKS = 'BOOKS',
    MUSIC = 'MUSIC',
}

export const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Gaming",
    "Books"
];