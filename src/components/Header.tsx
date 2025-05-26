import React, { useState } from 'react';

// Добавляем тип для пропсов
interface HeaderProps {
    onThemeChange?: (isDark: boolean) => void;
    isDarkTheme?: boolean;
}

const Header = ({ onThemeChange, isDarkTheme = false }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Обработчик изменения темы
    const handleThemeChange = () => {
        // Вызываем функцию, переданную через пропсы
        onThemeChange?.(!isDarkTheme);
    };

    return (
        <header className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className={`text-2xl font-bold ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>
                            TodoList
                        </h1>
                    </div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className={`${isDarkTheme ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}>
                            Главная
                        </a>
                        <a href="#" className={`${isDarkTheme ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}>
                            Задачи
                        </a>
                    </nav>

                    {/* Theme Switcher */}
                    <button
                        onClick={handleThemeChange}
                        className={`p-2 rounded-md ${isDarkTheme ? 'text-yellow-400' : 'text-gray-600'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}
                    >
                        {isDarkTheme ? '☀️' : '🌙'}
                    </button>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className={`${isDarkTheme ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}>
                            Войти
                        </button>
                        <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                            Регистрация
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} hover:text-indigo-600 p-2 rounded-md`}
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#" className={`${isDarkTheme ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} block px-3 py-2 rounded-md text-base font-medium`}>
                                Главная
                            </a>
                            <a href="#" className={`${isDarkTheme ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} block px-3 py-2 rounded-md text-base font-medium`}>
                                Задачи
                            </a>
                            <button className={`${isDarkTheme ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} block w-full text-left px-3 py-2 rounded-md text-base font-medium`}>
                                Войти
                            </button>
                            <button className="bg-indigo-600 text-white hover:bg-indigo-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
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