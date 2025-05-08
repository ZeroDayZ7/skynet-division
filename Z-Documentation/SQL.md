# Przykłady zapytań SQL
## 1. **Aktualizacja statusu powiadomień użytkownika**
```
UPDATE user_notifications SET is_read = 0 WHERE user_id = 77
```
## 2. **Zmiana nazwy tabeli**
```
RENAME TABLE stara_nazwa TO nowa_nazwa;
```

## 3. **Wstawianie wielu rekordów do tabeli support_ticket**

```
INSERT INTO support_ticket (user_id, subject, status)
VALUES
  (93, 'bug', 'new'),
  (93, 'feature', 'open'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'closed'),
  (93, 'feature', 'closed'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new'),
  (93, 'bug', 'new');
```