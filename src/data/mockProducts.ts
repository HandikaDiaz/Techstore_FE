import type { Product } from "../types";

export const mockProducts: Product[] = [
    {
        id: 1,
        name: "MacBook Pro M3",
        description: "Laptop premium dengan chip Apple M3, 16GB RAM, 512GB SSD",
        price: 24999000,
        image: {
            id: "1",
            url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop"
        },
        category: "Electronics",
        rating: 4.8,
        stock: 15,
        discount: 10
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        description: "Smartphone flagship dengan kamera 48MP dan Dynamic Island",
        price: 18999000,
        image: {
            id: "2",
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
        },
        category: "Electronics",
        rating: 4.7,
        stock: 25
    },
    {
        id: 3,
        name: "Samsung Odyssey G9",
        description: "Monitor ultra-wide 49 inci dengan refresh rate 240Hz",
        price: 15999000,
        image: {
            id: "3",
            url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"
        },
        category: "Electronics",
        rating: 4.6,
        stock: 8,
        discount: 15
    },
    {
        id: 4,
        name: "Nike Air Max 270",
        description: "Sepatu sneakers dengan cushioning Air Max terbesar",
        price: 2499000,
        image: {
            id: "4",
            url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop"
        },
        category: "Fashion",
        rating: 4.5,
        stock: 50
    },
    {
        id: 5,
        name: "Levi's 511 Slim Fit",
        description: "Celana jeans slim fit dari bahan denim premium",
        price: 899000,
        image: {
            id: "5",
            url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"
        },
        category: "Fashion",
        rating: 4.3,
        stock: 40
    },
    {
        id: 6,
        name: "Kindle Paperwhite",
        description: "E-reader dengan display 6.8 inci dan waterproof",
        price: 2999000,
        image: {
            id: "6",
            url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop"
        },
        category: "Books",
        rating: 4.7,
        stock: 30,
        discount: 20
    },
    {
        id: 7,
        name: "Dyson V11 Vacuum",
        description: "Vacuum cleaner cordless dengan teknologi cyclone",
        price: 8999000,
        image: {
            id: "7",
            url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"
        },
        category: "Home",
        rating: 4.4,
        stock: 12
    },
    {
        id: 8,
        name: "Nintendo Switch OLED",
        description: "Console gaming dengan screen OLED 7 inci",
        price: 5999000,
        image: {
            id: "8",
            url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop"
        },
        category: "Gaming",
        rating: 4.8,
        stock: 20,
        discount: 5
    },
    {
        id: 9,
        name: "Logitech MX Master 3",
        description: "Wireless mouse premium dengan ergonomic design",
        price: 1499000,
        image: {
            id: "9",
            url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop"
        },
        category: "Electronics",
        rating: 4.6,
        stock: 35
    },
    {
        id: 10,
        name: "Sonos Beam Soundbar",
        description: "Soundbar compact dengan Dolby Atmos dan voice control",
        price: 7999000,
        image: {
            id: "10",
            url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop"
        },
        category: "Electronics",
        rating: 4.5,
        stock: 10
    }
];

export const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Gaming",
    "Books"
];