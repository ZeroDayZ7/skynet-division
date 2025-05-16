
# 🔍 Co oznacza `!!zmienna` w JavaScript/TypeScript?

Operator `!!` (podwójna negacja) **konwertuje dowolną wartość do typu `boolean`**:

- `!!wartość` zwraca `true`, jeśli wartość jest „truthy”
- `!!wartość` zwraca `false`, jeśli wartość jest „falsy”

> 📌 Używane jest często do **jawnej konwersji typu**, np. gdy z bazy danych zwracana jest `null`, `0`, `''` albo `undefined`, a my chcemy **prawdziwe `true`/`false`**.

---

## ✅ Przykłady działania `!!`

```ts
!!true           // true
!!false          // false
!!1              // true
!!0              // false
!!"tekst"        // true
!!""             // false
!!null           // false
!!undefined      // false
!!{}             // true
!![]             // true
```

---

## ✨ Porównanie z innymi technikami konwersji na `boolean`

| Technika              | Opis                                  | Przykład                         | Wynik      |
|-----------------------|----------------------------------------|----------------------------------|------------|
| `Boolean(wartość)`    | Funkcja standardowa JS                 | `Boolean("tekst")`               | `true`     |
| `!!wartość`           | Najkrótsza forma zapisu                | `!!0`                            | `false`    |
| `wartość ? true : false` | Operator warunkowy                  | `"abc" ? true : false`           | `true`     |
| `Number(wartość)`     | Konwersja na liczbę (0 lub 1)          | `Number(true)`                   | `1`        |
| `JSON.parse("true")`  | Zamiana tekstu na boolean              | `JSON.parse("false")`            | `false`    |

---

## 🧠 Kiedy stosować `!!`

- Kiedy chcesz **upewnić się, że wynik ma typ `boolean`**
- Gdy wartość może być `null` / `undefined` / liczbowo 0, ale interesuje Cię tylko jej „istnienie” (`truthy/falsy`)
- Przy walidacji: `!!userInput` sprawdza, czy coś zostało wpisane

---

## 🛠 Praktyczny przykład (z Sequelize)

```ts
const result = {
  isPinSet: settings.pin_hash !== null,
  isTwoFactorEnabled: !!settings.two_factor_enabled, // jawna konwersja na boolean
};
```

Tu `two_factor_enabled` może być np. `1`, `0`, `null` — więc `!!` zapewnia czyste `true` lub `false`.

---

## 📌 Inne przydatne operatory konwersji i sprawdzania

| Operator         | Opis                                                   |
|------------------|--------------------------------------------------------|
| `typeof`         | Zwraca typ danej wartości jako string (`"number"`, `"boolean"` itd.) |
| `instanceof`     | Sprawdza, czy obiekt jest instancją konkretnej klasy   |
| `value ?? default` | Zwraca `value`, chyba że jest `null` lub `undefined` |
| `value || default` | Zwraca `value`, chyba że jest „falsy”                |
| `Boolean(value)` | Konwertuje dowolną wartość na boolean                  |

---

## 📥 Do skopiowania

```ts
const twoFactor = !!settings.two_factor_enabled;
// Dzięki temu masz pewność, że twoFactor jest typu boolean: true lub false
```
