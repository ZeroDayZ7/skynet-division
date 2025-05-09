# 📁 Konwencje nazw plików i struktura projektu

## 🧩 Ogólne zasady

| Typ pliku         | Konwencja           | Przykład                       |
|-------------------|---------------------|--------------------------------|
| Komponenty React  | PascalCase          | `UserProfile.tsx`              |
| Hooki React       | camelCase + `use`   | `useUserSession.ts`            |
| Middleware        | kebab-case          | `auth-middleware.ts`           |
| Typy              | dot notation        | `user.types.ts`                |
| Schematy Zod      | dot notation        | `register.validator.ts`       |
| Serwisy           | dot notation        | `user.service.ts`              |
| Kontrolery        | dot notation        | `auth.controller.ts`           |
| Routy Express     | dot notation        | `admin.routes.ts`              |
| Utilsy            | kebab-case          | `string-utils.ts`              |
| Pliki `index`     | `index.ts`          | do eksportów zbiorczych        |

---

## 📦 Foldery i struktura
```
src/
├── components/
│ └── UserProfile.tsx
│ └── Dashboard/StatsPanel.tsx
│
├── hooks/
│ └── useUserSession.ts
│ └── useScrollPosition.ts
│
├── lib/
│ └── utils/
│ └── date-utils.ts
│ └── string-utils.ts
│ └── middleware/
│ └── auth-middleware.ts
│ └── role-middleware.ts
│ └── csrf-middleware.ts
│
├── modules/
│ └── user/
│ ├── controllers/
│ │ └── user.controller.ts
│ ├── services/
│ │ └── user.service.ts
│ ├── validators/
│ │ └── register.validator.ts
│ ├── routes/
│ │ └── users.routes.ts
│ └── types/
│ └── user.types.ts
│
├── pages/
│ └── api/
│ └── auth/
│ └── login.ts
│ └── index.tsx
│ └── dashboard.tsx
│
└── config/
└── env.ts
└── rate-limit.config.ts
```

---

## 📘 Szczegółowy opis nazw

### 🧱 Komponenty React (PascalCase)

- **Nazwa**: PascalCase
- **Cel**: Reprezentuje UI, często folder per komponent (jeśli ma style/testy).
- `UserProfile.tsx`, `Modal.tsx`, `Dashboard/StatsPanel.tsx`

### 🪝 Hooki (`useCamelCase.ts`)

- **Prefiks `use`** + camelCase
- `useUserSession.ts`, `useDebouncedValue.ts`

### 🧩 Middleware (kebab-case)

- `auth-middleware.ts`
- `rate-limit-middleware.ts`
- Każdy middleware robi jedną rzecz — np. auth, csrf, logger, itp.

### 📐 Typy (`*.types.ts`)

- Zbiór typów domenowych lub interfejsów
- `user.types.ts`, `auth.types.ts`
- Dobre miejsce na `UserRole`, `UserPayload`, itp.

### 🧪 Walidatory (`*.validator.ts`)

- Zwykle schematy Zod, Yup itp.
- `register.validator.ts`, `login.validator.ts`
- Może eksportować `schema` oraz `inferred types`

### 🔧 Serwisy (`*.service.ts`)

- Logika biznesowa, np. pobieranie z DB, łączenie danych
- `user.service.ts`, `session.service.ts`

### ⚙️ Kontrolery (`*.controller.ts`)

- Obsługa requestów (Express lub API Route)
- `auth.controller.ts`, `session.controller.ts`

### 🛣️ Routy (`*.routes.ts`)

- `users.routes.ts`, `admin.routes.ts`
- Eksportują np. `express.Router()`

### 🛠️ Utilsy (`kebab-case`)

- Małe pomocnicze funkcje
- `string-utils.ts`, `date-utils.ts`

### 🧭 Indexy (`index.ts`)

- Dobrze używać do `barrel exports`:
```ts
// src/lib/index.ts
export * from './utils/date-utils';
export * from './middleware/auth-middleware';
```

### 🧼 Dobre praktyki

   - Unikaj camelCase.ts dla nazw plików – to dezorientujące (rezerwuj dla zmiennych).

   - Folder = kontekst (np. user/, auth/) → łatwiej utrzymać logikę domenową.

   - Jeśli komponent ma swój hook, test i styl — wrzuć go w folder:
```
components/
└── UserProfile/
    ├── UserProfile.tsx
    ├── useUserProfile.ts
    ├── UserProfile.test.tsx
    └── UserProfile.module.css
```
