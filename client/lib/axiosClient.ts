// lib/fetchClient.ts
import axios from 'axios';

export const fetchClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
