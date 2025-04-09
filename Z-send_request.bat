@echo off
:loop
color 1F

set /p choice=:

if "%choice%"=="" (
    curl -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d "{\"email\": \"user@example.com\", \"password\": \"password123\"}"

)

rem Resetowanie koloru
color 07

goto loop

