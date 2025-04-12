// pages/api/set-pin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchClient } from '@/lib/fetchClient';

interface SetPinRequest {
  pin: string;
  password: string;
}

interface SetPinResponse {
  success: boolean;
  message?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { pin, password } = req.body as SetPinRequest;

  if (!pin || !password) {
    return res.status(400).json({ message: 'Brak wymaganych danych' });
  }

  try {
    // Przekazujemy ciasteczka dla sesji i CSRF
    const cookies = req.headers.cookie || '';
    const response = await fetchClient<SetPinResponse>(
      `${process.env.EXPRESS_API_URL}/api/users/set-pin`,
      {
        method: 'POST',
        headers: {
          Cookie: cookies,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin, password }),
      }
    );

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}