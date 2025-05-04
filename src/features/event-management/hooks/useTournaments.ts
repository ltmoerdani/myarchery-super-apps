import { useState, useEffect } from 'react';

interface Tournament {
  id?: string;
  name: string;
  description?: string;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
  location?: {
    city: string;
    province: string;
  };
  participants?: number;
  revenue?: number;
}

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: Tournament[] = [
          {
            id: '1',
            name: 'National Archery Championship 2025',
            description: 'The biggest archery event of the year',
            status: 'published',
            startDate: '2025-06-15',
            endDate: '2025-06-18',
            location: {
              city: 'Jakarta',
              province: 'DKI Jakarta'
            },
            participants: 150,
            revenue: 37500000
          },
          {
            id: '2',
            name: 'Regional Qualifier Tournament',
            description: 'Qualifying event for the national championship',
            status: 'draft',
            startDate: '2025-05-01',
            endDate: '2025-05-02',
            location: {
              city: 'Surabaya',
              province: 'East Java'
            },
            participants: 0,
            revenue: 0
          }
        ];

        setTournaments(mockData);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return { tournaments, loading, error };
};