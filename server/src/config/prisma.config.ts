// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import SystemLog from '#ro/common/utils/SystemLog';

declare global {
  var prisma: PrismaClient | undefined;
}

// Tworzenie instancji PrismaClient
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Zachowaj instancję globalnie w środowisku deweloperskim
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Testowanie połączenia
async function initializePrisma() {
  try {
    await prisma.$connect();
    SystemLog.info('Prisma connected to MySQL database...');
  } catch (error) {
    SystemLog.error('Prisma connection failed:', error);
    throw error;
  }
}

// Rozłączenie (dla graceful shutdown)
async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
    SystemLog.info('Prisma disconnected from database');
  } catch (error) {
    SystemLog.error('Prisma disconnection failed:', error);
    throw error;
  }
}

export { prisma, initializePrisma, disconnectPrisma };