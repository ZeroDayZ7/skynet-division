import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchClient } from '@/lib/fetchClient'; // dostosuj ścieżkę do siebie

interface PinStatusResponse {
  isPinSet: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data: PinStatusResponse = await fetchClient('/api/users/pin-status', {
      method: 'GET',
      cookies: req.headers.cookie,
    });

    res.status(200).json(data);
  } catch (error: any) {
    console.error('pin-status error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
