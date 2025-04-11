// src/pages/Login.tsx
import { Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useUserStore } from '@/stores/use-user-store';

export default function Login() {
    // Usamos el store de Zustand para obtener y actualizar el estado
    const { isLoading, login, setLoading } = useUserStore();

    // Estado local para email y password
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Iniciamos el estado de carga

        try {
            await login(emailInput, passwordInput); // Llamamos a la función login del store
            window.location.href = '/dashboard'; // Redirigimos al dashboard
        } catch (error) {
            setErrors(['Error al iniciar sesión. Inténtalo de nuevo.']);
        } finally {
            setLoading(false); // Terminamos el estado de carga
        }
    };

    return (
        <>
            <Head title="Login" />
            <div className="flex min-h-screen items-center justify-center">
                <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
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
                            onChange={(e) => setEmailInput(e.target.value)} // Actualizamos el estado del email
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
                            onChange={(e) => setPasswordInput(e.target.value)} // Actualizamos el estado de la contraseña
                        />
                        {errors.length > 0 && <InputError message={errors[0]} className="mt-2" />}
                    </div>

                    <div>
                        <Button type="submit" className="w-full">
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
