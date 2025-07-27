import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const url = req.url;
    // const method = req.method;
    // const headers = Object.fromEntries(req.headers.entries());
    const body = await req.json();

    // console.log("==== Pełne dane requesta z klienta ====");
    // console.log("URL:", url);
    // console.log("Metoda:", method);
    // console.log("Nagłówki:", headers);
    console.log("Body:", body);
    // console.log("========================================");

    // Wysyłamy żądanie do backendu Express
    const expressResponse = await fetch("http://localhost:4000/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer twój-token",
      },
      body: JSON.stringify(body),
    
      // mode: "cors", // lub "no-cors", "same-origin"
      // credentials: "include", // "omit", "same-origin", "include" — jeśli chcesz wysyłać cookies
      // cache: "no-store", // "default", "reload", "no-cache", itd.
      // redirect: "follow", // "manual", "error"
      // referrer: "about:client", // lub "", lub inny URL
      // referrerPolicy: "no-referrer", // lub "origin", "strict-origin-when-cross-origin", itd.
      // integrity: "", // np. sha256-...
      // keepalive: false, // true tylko dla requestów wychodzących podczas unload
      // signal: controller.signal, // do abort controllera
      // duplex: "half", // potrzebne przy streamingu (np. ReadableStream)
    });
    

    // 🔍 Logowanie response
    // const resHeaders = Object.fromEntries(expressResponse.headers.entries());
    // const resStatus = expressResponse.status;
    // const resStatusText = expressResponse.statusText;
    const expressData = await expressResponse.json();

    // console.log("==== Pełne dane response z Express ====");
    // console.log("Status:", resStatus);
    // console.log("StatusText:", resStatusText);
    // console.log("Nagłówki:", resHeaders);
    console.log("Body:", expressData);
    // console.log("========================================");

    return NextResponse.json({
      success: true,
      data: expressData,
    });
  } catch (error) {
    console.error("Błąd w Next API:", error);
    return NextResponse.json(
      { success: false, error: "Błąd serwera" },
      { status: 500 }
    );
  }
}