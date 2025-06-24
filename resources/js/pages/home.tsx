import React from 'react';
import { Link } from '@inertiajs/react';

export default function ReadmePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            <header className="bg-white p-4 flex justify-between items-center shadow-md">
                <h2 className="text-2xl font-bold text-gray-900">Leadtie - CRM</h2>
                <Link href="/login" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300">
                    Iniciar sesión
                </Link>
            </header>

            <main className="flex-grow flex flex-col items-center p-8 bg-[#f0f4f8] overflow-y-auto">
                <article className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl prose lg:prose-lg">

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
                        Descripción del proyecto
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Esta aplicación es un <span className="font-bold">CRM</span> completo, diseñada para la gestión eficiente de <span className="font-bold">clientes</span>, <span className="font-bold">oportunidades de venta</span> y <span className="font-bold">tareas</span>. Busca optimizar el flujo de trabajo comercial a través de una interfaz clara y eficiente. Desarrollado como un proyecto de portfolio, está alineado con necesidades comerciales reales.
                    </p>


                    <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                        Características Principales
                    </h2>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                        <li><span className="font-bold">Gestión de Clientes</span>: Administra y organiza la información de tus clientes.</li>
                        <li><span className="font-bold">Oportunidades de Venta</span>: Haz seguimiento a tus prospectos y ventas potenciales.</li>
                        <li><span className="font-bold">Gestión de Tareas</span>: Organiza y asigna tareas para una mejor productividad.</li>
                    </ul>

                    <hr className="my-8 border-gray-300" />


                    <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                        Tecnologías Utilizadas
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Este proyecto ha sido construido con una pila de tecnologías modernas y robustas:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                        <li><span className="font-bold">Backend:</span> Laravel 12</li>
                        <li><span className="font-bold">Frontend:</span> React, TailwindCSS</li>
                        <li><span className="font-bold">Base de Datos:</span> SQLite</li>
                        <li><span className="font-bold">Branching:</span> Github Flow</li>
                        <li><span className="font-bold">Contenedorización:</span> Docker</li>
                    </ul>

                    <hr className="my-8 border-gray-300" />

                    <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                        Estructura del Backend
                    </h2>

                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Modelos y Relaciones</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        El backend está diseñado con una estructura de modelos clara y relaciones bien definidas:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                        <li>Cliente ➡️ Oportunidades ➡️ Tareas</li>
                        <li>Usuario solo para autenticación</li>
                    </ul>

                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">API</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        La API RESTful es robusta y ofrece las siguientes funcionalidades:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                        <li><span className="font-bold">Autenticación JWT</span> con refresh tokens</li>
                        <li><span className="font-bold">CRUD completo</span> para clientes, oportunidades y tareas</li>
                        <li><span className="font-bold">Filtros dinámicos</span>, <span className="font-bold">paginación</span> y <span className="font-bold">gestión de errores</span></li>
                    </ul>

                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Middleware</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Se han implementado varios middlewares para controlar el acceso y proteger la aplicación:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                        <li><span className="font-bold">IsAdmin:</span> Acceso restringido por rol</li>
                        <li><span className="font-bold">IsUserAuth:</span> Autenticación protegida</li>
                        <li><span className="font-bold">Throttling:</span> Protección contra ataques</li>
                    </ul>

                    <hr className="my-8 border-gray-300" />

                    <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                        Front-End
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        El frontend de la aplicación se enfoca en la usabilidad y la eficiencia:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                        <li><span className="font-bold">Interfaz intuitiva</span> con componentes reutilizables</li>
                        <li><span className="font-bold">Autenticación global</span> con JWT y refresh tokens</li>
                        <li><span className="font-bold">Manejo de errores</span> de autenticación y red</li>
                        <li><span className="font-bold">Escalable y accesible</span> para futuras mejoras</li>
                    </ul>

                    <hr className="my-8 border-gray-300" />

                    <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                        Rutas API y Web
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">API</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Método</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Ruta</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 border-b text-sm"><code>POST</code></td><td className="py-2 px-4 border-b text-sm"><code>/register</code>, <code>/login</code>, <code>/refresh</code>, <code>/getuser</code>, <code>/logout</code></td><td className="py-2 px-4 border-b text-sm">Autenticación y gestión de usuarios.</td></tr>
                                        <tr><td className="py-2 px-4 border-b text-sm"><code>GET</code></td><td className="py-2 px-4 border-b text-sm"><code>/user</code>, <code>/clients</code>, <code>/clients/total</code>, <code>/opportunities</code>, <code>/tasks</code>, <code>/tasks/total</code></td><td className="py-2 px-4 border-b text-sm">Obtención de datos y totales.</td></tr>
                                        <tr><td className="py-2 px-4 border-b text-sm"><code>PUT</code></td><td className="py-2 px-4 border-b text-sm"><code>/clients/&#123;id&#125;</code></td><td className="py-2 px-4 border-b text-sm">Actualización completa de clientes.</td></tr>
                                        <tr><td className="py-2 px-4 border-b text-sm"><code>PATCH</code></td><td className="py-2 px-4 border-b text-sm"><code>/clients/&#123;id&#125;</code>, <code>/opportunities/&#123;id&#125;</code>, <code>/tasks/&#123;id&#125;</code></td><td className="py-2 px-4 border-b text-sm">Actualización parcial de recursos.</td></tr>
                                        <tr><td className="py-2 px-4 text-sm"><code>DELETE</code></td><td className="py-2 px-4 text-sm"><code>/clients/&#123;id&#125;</code></td><td className="py-2 px-4 text-sm">Eliminación de clientes.</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Web</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Método</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Ruta</th>
                                            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 text-sm"><code>GET</code></td><td className="py-2 px-4 text-sm"><code>/</code>, <code>/login</code>, <code>/dashboard</code>, <code>/clients</code>, <code>/opportunities</code>, <code>/tasks</code></td><td className="py-2 px-4 text-sm">Rutas de navegación de la aplicación.</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}