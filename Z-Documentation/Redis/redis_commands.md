
# Redis: Podstawowe Komendy i Operacje

### 1. **Połączenie z Redis**

Aby połączyć się z serwerem Redis, użyj komendy:

```bash
redis-cli -h <hostname> -p <port> -a <hasło>
```

- `hostname` – adres serwera Redis (domyślnie `localhost`).
- `port` – port na którym działa Redis (domyślnie `6379`).
- `hasło` – hasło, jeśli Redis wymaga uwierzytelnienia.

### 2. **Logowanie do Redis**

Jeśli Redis wymaga hasła, użyj komendy `AUTH`, aby się zalogować:

```bash
127.0.0.1:6379> AUTH <twoje_hasło>
OK
```

### 3. **Sprawdzanie danych w Redis**

Po zalogowaniu możesz zacząć sprawdzać, jakie dane są przechowywane w Redis.

#### a. **Wyświetlanie wszystkich kluczy**

Aby wyświetlić wszystkie klucze w bazie danych Redis:

```bash
127.0.0.1:6379> KEYS *
1) "klucz1"
2) "klucz2"
3) "klucz3"
```

#### b. **Sprawdzanie wartości konkretnego klucza**

Aby sprawdzić wartość przypisaną do konkretnego klucza:

```bash
127.0.0.1:6379> GET <klucz>
"wartość"
```

#### c. **Sprawdzanie danych w przypadku różnych typów danych**

Redis wspiera różne typy danych, takie jak stringi, listy, zestawy, hashe itp. Oto jak sprawdzić wartości dla różnych typów danych:

- **String**:
  ```bash
  127.0.0.1:6379> GET <klucz>
  "wartość"
  ```

- **Lista**:
  ```bash
  127.0.0.1:6379> LRANGE <lista_klucz> 0 -1
  1) "element1"
  2) "element2"
  3) "element3"
  ```

- **Hash**:
  ```bash
  127.0.0.1:6379> HGETALL <hash_klucz>
  1) "pole1"
  2) "wartość1"
  3) "pole2"
  4) "wartość2"
  ```

### 4. **Sprawdzanie konfiguracji Redis**

Możesz sprawdzić konfigurację serwera Redis, w tym wymagane hasło, używając komendy `CONFIG GET`:

```bash
127.0.0.1:6379> CONFIG GET requirepass
1) "requirepass"
2) "redis_password"
```

### 5. **Ustawianie danych w Redis**

#### a. **Dodanie nowego klucza i wartości (string)**

```bash
127.0.0.1:6379> SET <klucz> <wartość>
OK
```

#### b. **Dodanie elementu do listy**

```bash
127.0.0.1:6379> LPUSH <lista_klucz> <element>
(integer) 1
```

#### c. **Dodanie wartości do hasha**

```bash
127.0.0.1:6379> HSET <hash_klucz> <pole> <wartość>
(integer) 1
```

### 6. **Usuwanie danych z Redis**

#### a. **Usuwanie klucza**

```bash
127.0.0.1:6379> DEL <klucz>
(integer) 1
```

#### b. **Usuwanie elementu z listy**

```bash
127.0.0.1:6379> LREM <lista_klucz> 0 <element>
(integer) 1
```

#### c. **Usuwanie pola z hasha**

```bash
127.0.0.1:6379> HDEL <hash_klucz> <pole>
(integer) 1
```

### 7. **Wyczyszczanie wszystkich danych z bazy Redis**

Jeśli chcesz usunąć wszystkie dane z Redis:

```bash
127.0.0.1:6379> FLUSHALL
OK
```

### 8. **Wersja Redis**

Aby sprawdzić wersję Redis:

```bash
127.0.0.1:6379> INFO server
# Server
redis_version:6.0.10
```

### 9. **Zamykanie połączenia**

Aby zakończyć połączenie z serwerem Redis:

```bash
127.0.0.1:6379> QUIT
```

---

## Przykłady Zastosowania w Aplikacjach Node.js

### 1. **Użycie Redis w aplikacji Node.js**

Zainstaluj paczkę `redis`:

```bash
npm install redis
```

Przykład kodu do połączenia z Redis:

```javascript
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
  password: 
});

redisClient.on('connect', () => {
  console.log('Połączono z Redis');
});

redisClient.on('error', (err) => {
  console.log('Błąd połączenia z Redis:', err);
});

await redisClient.connect();

// Ustawianie klucza w Redis
await redisClient.set('user:1', JSON.stringify({ name: 'John', age: 30 }));

// Pobieranie wartości z Redis
const userData = await redisClient.get('user:1');
console.log('Dane użytkownika:', JSON.parse(userData));

await redisClient.quit();
```

---

**Podsumowanie**: Redis jest szybkim magazynem danych w pamięci, który może być wykorzystywany do przechowywania sesji, cache, kolejek, itp. W powyższym `README.md` znajdziesz najczęściej używane komendy do zarządzania danymi w Redis oraz przykłady użycia w aplikacjach Node.js.

Jeśli masz dodatkowe pytania lub potrzebujesz bardziej zaawansowanych komend, daj znać!
