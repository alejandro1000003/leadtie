import { useState, useEffect } from 'react';
import { getUser } from '../services/auth-service';

interface User {
  name: string;
  email: string;
}

const UserData: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData?.user) {
          setUser(userData.user);
        } else {
          setError('No se pudieron obtener los datos del usuario');
        }
      } catch (error: any) {
        setError(error.message || 'Error al obtener los datos del usuario');
      }
    };

    fetchUser();
  }, []);

  // Si hay un error, se devuelve el mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si no hay error, se devuelve la información del usuario
  return (
    <div>
      {user ? (
        <>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default UserData;
