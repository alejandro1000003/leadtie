// src/pages/Login.tsx
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/stores/use-user-store';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react'; // Importa useEffect aquí

export default function Login() {
    const { isLoading, login, logout, setLoading } = useUserStore();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    // AÑADE ESTE useEffect
    useEffect(() => {
        // Asegúrate de que isLoading sea false al cargar o recargar la página
        setLoading(false);
    }, [setLoading]); // Dependencia en setLoading para que se ejecute solo una vez al montar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // await logout();
            await login(emailInput, passwordInput);
            router.visit('/dashboard');
        } catch (error) {
            setErrors(['Error al iniciar sesión. Inténtalo de nuevo.']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Login" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="mb-8 text-center md:hidden">
                    <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                </div>

                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md md:p-8">
                    <div className="mb-6 hidden text-center md:block">
                        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                placeholder="Ingresa tu correo"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                disabled={isLoading}
                            />
                            {errors.length > 0 && <InputError message={errors[0]} className="mt-2 text-red-600" />}
                        </div>

                        <div>
                            <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                                Contraseña
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="focus:ring-opacity-50 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                                placeholder="Ingresa tu contraseña"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                disabled={isLoading}
                            />
                            {errors.length > 0 && <InputError message={errors[0]} className="mt-2 text-red-600" />}
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cargando...
                                    </span>
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="px-2 pt-6 text-left text-gray-500">
                        <h2 className="text-2xl font-semibold text-gray-800">Credenciales de prueba</h2>
                        <div className="pt-4 text-sm text-gray-500">
                            <ul className="list-inside list-disc space-y-2">
                                <li>
                                    <strong className="font-semibold text-gray-700">Administrador:</strong>
                                    <span className="ml-2">admin@example.com</span>
                                </li>
                                <li>
                                    <strong className="font-semibold text-gray-700">Contraseña:</strong>
                                    <span className="ml-2">1234567891</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <strong className="font-semibold text-gray-700">Usuario:</strong>
                                    <span className="ml-2">user@example.com</span>
                                </li>
                                <li>
                                    <strong className="font-semibold text-gray-700">Contraseña:</strong>
                                    <span className="ml-2">1234567891</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}