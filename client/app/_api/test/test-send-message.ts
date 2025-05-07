interface BackendResponse {
  success: boolean;
  data: any;
}

export const useTestSendMessage = async (): Promise<BackendResponse | null> => {
  try {
    const response = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ważne dla przesyłania ciasteczek
      body: JSON.stringify({ msg: "Test od useTestSendMessage" }),
    });

    // Jeśli odpowiedź jest w formacie JSON
    if (response.ok) {
      const data: BackendResponse = await response.json();
      console.log("Odpowiedź z Next API:", data);
      return data;
    } else {
      console.error("Błąd odpowiedzi:", response.statusText);
      return null;
    }
  } catch (err) {
    console.error("Błąd fetch:", err);
    return null;
  }
};
