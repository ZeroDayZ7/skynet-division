import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import SystemLog from '../common/utils/SystemLog';

let shuttingDown = false;

/**
 * Oznacza serwer jako wyłączany (np. podczas SIGINT).
 */
export function markShuttingDown(): void {
  shuttingDown = true;
}

/**
 * Zwraca, czy serwer jest w trakcie wyłączania.
 */
export function isShuttingDown(): boolean {
  return shuttingDown;
}

/**
 * Typ zwracanego statusu health checka.
 */
export interface HealthStatus {
  status: 'ok' | 'degraded'; // DODANE: możliwość degraded status
  timestamp: string;
  uptime: number;
  version: string;
  environment: string; // DODANE
  pid: number; // DODANE
  memory: {
    used: string;
    total: string;
    percentage: string;
    // DODANE: więcej metryk pamięci
    rss: string;
    external: string;
  };
  // DODANE: CPU info jeśli dostępne
  cpu?: {
    user: number;
    system: number;
  };
}

/**
 * Zwraca aktualny status serwera.
 */
export function getHealthStatus(): HealthStatus {
  const memUsage = process.memoryUsage();
  const usedMemMB = memUsage.heapUsed / 1024 / 1024;
  const totalMemMB = memUsage.heapTotal / 1024 / 1024;
  const rssMB = memUsage.rss / 1024 / 1024;
  const externalMB = memUsage.external / 1024 / 1024;
  
  // DODANE: Sprawdzenie czy memory usage nie jest zbyt wysoki
  const memoryPercentage = (usedMemMB / totalMemMB) * 100;
  const status: 'ok' | 'degraded' = memoryPercentage > 90 ? 'degraded' : 'ok';

  // DODANE: CPU usage jeśli dostępne
  let cpuUsage;
  try {
    cpuUsage = process.cpuUsage();
  } catch {
    // cpuUsage może nie być dostępne w niektórych środowiskach
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()), // POPRAWKA: zaokrąglenie
    version: getAppVersion(),
    environment: process.env.NODE_ENV || 'unknown', // DODANE
    pid: process.pid, // DODANE
    memory: {
      used: `${usedMemMB.toFixed(1)} MB`, // POPRAWKA: 1 miejsce po przecinku
      total: `${totalMemMB.toFixed(1)} MB`,
      percentage: `${memoryPercentage.toFixed(1)}%`,
      rss: `${rssMB.toFixed(1)} MB`, // DODANE
      external: `${externalMB.toFixed(1)} MB` // DODANE
    },
    ...(cpuUsage && {
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      }
    })
  };
}

// DODANE: Cache dla wersji aplikacji
let cachedVersion: string;

/**
 * Pobiera wersję aplikacji z package.json.
 */
export function getAppVersion(): string {
  // OPTYMALIZACJA: Cache wersji
  if (cachedVersion !== null) {
    return cachedVersion;
  }

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = join(__dirname, './package.json');
    
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    cachedVersion = pkg.version || 'unknown';
    return cachedVersion;
    
  } catch (error: unknown) {
    SystemLog.warn('Failed to read package.json:', error instanceof Error ? error.message : String(error));
    cachedVersion = 'unknown';
    return cachedVersion;
  }
}

// DODANE: Funkcja do resetowania cache (przydatne w testach)
export function resetVersionCache(): void {
  cachedVersion = 'unknown';
}