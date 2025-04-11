import { Link } from '@inertiajs/react';

export default function home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Bienvenido</h1>
            <Link href="/login" className="mt-4 text-blue-500">Iniciar sesión</Link>
        </div>
    );
}

// function dashboard() {
//     return (
//         <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
//             {/* Grid con 3 tarjetas */}
//             <div className="grid auto-rows-min gap-6 md:grid-cols-3">
//                 {["Clientes", "Oportunidades", "Tareas"].map((title, index) => (
//                     <div 
//                         key={index} 
//                         className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 shadow-lg hover:scale-105 transition-transform duration-300"
//                     >
//                         <img 
//                             src={`https://source.unsplash.com/400x300/?business,${index}`} 
//                             alt={title} 
//                             className="absolute inset-0 w-full h-full object-cover opacity-80"
//                         />
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                             <h2 className="text-white text-2xl font-bold">{title}</h2>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Sección principal con gradiente */}
//             <div className="relative flex items-center justify-center min-h-[50vh] flex-1 rounded-xl border border-gray-300 shadow-xl bg-gradient-to-br from-blue-500 to-purple-600">
//                 <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
//                     ¡Bienvenido al CRM!
//                 </h1>
//             </div>
//         </div>
//     );
// }