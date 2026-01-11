import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" text-gray-900">
            <p className="text-gray-400">
                © {currentYear} TechStore. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
                This is a demo project for educational purposes.
            </p>
        </footer>
    );
};

export default Footer;