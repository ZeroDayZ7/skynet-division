
/* 

npm install prisma --save-dev
npx prisma init --datasource-providetput ../generated/prisma
npx prisma

// To wygeneruje schemat na podstawie bazy.
// synchronizacja bazdy danych z schema.prisma
--- npx prisma db pull
--- npx prisma migrate dev --name init
--- npx prisma generate

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

