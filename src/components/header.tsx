import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { AuthModal } from './authModal';
import Avatar from './avatar';

const Header: React.FC = () => {
    const { user, isLoading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const baseNavLinks = [
        { to: '/', label: 'Home' },
    ];

    const userNavLinks = [
        { to: '/products', label: 'Products' },
        { to: '/create-product', label: 'Create Product' },
    ];

    const navLinks = user
        ? [...baseNavLinks, ...userNavLinks]
        : baseNavLinks;

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">TS</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TechStore
                            </h1>
                            <p className="text-xs text-gray-500">Premium Gadgets & More</p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-lg ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-3">
                        {!user && !isLoading && (
                            <div className="hidden md:flex items-center space-x-2">
                                <AuthModal triggerName="Login" variant='login' defaultTab="login" />
                                <AuthModal triggerName="Register" variant='register' defaultTab="register" />
                            </div>
                        )}

                        <Avatar />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            {!user && !isLoading && (
                                <>
                                    <div className="h-px bg-gray-100 my-2" />
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;