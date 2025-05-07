// src/pages/Login.tsx
import { Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useUserStore } from '@/stores/use-user-store';

export default function Login() {

    const { isLoading, login, logout, setLoading } = useUserStore();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await logout();
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
            <span className="block text-sm text-gray-500">
                Administrador: <strong>admin@example.com</strong> Password: <strong>1234567891</strong><br />
                Usuario: <strong>user@example.com</strong> Password: <strong>1234567891</strong>
            </span>

            <Head title="Login" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <h1 className='hidden md:font-bold md:mr-15 md:block'>Login</h1>
                <form className="space-y-6 w-full max-w-md border p-5 bg-white rounded-lg" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium">
                            Correo Electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            placeholder="Ingresa tu correo"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        {errors.length > 0 && <InputError message={errors[0]} className="mt-2" />}
                    </div>

                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            placeholder="Ingresa tu contraseña"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        {errors.length > 0 && <InputError message={errors[0]} className="mt-2" />}
                    </div>

                    <div>
                        <Button type="submit" className="w-full bg-gray-800">
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
