"use client";

import { useState, useEffect } from "react";
import { FaVolumeUp } from "react-icons/fa";
import BackButton from "@/components/ui/BackButton";

const languages = ["Angielski", "Niemiecki", "Francuski"];

const flashcards = {
  Angielski: [
    { id: 1, sentencePL: "Jak masz na imię?", sentenceEN: "What's your name?" },
    { id: 2, sentencePL: "Gdzie mieszkasz?", sentenceEN: "Where do you live?" },
  ],
  Niemiecki: [
    { id: 1, sentencePL: "Jak się nazywasz?", sentenceDE: "Wie heißt du?" },
    { id: 2, sentencePL: "Skąd pochodzisz?", sentenceDE: "Woher kommst du?" },
  ],
  Francuski: [
    { id: 1, sentencePL: "Co robisz?", sentenceFR: "Que fais-tu?" },
    { id: 2, sentencePL: "Jak długo tam będziesz?", sentenceFR: "Combien de temps y resteras-tu?" },
  ],
};

export default function LanguageTrainer() {
  const [selectedLanguage, setSelectedLanguage] = useState("Angielski");
  const [dailyFlashcard, setDailyFlashcard] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const selectedFlashcards = flashcards[selectedLanguage];
    const randomFlashcard =
      selectedFlashcards[Math.floor(Math.random() * selectedFlashcards.length)];
    setDailyFlashcard(randomFlashcard);
  }, [selectedLanguage]);

  const handleAnswer = (userAnswer) => {
    const correctAnswer = dailyFlashcard?.["sentence" + selectedLanguage.slice(0, 2)];
    setIsCorrect(userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase());
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100">
        <BackButton />
      <h1 className="text-2xl font-bold mb-4">Nauka języka</h1>
      <div>
        <label htmlFor="languageSelect" className="text-lg font-semibold">
          Wybierz język:
        </label>
        <select
          id="languageSelect"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {dailyFlashcard && (
        <div className="mt-6">
          <p className="text-lg font-semibold mb-2">
            Przetłumacz na {selectedLanguage}:
          </p>
          <p className="text-xl font-bold mb-4">{dailyFlashcard.sentencePL}</p>

          <div className="mb-4">
            <button
              onClick={() => handleAnswer(prompt("Wpisz tłumaczenie:"))}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sprawdź odpowiedź
            </button>
          </div>

          {isCorrect !== null && (
            <div className={`mt-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "Odpowiedź poprawna!" : "Niestety, spróbuj ponownie."}
            </div>
          )}

          <div className="mt-4">
            <button className="text-blue-500 flex items-center">
              <FaVolumeUp className="mr-2" /> Odsłuchaj wymowę
            </button>
          </div>
        </div>
      )}
    </div>
  );
}