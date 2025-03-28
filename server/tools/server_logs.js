const fs = require('fs');
const path = require('path');

function serverLogs(content, fileName = 'server_logs.txt', directory = 'logs') {
    // Sprawdzenie czy katalog istnieje
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory); // Utworzenie katalogu, jeśli nie istnieje
    }

    const now = new Date(); // Pobranie aktualnej daty i czasu
    const dateString = now.toISOString(); // Konwersja daty na string w formacie ISO
    const logEntry = `${dateString}: ${content}`; // Połączenie daty i treści wiadomości

    const filePath = path.join(directory, fileName); // Łączenie ścieżki pliku z katalogiem

    fs.appendFile(filePath, logEntry + '\n', (err) => {
        if (err) throw err;
        console.log(`Dane zostały zapisane do pliku ${fileName}`);
    });
}

module.exports = serverLogs;
