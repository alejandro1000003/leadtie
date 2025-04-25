import { Link } from '@inertiajs/react';

export default function Home() {
  return (
    <>
      <div className="flex w-full h-screen flex-col justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mt-16">
            <h1 className="text-5xl font-extrabold mb-4">Bienvenido a tu Plataforma CRM</h1>
            <p className="text-xl mb-8">Gestiona clientes, oportunidades y tareas de manera eficiente, todo en un solo lugar.</p>
            <Link 
              href="/login" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
