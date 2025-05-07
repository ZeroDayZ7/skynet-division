import { Request, Response, NextFunction } from 'express';

export const requestLoggerDev = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime();

  console.log('\n==================== 📥 REQUEST ====================');
  console.log(`🔹 Method: ${req.method}`);
  console.log(`🔹 URL: ${req.originalUrl}`);
  console.log(`🔹 IP: ${req.ip}`);
  console.log('🔹 Headers:', req.headers);
  console.log('🔹 Query:', req.query);
  console.log('🔹 Params:', req.params);
  console.log('🔹 Body:', req.body);
  console.log('🔹 Session:', (req as any).session);
  console.log('====================================================');

  const originalSend = res.send;

  res.send = function (body: any): Response {
    const diff = process.hrtime(start);
    const timeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);

    console.log('\n==================== 📤 RESPONSE ====================');
    console.log(`🔹 Status: ${res.statusCode}`);
    console.log(`🔹 Response Time: ${timeMs}ms`);
    console.log('🔹 Headers:', res.getHeaders());
    console.log('🔹 Body:', body);
    console.log('====================================================\n');

    return originalSend.apply(res, arguments as any);
  };

  next();
};
