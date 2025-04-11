import { useEffect, useState } from 'react';
import apiService, { Client } from '../../services/api-service';

const Dashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar la lista de clientes cuando el componente se monte
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await apiService.getClients({ per_page: 5 });
        setClients(data.data);
      } catch (error: any) {
        setError(error.message || 'Error fetching clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []); // Se ejecuta una sola vez al montar el componente

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      
      {loading && <p>Loading clients...</p>}
      {error && <p>Error: {error}</p>}
      
      <h2>Clientes</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.first_name} {client.last_name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
