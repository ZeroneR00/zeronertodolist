import React, { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

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




                        {/* Войти */}

                        <Sheet>
                            <SheetTrigger asChild>
                                <span className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:text-accent-primary hover:scale-105 active:scale-95 cursor:pointer"
                                    style={{ color: theme.text.primary }}>
                                    Войти
                                </span>
                            </SheetTrigger>
                            <SheetContent style={{
                                backgroundColor: theme.background.primary,
                                color: theme.text.primary,
                                borderColor: theme.todoList.border
                            }} >
                                <SheetHeader>
                                    <SheetTitle style={{ color: theme.text.primary }} >Edit profile</SheetTitle>
                                    <SheetDescription style={{ color: theme.text.tertiary }} >
                                        Make changes to your profile here. Click save when you&apos;re done.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">Name</Label>
                                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-username">Username</Label>
                                        <Input id="sheet-demo-username" defaultValue="@peduarte" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button type="submit" style={{
                                        backgroundColor: theme.accent.primary,
                                        color: theme.text.white
                                    }}>Войти с помощью яиц</Button>
                                    <SheetClose asChild>
                                        <Button variant="outline" style={{
                                            backgroundColor: theme.accent.warning,
                                            color: theme.text.white
                                        }}>Закрыть яйца</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        {/* Войти */}





                        {/* Регистрация */}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                                    style={{
                                        backgroundColor: theme.accent.primary,
                                        color: theme.text.white
                                    }}>
                                    Регистрация</Button>
                            </SheetTrigger>
                            <SheetContent style={{
                                backgroundColor: theme.background.primary,
                                color: theme.text.primary,
                                borderColor: theme.todoList.border
                            }} >
                                <SheetHeader>
                                    <SheetTitle style={{ color: theme.text.primary }} >Регистрация</SheetTitle>
                                    <SheetDescription style={{ color: theme.text.tertiary }} >
                                        Убедитесь что у вас есть яйца, перед тем как зарегистрироваться
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">Логин</Label>
                                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-username">Пароль</Label>
                                        <Input id="sheet-demo-username" defaultValue="@peduarte" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button type="submit" style={{
                                        backgroundColor: theme.accent.primary,
                                        color: theme.text.white
                                    }}>Заригистрировать яйца</Button>
                                    <SheetClose asChild>
                                        <Button variant="outline" style={{
                                            backgroundColor: theme.accent.warning,
                                            color: theme.text.white
                                        }}>Отменить регистрацию яиц</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>


                        {/* Регистрация */}


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
                            <Sheet>
                                <SheetTrigger>
                                    <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:text-accent-primary hover:scale-105 active:scale-95"
                                        style={{ color: theme.text.primary }}>
                                        Войти
                                    </button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>


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