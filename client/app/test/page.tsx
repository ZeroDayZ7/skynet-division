"use client";

import { useEffect, useState } from "react";
import { useTestSendMessage } from "@/app/api/test/test-send-message";
import { fetchCsrfToken } from "@/lib/csrf";

export default function Test() {
  const [data, setData] = useState<any>(null); // Dodajemy stan do przechowywania danych
  const [dataCsrf, setDataCsrf] = useState<any>(null);

  // Funkcja wysyłająca wiadomość
  const getCSRF = async () => {
    try {
      const response = await fetchCsrfToken();
      setDataCsrf(response);
      console.log("Odpowiedź z backendu:", response);
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await useTestSendMessage();
      setData(response);
      console.log("Odpowiedź z backendu:", response);
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
    }
  };

  // useEffect do testowego wywołania przy ładowaniu komponentu
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await useTestSendMessage();
  //     setData(response);
  //     console.log("Odpowiedź z backendu (useEffect):", response);
  //   };

  //   fetchData();
  // }, []);

  

  return (
    <div className="p-4">
      <div>fetchCsrf</div>
      <button
        onClick={getCSRF}
        className="p-2 bg-green-700 text-black rounded"
      >
        Wyślij wiadomość
      </button>
      <div>---------------------------------------</div>
      {dataCsrf && (
        <pre className="bg-card tex-grey-700 p-4 border border-green-500 rounded">
          {JSON.stringify(dataCsrf, null, 2)}
        </pre>
      )}

      <div>api/test</div>
      <button
        onClick={sendMessage}
        className="p-2 bg-green-700 text-black rounded"
      >
        Wyślij wiadomość
      </button>
      {data && (
        <pre className="bg-card tex-grey-700 p-4 border border-green-500 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}