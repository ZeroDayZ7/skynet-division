project-root/
├── common/                     # Wspólne biblioteki, typy, konfiguracje, utils itd.
│   ├── types/
│   ├── constants/
│   ├── validation/
│   ├── utils/
│   ├── config/
│   ├── communication/
│   └── index.ts
│
├── frontend/                   # Frontendowa aplikacja (Next.js, React itp.)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── api-gateway/                # Gateway API (np. Express, Nest.js)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── index.ts            # Uruchomienie serwera
│   ├── package.json
│   └── tsconfig.json
│
├── services/                   # Folder z mikroserwisami
│   ├── auth-service/           # Mikroserwis uwierzytelniania i autoryzacji
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── logs-service/           # Mikroserwis do logowania i eventów (np. Kafka consumer)
│   │   ├── src/
│   │   │   ├── consumers/
│   │   │   ├── producers/
│   │   │   ├── utils/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── user-service/           # Mikroserwis użytkowników
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ...                     # Kolejne mikroserwisy
│
├── docker-compose.yml          # Kompozycja całego projektu w kontenerach Docker
├── .env                       # Zmienne środowiskowe globalne lub wspólne
└── README.md
