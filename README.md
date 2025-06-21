# Projekt Microservices Architecture

## Opis ogólny

Ten projekt to przykładowa architektura mikroserwisowa, zorganizowana w formie monorepo. Celem jest stworzenie skalowalnego, łatwego do utrzymania systemu, który składa się z kilku niezależnych mikroserwisów, frontendowej aplikacji oraz API Gateway.

### Główne komponenty:

- **common/** – Wspólne biblioteki, typy, konfiguracje i narzędzia używane przez wszystkie mikroserwisy oraz frontend.
- **frontend/** – Aplikacja frontendowa oparta na Next.js (React), odpowiedzialna za interfejs użytkownika.
- **api-gateway/** – Punkt wejścia dla klientów, obsługujący routing, autoryzację, uwierzytelnianie oraz agregację mikroserwisów.
- **services/** – Zestaw niezależnych mikroserwisów, np. `auth-service` (uwierzytelnianie), `logs-service` (logowanie zdarzeń), `user-service` (zarządzanie użytkownikami) i inne.
- **docker-compose.yml** – Definicja kontenerów dla wszystkich usług, umożliwiająca łatwe uruchomienie całego środowiska lokalnie lub na serwerze.
- **.env** – Plik konfiguracyjny ze zmiennymi środowiskowymi, które mogą być współdzielone lub indywidualne dla poszczególnych mikroserwisów.

## Cel projektu

- Zapewnienie wyraźnej separacji odpowiedzialności pomiędzy mikroserwisami.
- Ułatwienie rozwoju i wdrażania kolejnych usług.
- Zapewnienie wspólnych narzędzi i konfiguracji, by unikać duplikacji kodu.
- Umożliwienie łatwego skalowania i aktualizacji poszczególnych elementów systemu.
- Wdrożenie architektury, która wspiera szybkie iteracje i rozwój zespołowy.

## Technologie

- Node.js (Express/Nest.js dla backendu)
- Next.js (frontend)
- Docker i Docker Compose do zarządzania środowiskiem
- Kafka (lub inny system eventów) w log-service do komunikacji asynchronicznej
- TypeScript dla typów i bezpieczeństwa kodu

## Struktura projektu

Struktura projektu została zaprojektowana z myślą o dużych zespołach i rozwoju mikroserwisów, gdzie każdy serwis może być rozwijany niezależnie, a wspólne elementy są dzielone przez katalog `common`.

---

## Jak zacząć

1. Sklonuj repozytorium
2. Skonfiguruj plik `.env` z wymaganymi zmiennymi środowiskowymi
3. Uruchom `docker-compose up` by wystartować wszystkie usługi
4. Pracuj nad frontendem, API Gateway lub mikroserwisami niezależnie

---

## Kontakt i wsparcie

W razie pytań lub sugestii prosimy o kontakt lub zgłoszenie issue w repozytorium.
