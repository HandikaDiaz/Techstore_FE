import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import {
    LogOut,
    Package,
    Settings,
    ShoppingCart,
    User,
    UserCircle
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { Button } from './ui/button';

interface DropdownMenuUserMenuProps {
    className?: string;
}

const Avatar: React.FC<DropdownMenuUserMenuProps> = ({ className }) => {
    const navigate = useNavigate();
    const { user, logout, isLoading } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) {
        return null;
    }

    const userMenuItems = [
        {
            icon: User,
            label: 'Profile',
            onClick: () => navigate('/profile'),
            className: 'text-gray-700 hover:text-gray-900'
        },
        {
            icon: Package,
            label: 'My Products',
            onClick: () => navigate('/my-products'),
            className: 'text-gray-700 hover:text-gray-900'
        },
        {
            icon: ShoppingCart,
            label: 'My Orders',
            onClick: () => navigate('/orders'),
            className: 'text-gray-700 hover:text-gray-900'
        },
        {
            icon: Settings,
            label: 'Settings',
            onClick: () => navigate('/settings'),
            className: 'text-gray-700 hover:text-gray-900'
        },
        {
            icon: LogOut,
            label: 'Logout',
            onClick: handleLogout,
            className: 'text-red-600 hover:text-red-700'
        }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`overflow-hidden rounded-full hover:bg-gray-100 ${className}`}
                    disabled={isLoading}
                >
                    {user ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {user.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                            <UserCircle size={20} />
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50"
                align="end"
                sideOffset={5}
            >
                <>
                    <DropdownMenuLabel className="px-2 py-1.5">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-semibold text-gray-900">
                                {user?.username || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user?.email || 'user@example.com'}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                    <DropdownMenuGroup className="space-y-0.5">
                        {userMenuItems.slice(0, -1).map((item, index) => (
                            <DropdownMenuItem
                                key={index}
                                onClick={item.onClick}
                                className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-50 transition-colors ${item.className}`}
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                    <DropdownMenuItem
                        onClick={userMenuItems[userMenuItems.length - 1].onClick}
                        className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-red-50 transition-colors ${userMenuItems[userMenuItems.length - 1].className}`}
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Avatar;