import React, { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, isDarkTheme, toggleTheme } = useTheme();

    return (
        <header className="w-full shadow-md transition-colors duration-200"
                style={{ backgroundColor: theme.background.secondary }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold transition-colors duration-200"
                            style={{ color: theme.accent.primary }}>
                            TodoList
                        </h1>
                    </div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" 
                           className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-accent-primary"
                           style={{ color: theme.text.primary }}>
                            Главная
                        </a>
                        <a href="#" 
                           className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-accent-primary"
                           style={{ color: theme.text.primary }}>
                            Задачи
                        </a>
                    </nav>

                    {/* Theme Switcher */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md transition-colors duration-200 hover:bg-opacity-80"
                        style={{ 
                            color: theme.text.primary,
                            backgroundColor: theme.background.primary
                        }}
                    >
                        {isDarkTheme ? '☀️' : '🌙'}
                    </button>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent-primary hover:scale-105 active:scale-95"
                                style={{ color: theme.text.primary }}>
                            Войти
                        </button>
                        <button className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                                style={{ 
                                    backgroundColor: theme.accent.primary,
                                    color: theme.text.white
                                }}>
                            Регистрация
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md transition-colors duration-200 hover:bg-opacity-80"
                            style={{ color: theme.text.primary }}
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#" 
                               className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:text-accent-primary"
                               style={{ color: theme.text.primary }}>
                                Главная
                            </a>
                            <a href="#" 
                               className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:text-accent-primary"
                               style={{ color: theme.text.primary }}>
                                Задачи
                            </a>
                            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:text-accent-primary hover:scale-105 active:scale-95"
                                    style={{ color: theme.text.primary }}>
                                Войти
                            </button>
                            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                                    style={{ 
                                        backgroundColor: theme.accent.primary,
                                        color: theme.text.white
                                    }}>
                                Регистрация
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;