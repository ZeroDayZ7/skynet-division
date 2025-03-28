@echo off
cls

REM Uruchomienie MAMP z określonej lokalizacji
start "" "C:\MAMP\MAMP.exe"

REM Czekaj 10 sekund
timeout /t 10 /nobreak

REM Uruchomienie BACKEND.bat w nowym oknie wiersza poleceń
start cmd /k "C:\Users\Neo\Desktop\WWW\react\skynet-division\BACKEND.bat"

REM Uruchomienie RELOAD.bat w nowym oknie wiersza poleceń
start cmd /k "C:\Users\Neo\Desktop\WWW\react\skynet-division\RELOAD.bat"