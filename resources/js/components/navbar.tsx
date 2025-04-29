import { useState } from 'react'; // Importa useState
import { Link } from '@inertiajs/react';
import cerrarSessionImg from "../../assets/cerrar-sesion.png";
import usuarioImg from "../../assets/usuario.png";
import { useUserStore } from '@/stores/use-user-store';
import { logout } from '../services/auth-service'; // Importa la función logout
import  UserData from './user-profile'; // Importa el componente UserData
import { User } from 'lucide-react';

export default function Navbar() {
  const { setUser } = useUserStore(); // Si tienes un estado para el usuario, resetealo
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  const handleLogout = async () => {
    await logout(); // Llama a la función de logout
    setUser(null); // Resetea el usuario en el store (si lo tienes configurado)
    window.location.href = '/login'; // Redirige a la página de login
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Alterna la visibilidad del modal
  };

  return (
    <>
    <nav className="flex h-full flex-row-reverse md:flex-col items-center gap-5 ">
      <div className="text-white font-bold">CRM</div>
      
      {/* separador */}
      <div className='h-full'></div>

      <button 
        onClick={toggleModal} 
        className="text-gray-300 hover:text-white hover:cursor-pointer"
      >
        <img src={usuarioImg} alt="Profile" className="w-6 h-6" />
      </button>

      {/* Botón de cerrar sesión */}
      <button
        onClick={handleLogout}
        className="text-gray-300 hover:text-red-400 relative w-6 h-6 group hover:cursor-pointer"
      >
        <img src={cerrarSessionImg} alt="Cerrar sesión" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-88 transition duration-300 mix-blend-multiply rounded-full"></div>
      </button>
    </nav>
      
    {isModalOpen && (
      <div className="absolute bottom-4 left-18 bg-white p-4 shadow-md border rounded-lg mr-5">
        <div className="text-black">
        <span className="font-bold">Información del usuario</span> {/* Texto en negrita */}
        <UserData />
        </div>
      </div>
    )}
    </>
  );
}
