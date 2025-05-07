/*



// uruchamia kontenery i buduje obrazy, jeśli nie istnieją
docker-compose up --build

//  wchodzi interaktywnie do kontenera next-server
docker exec -it next-mysql mysql -u root -p
//wchodzi interaktywnie do kontenera next-server
docker exec -it next-server sh
//pokazuje logi wszystkich kontenerów
docker-compose logs -f
// lista sieci Dockera
docker network ls
// Wejście do kontenera interaktywnie (shell)
docker exec -it next-server sh
docker exec -it next-server bash
docker exec -it next-server /bin/bash
env
printenv
// Sprawdź logi aplikacji
docker exec -it next-server cat /root/.npm/_logs/2025-05-07T08_35_55_834Z-debug-0.log

// ======= ręcznie uruchomić serwer wewnątrz kontenera: =====
docker exec -it next-server /bin/bash
npm run dev
nodemon --exec tsx src/server.ts
// ==========================================================
- detached mode // kontener działa w tle, a terminal pozostaje wolny do innych operacji.
docker-compose down client
docker-compose down server

docker-compose up -d client
docker-compose up -d server

docker-compose build client
docker-compose build server

docker-compose down
docker-compose build
docker-compose up

docker-compose config

docker inspect --format '{{.Architecture}}' skynet-division-server
docker inspect --format '{{.Os}}' <image_name_or_id>
docker inspect --format '{{.Config.Labels}}' <image_name_or_id>

docker inspect --format '{{.Config.Labels}}' 3919957795f5
docker run --rm <image_name_or_id> cat /etc/os-release

docker run --rm 3919957795f5 cat /etc/os-release





*/