# Polecenia NPM

- **ncu**  
  Sprawdź dostępne aktualizacje:

- **ncu -u**  
  Zaktualizuj `package.json` do najnowszych wersji:

- **ncu --dep=dev -u**  
npx npm-check-updates -u
  Aktualizuj zależności deweloperskie:

- **npm install**

- **npm list -g --depth=0**  
  Globalne zależności.  
  `--depth=0` wyświetla tylko główne pakiety, bez ich zależności.

- **npm update**  
  Aktualizuje zainstalowane pakiety.

- **npm outdated**  
  Pokazuje listę przestarzałych paczek.

- **npm ls**  
  Pokazuje zainstalowane paczki i zależności.

- **npm audit**  
  Sprawdza podatności w paczkach.

- **npm cache clean --force**  
  Czyści cache npm (gdy coś się sypie).

- **npm i**  
  `npm install`

- **npm i -D**  
  `npm install --save-dev`

- **npm i -g**  
  `npm install --global`
