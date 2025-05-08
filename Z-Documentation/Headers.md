# 📚 HTTP Headers – Kompendium

HTTP Headers (nagłówki HTTP) to klucz-wartość przesyłane w żądaniu (request) lub odpowiedzi (response) HTTP. Umożliwiają komunikację metadanych między klientem a serwerem.

## 🏗️ Rodzaje nagłówków

HTTP Headers dzielą się na:

1. **General Headers** – ogólne (działają w request i response)
2. **Request Headers** – nagłówki wysyłane przez klienta
3. **Response Headers** – nagłówki wysyłane przez serwer
4. **Entity Headers** – opisujące treść (body)
5. **Custom Headers** – nagłówki niestandardowe (prefiks `x-`)

---

## 1️⃣ **General Headers (ogólne)**

| Header         | Opis                                                |
|----------------|----------------------------------------------------|
| `Cache-Control` | Sterowanie cache (np. `no-cache`, `max-age=3600`) |
| `Connection`    | Zarządzanie połączeniem (np. `keep-alive`)        |
| `Date`          | Data wygenerowania request/response                |
| `Pragma`        | Starsze kontrolki cache (np. `no-cache`)          |
| `Trailer`       | Nagłówki wysyłane po body (w chunked transfer)     |
| `Transfer-Encoding` | Kodowanie przesyłu (`chunked`)                 |
| `Upgrade`       | Prośba o zmianę protokołu (np. `websocket`)       |
| `Via`           | Ślad po proxy/gateway                             |
| `Warning`       | Ostrzeżenia dot. treści                           |

---

## 2️⃣ **Request Headers (żądanie)**

| Header             | Opis                                       |
|--------------------|-------------------------------------------|
| `Accept`            | Akceptowane typy MIME (np. `text/html`)   |
| `Accept-Charset`    | Akceptowane kodowania znaków              |
| `Accept-Encoding`   | Akceptowane kompresje (np. `gzip`)        |
| `Accept-Language`   | Preferencje językowe                      |
| `Authorization`     | Dane autoryzacji (np. `Bearer TOKEN`)     |
| `Cookie`            | Przesyłanie ciasteczek                    |
| `Expect`            | Oczekiwania klienta (np. `100-continue`)  |
| `From`              | E-mail użytkownika                        |
| `Host`              | Host (np. `example.com`)                  |
| `If-Match`          | Warunek na ETag                           |
| `If-Modified-Since` | Warunek na datę                           |
| `If-None-Match`     | Warunek na ETag (cache validation)        |
| `If-Range`          | Czy pobierać zakres, jeśli zgodny ETag    |
| `If-Unmodified-Since`| Warunek na datę                          |
| `Range`             | Pobierz część treści (np. `bytes=0-499`)  |
| `Referer`           | Strona źródłowa requesta                  |
| `User-Agent`        | Informacje o kliencie (przeglądarka, bot) |

### ➕ **Przykład:**
```http
GET /dashboard HTTP/1.1
Host: example.com
Authorization: Bearer eyJhbGciOiJI...
Accept: application/json
User-Agent: Mozilla/5.0
Cookie: SESSION_KEY=abc123
