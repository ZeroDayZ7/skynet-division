
/* 

npm install prisma --save-dev
npx prisma init --datasource-providetput ../generated/prisma
npx prisma

// To wygeneruje schemat na podstawie bazy.
// synchronizacja bazdy danych z schema.prisma

--- npx prisma init / tworzy folder prisma z plikiem modelu
--- npx prisma db pull / wczytanie schematu bazy danych, już ustworzonej ręcznie
--- npx prisma migrate dev --name init
--- npx prisma generate

///////////////////////////////////////////////////////////////
1. Zmiana w chema.prisma
2. npx prisma migrate dev --name add_expiresAt_index
3. [OPCJONALNIE] npx prisma db push --- nie dodoaje migracji
4. 

--- npx prisma db push - zatsosowanie zmian bez migracji

-- npm run diff // Sprawdzenie co się zmieni zanim zrobi się migracje
DATABASE_URL="mysql://root:root@localhost:3306/crimscity"

DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
mysql – typ bazy danych (może być też np. postgresql, sqlite, sqlserver)
johndoe – nazwa użytkownika bazy danych
randompassword – hasło do tej bazy
localhost – adres hosta (tu lokalnie, ale może być np. IP serwera)
3306 – port, standardowy dla MySQL
mydb – nazwa Twojej bazy danych

console.log(Object.keys(prisma))  listę dostępnych modeli

npx prisma studio // Przeglądarka web bazy danych

*/

