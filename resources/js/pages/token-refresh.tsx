import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenRefresh: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para hacer la solicitud de refresh
    const refreshToken = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/refresh', // Asegúrate de que esta URL esté correcta
          {},
          {
            withCredentials: true, // Permite enviar cookies HTTPOnly
          }
        );
        // Si la respuesta es exitosa, almacenamos el nuevo access token
        setAccessToken(response.data.token);
        setError(null); // Limpiar cualquier error anterior
        
      } catch (err) {
        setError('Could not refresh the token. Please log in again.');
        console.error(err);
      }
    };

    // Llamar a la función de refresh
    refreshToken();
  }, []);

  return (
    <div>
      <h2>Token Refresh</h2>
      {accessToken ? (
        <div>
          <p>New Access Token: {accessToken}</p>
        </div>
      ) : error ? (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      ) : (
        <div>Refreshing token...</div>
      )}
    </div>
  );
};

export default TokenRefresh;
