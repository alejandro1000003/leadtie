import React, { useEffect, useState } from 'react';
import { getOpportunities } from '../services/opportunities-api-service';

type Opportunity = {
    id: number;
    title: string;
    client_id: string;
    value: number;
    status: 'Open' | 'In Progress' | 'Won' | 'Lost';
};

const OpportunitiesPage: React.FC = () => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

    useEffect(() => {
        const fetchOpportunities = async () => {
            const data = await getOpportunities();
            console.log(data); // Imprime el array en la consola
            setOpportunities(data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                client_id: item.client_id.toString(),
                value: item.value,
                status: item.status,
            })));
        };

        fetchOpportunities();
    }, []);

    return (
        <div>
            <h1>Opportunities</h1>
            <ul>
                {opportunities.map((opportunity) => (
                    <li key={opportunity.id}>
                        {opportunity.title} - {opportunity.status} - ${opportunity.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OpportunitiesPage;
