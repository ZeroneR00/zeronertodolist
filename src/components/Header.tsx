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

    // --- Новое состояние для аутентификации ---
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState('');

    type User = { email: string; name?: string; id?: string };
    const [user, setUser] = useState<User | null>(null);

    // --- Хендлеры ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setLoginLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                setLoginEmail('');
                setLoginPassword('');
            } else {
                setLoginError(data.error || 'Ошибка входа');
            }
        } catch (err) {
            setLoginError('Ошибка сети');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError('');
        setRegisterSuccess('');
        setRegisterLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: registerEmail, password: registerPassword, name: registerName })
            });
            const data = await res.json();
            if (res.ok) {
                setRegisterSuccess('Регистрация успешна!');
                setRegisterEmail('');
                setRegisterPassword('');
                setRegisterName('');
            } else {
                setRegisterError(data.error || 'Ошибка регистрации');
            }
        } catch (err) {
            setRegisterError('Ошибка сети');
        } finally {
            setRegisterLoading(false);
        }
    };

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
                        {user ? (
                            <>
                                <span className="text-green-600 font-semibold">Привет, {user.email}!</span>
                                <Button className="ml-4" variant="outline" onClick={() => setUser(null)}>
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
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
                                            <SheetTitle style={{ color: theme.text.primary }} >Вход</SheetTitle>
                                            <SheetDescription style={{ color: theme.text.tertiary }} >Введите email и пароль для входа.</SheetDescription>
                                        </SheetHeader>
                                        <form className="grid flex-1 auto-rows-min gap-6 px-4" onSubmit={handleLogin}>
                                            <div className="grid gap-3">
                                                <Label htmlFor="login-email">Email</Label>
                                                <Input id="login-email" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="login-password">Пароль</Label>
                                                <Input id="login-password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                                            </div>
                                            {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
                                            <SheetFooter>
                                                <Button type="submit" style={{ backgroundColor: theme.accent.primary, color: theme.text.white }} disabled={loginLoading}>
                                                    {loginLoading ? 'Вход...' : 'Войти'}
                                                </Button>
                                                <SheetClose asChild>
                                                    <Button variant="outline" style={{ backgroundColor: theme.accent.warning, color: theme.text.white }} type="button">Закрыть</Button>
                                                </SheetClose>
                                            </SheetFooter>
                                        </form>
                                    </SheetContent>
                                </Sheet>
                                {/* Регистрация */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                                            style={{ backgroundColor: theme.accent.primary, color: theme.text.white }}>
                                            Регистрация
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent style={{
                                        backgroundColor: theme.background.primary,
                                        color: theme.text.primary,
                                        borderColor: theme.todoList.border
                                    }} >
                                        <SheetHeader>
                                            <SheetTitle style={{ color: theme.text.primary }} >Регистрация</SheetTitle>
                                            <SheetDescription style={{ color: theme.text.tertiary }} >Введите email, имя и пароль для регистрации.</SheetDescription>
                                        </SheetHeader>
                                        <form className="grid flex-1 auto-rows-min gap-6 px-4" onSubmit={handleRegister}>
                                            <div className="grid gap-3">
                                                <Label htmlFor="register-name">Имя</Label>
                                                <Input id="register-name" value={registerName} onChange={e => setRegisterName(e.target.value)} required />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="register-email">Email</Label>
                                                <Input id="register-email" type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} required />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="register-password">Пароль</Label>
                                                <Input id="register-password" type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} required minLength={6} />
                                            </div>
                                            {registerError && <div className="text-red-500 text-sm">{registerError}</div>}
                                            {registerSuccess && <div className="text-green-600 text-sm">{registerSuccess}</div>}
                                            <SheetFooter>
                                                <Button type="submit" style={{ backgroundColor: theme.accent.primary, color: theme.text.white }} disabled={registerLoading}>
                                                    {registerLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                                                </Button>
                                                <SheetClose asChild>
                                                    <Button variant="outline" style={{ backgroundColor: theme.accent.warning, color: theme.text.white }} type="button">Отменить</Button>
                                                </SheetClose>
                                            </SheetFooter>
                                        </form>
                                    </SheetContent>
                                </Sheet>
                            </>
                        )}
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