import { Link } from '@inertiajs/react';
import cerrarSessionImg from "../../assets/cerrar-sesion.png";
import usuarioImg from "../../assets/usuario.png";
import { useUserStore } from '@/stores/use-user-store';
import { logout } from '../services/auth-service'; // Importa la función logout

export default function Navbar() {
  const { setUser } = useUserStore(); // Si tienes un estado para el usuario, resetealo

  const handleLogout = async () => {
    await logout(); // Llama a la función de logout
    setUser(null); // Resetea el usuario en el store (si lo tienes configurado)
    window.location.href = '/login'; // Redirige a la página de login
  };

  return (
    <nav className="flex h-full flex-row-reverse md:flex-col items-center gap-5">
      <div className="text-white font-bold">CRM</div>
      
      {/* separador */}
      <div className='h-full'></div>

      <Link href="/profile" className="text-gray-300 hover:text-white">
        <img src={usuarioImg} alt="Profile" className="w-8 h-8" />
      </Link>
      
      <button
        onClick={handleLogout}
        className="text-gray-300 hover:text-red-400 relative w-8 h-8 group"
      >
        <img src={cerrarSessionImg} alt="Cerrar sesión" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-88 transition duration-300 mix-blend-multiply rounded-full"></div>
      </button>
    </nav>
  );
}
