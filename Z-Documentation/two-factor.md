```
Co można wykorzystać jako drugi czynnik (2nd factor) lokalnie:
1. 🔢 PIN ustawiony przez użytkownika
Krótki 4–6-cyfrowy kod znany tylko użytkownikowi.

Trzymany zaszyfrowany w bazie (np. bcrypt).

Używany przy logowaniu po poprawnym podaniu hasła.

Podatny na zgadywanie – warto dodać limity prób i blokady czasowe.

2. 📨 Kod jednorazowy wysłany e-mailem (One-Time Code)
Wygenerowany 6-cyfrowy kod ważny przez np. 5 minut.

Wysyłany na maila po zalogowaniu.

Przechowywany tymczasowo w bazie lub w Redisie (z TTL).

Do weryfikacji: user wpisuje kod → porównujesz z bazą + sprawdzasz czas.

3. 📱 Kody TOTP (np. z lokalnego generatora QR do Authenticatora)
Nie wymaga zewnętrznych usług — możesz samodzielnie generować sekrety i kody zgodne z Google Authenticator.

Wymaga zaimplementowania TOTP (Time-based One-Time Password) – np. z użyciem biblioteki jak otplib (Node.js) lub pyotp (Python).

Kod jest generowany przez aplikację użytkownika co 30 sekund.

Użytkownik musi zeskanować kod QR przy włączaniu 2FA.

Super bezpieczne.

4. 🔐 Klucz backupowy / recovery code
Wygenerowany przy aktywacji 2FA zestaw kodów awaryjnych (np. 5–10).

Każdy kod działa tylko raz.

Użytkownik może użyć takiego kodu, gdy nie ma dostępu do maila czy aplikacji TOTP.

Przechowywane zaszyfrowane.

5. 🖥️ Dane urządzenia lub przeglądarki jako tzw. remembered devices
Po zalogowaniu na nowym urządzeniu — wymagasz kodu 2FA.

Po poprawnym logowaniu — zapisujesz device token (np. JWT lub fingerprint) w bazie.

Nie jest to składnik 2FA sam w sobie, ale poprawia UX i zwiększa bezpieczeństwo.

🔒 Dodatkowe zabezpieczenia, które warto dodać
Limit prób kodów PIN/kodów 2FA – np. 5 prób, potem blokada konta lub CAPTCHA.

Czas ważności kodów – np. 5–10 minut dla kodu e-mail/SMS/TOTP.

Logowanie prób – zapisuj adres IP, datę, przeglądarkę (user-agent).

Alerty bezpieczeństwa – np. powiadomienia o logowaniu z nowego urządzenia.

Możliwość wyłączenia 2FA tylko po ponownym podaniu hasła + kodu.

📦 Przykładowy proces 2FA lokalnie (e-mail):
Użytkownik loguje się poprawnie (email + hasło).

Backend generuje 6-cyfrowy kod, zapisuje w bazie z czasem wygaśnięcia.

Wysyła kod e-mailem do użytkownika.

Użytkownik wpisuje kod → backend sprawdza, czy zgadza się i czy nie wygasł.

Jeśli OK → wpuszczasz do systemu i usuwasz kod.
```