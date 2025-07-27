@echo off
setlocal ENABLEDELAYEDEXPANSION

set "OUTPUT_FILE=combined.txt"
echo. > "%OUTPUT_FILE%"
echo. >> "%OUTPUT_FILE%"
echo. >> "%OUTPUT_FILE%"
echo. >> "%OUTPUT_FILE%"

REM Szuka plików *.ts, *.tsx, *.jsx, *.json
for /R %%f in (*.ts *.tsx *.jsx *.json) do (
    echo ───────────── %%~nxf ───────────── >> "%OUTPUT_FILE%"
    type "%%f" >> "%OUTPUT_FILE%"
    echo. >> "%OUTPUT_FILE%"
)

echo ✅ Zakończono: %OUTPUT_FILE%
exit
