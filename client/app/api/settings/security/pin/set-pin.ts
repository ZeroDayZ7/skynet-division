// pages/api/users/set-pin.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface SetPinRequest {
  pin: string;
  confirmPin: string;
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

  const { pin, confirmPin, password } = req.body as SetPinRequest;

  if (!pin || !confirmPin || !password) {
    return res.status(400).json({ message: 'Brak wymaganych danych' });
  }

  try {
    const response = await fetch(`${process.env.EXPRESS_API_URL}/api/users/set-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.cookie || '',
      },
      body: JSON.stringify({ pin, confirmPin, password }),
    });

    if (!response.ok) {
      throw new Error(`Express error: ${response.status}`);
    }

    const data: SetPinResponse = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error('set-pin error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}