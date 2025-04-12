// pages/api/user/pin-status.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchClient } from '@/lib/fetchClient';

interface PinStatusResponse {
  pinExists: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Przekazujemy ciasteczka, aby Express mógł zweryfikować sesję
    const cookies = req.headers.cookie || '';
    const response = await fetchClient<PinStatusResponse>(
      `${process.env.EXPRESS_API_URL}/api/user/pin-status`,
      {
        method: 'GET',
        headers: { Cookie: cookies },
      }
    );

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}