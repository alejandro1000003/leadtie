// src/pages/Login.tsx
import { Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useUserStore } from '@/stores/use-user-store';

export default function Login() {

    const { isLoading, login, setLoading } = useUserStore();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(emailInput, passwordInput);
            window.location.href = '/dashboard';
        } catch (error) {
            setErrors(['Error al iniciar sesión. Inténtalo de nuevo.']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Login" />
            <div className="flex min-h-screen items-center justify-center">
                <form
                    className="space-y-6 w-full max-w-md p-8 bg-white rounded-xl border-5 border-gray-400"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Iniciar sesión</h2>
                    
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-600 focus:border-indigo-600"
                            placeholder="Ingresa tu correo"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        {errors.length > 0 && <InputError message={errors[0]} className="mt-2" />}
                    </div>

                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-full border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-indigo-600 focus:border-indigo-600"
                            placeholder="Ingresa tu contraseña"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        {errors.length > 0 && <InputError message={errors[0]} className="mt-2" />}
                    </div>

                    <div>
                        <Button 
                            type="submit" 
                            className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
                        >
                            Iniciar sesión
                        </Button>
                    </div>

                </form>
            </div>
        </>
    );
}
