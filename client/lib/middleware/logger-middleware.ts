import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const logMiddlewareRequest = async (request: NextRequest, startTime?: number) => {
  const { method } = request;
  const pathname = request.nextUrl.pathname;
  const headers = Object.fromEntries(request.headers.entries());

  console.log("📥 Request:");
  console.log(`🔹 Method: ${method}`);
  console.log(`🔹 URL: ${request.nextUrl.href}`);
  console.log("🔹 Pathname:", pathname);
  console.log("🔹 Headers:", headers);

  const cookieStore = await cookies();
  console.log("🔹 Cookies:", cookieStore.getAll());

  if (startTime !== undefined) {
    const duration = (performance.now() - startTime).toFixed(2);
    console.log(`🔹 Start Time: ${startTime}`);
    console.log(`🔹 Request Duration So Far: ${duration}ms`);
  }
};

export const logMiddlewareResponse = (response: NextResponse, startTime?: number) => {
  let timeMs = 'n/a';
  if (startTime !== undefined) {
    timeMs = (performance.now() - startTime).toFixed(2);
  }

  console.log("📤 Response:");
  console.log(`🔹 Status: ${response.status}`);
  console.log(`🔹 Response Time: ${timeMs}ms`);
  console.log("🔹 Headers:", Object.fromEntries(response.headers.entries()));
  console.log("====================================================");
};
