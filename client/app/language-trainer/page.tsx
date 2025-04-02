"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

const LanguageTrainer = () => {
  // Stan aplikacji
  const [currentLesson, setCurrentLesson] = useState(0);
  const [userProgress, setUserProgress] = useState({
    completedLessons: 0,
    totalPoints: 0,
    streak: 0,
    lastPracticeDate: null,
    vocabularyMastered: 0,
    grammarMastered: 0,
  });
  const [currentView, setCurrentView] = useState("dashboard");
  const [answer, setAnswer] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const router = useRouter();
  const handleClose = () => {
    router.push("/dashboard");
  };

  // Przykładowe dane lekcji
  const lessons = [
    {
      id: 1,
      title: "Podstawowe powitania",
      exercises: [
        {
          type: "translation",
          question: "Jak powiesz 'Dzień dobry' po angielsku?",
          answer: "Good morning",
          options: [
            "Good evening",
            "Good morning",
            "Hello there",
            "Good night",
          ],
        },
        {
          type: "fill",
          question: "Uzupełnij: '_____ are you?'",
          answer: "How",
          hint: "Pytamy o samopoczucie",
        },
      ],
    },
    {
      id: 2,
      title: "Przedstawianie się",
      exercises: [
        {
          type: "translation",
          question: "Jak powiesz 'Nazywam się Jan' po angielsku?",
          answer: "My name is Jan",
          options: ["I am Jan", "My name is Jan", "I called Jan", "Me Jan"],
        },
      ],
    },
  ];

  // Funkcja do sprawdzania odpowiedzi
  const checkAnswer = () => {
    const currentExercise = lessons[currentLesson].exercises[0];
    if (answer.toLowerCase() === currentExercise.answer.toLowerCase()) {
      setFeedbackMessage("Poprawna odpowiedź! +10 punktów");
      setUserProgress({
        ...userProgress,
        totalPoints: userProgress.totalPoints + 10,
      });
    } else {
      setFeedbackMessage(
        `Niepoprawna odpowiedź. Prawidłowa to: ${currentExercise.answer}`
      );
    }
    setShowFeedback(true);
  };

  // Funkcja do przejścia do następnej lekcji
  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setShowFeedback(false);
      setAnswer("");
    } else {
      // Zakończenie wszystkich lekcji
      setCurrentView("completed");
      setUserProgress({
        ...userProgress,
        completedLessons: userProgress.completedLessons + 1,
      });
    }
  };

  // Funkcja do aktualizacji pasków postępu
  useEffect(() => {
    // Symulacja aktywności użytkownika dla celów demonstracyjnych
    const today = new Date();
    if (
      !userProgress.lastPracticeDate ||
      new Date(userProgress.lastPracticeDate).toDateString() !==
        today.toDateString()
    ) {
      setUserProgress({
        ...userProgress,
        streak: userProgress.streak + 1,
        lastPracticeDate: today,
      });
    }
  }, [currentLesson]);

  // Renderowanie widoku tablicy postępów
  const renderDashboard = () => (
    <div className="p-4 bg-blue-50 rounded-lg shadow">
      <h2 className="text-xl font-bold text-center mb-4">
        Twój postęp językowy
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{userProgress.totalPoints}</div>
          <div className="text-xs">Punkty</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{userProgress.streak}</div>
          <div className="text-xs">Dni pod rząd</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {userProgress.completedLessons}
          </div>
          <div className="text-xs">Ukończone lekcje</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Słownictwo</h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{
              width: `${(userProgress.vocabularyMastered / 100) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-1">Gramatyka</h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${(userProgress.grammarMastered / 100) * 100}%` }}
          ></div>
        </div>
      </div>

      <button
        onClick={() => setCurrentView("lesson")}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
      >
        Rozpocznij naukę
      </button>
    </div>
  );

  // Renderowanie widoku lekcji
  const renderLesson = () => {
    const currentExercise = lessons[currentLesson].exercises[0];

    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium">
            Lekcja {currentLesson + 1}/{lessons.length}
          </div>
          <div className="text-sm font-medium">
            {lessons[currentLesson].title}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">{currentExercise.question}</h3>

          {currentExercise.type === "translation" && (
            <div className="space-y-2">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setAnswer(option)}
                  className={`w-full py-2 px-4 rounded-lg border ${
                    answer === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  } text-left`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentExercise.type === "fill" && (
            <div className="mb-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Wpisz odpowiedź..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {currentExercise.hint && (
                <div className="text-sm text-gray-500 mt-1">
                  Podpowiedź: {currentExercise.hint}
                </div>
              )}
            </div>
          )}
        </div>

        {showFeedback ? (
          <div className="mb-4">
            <div
              className={`p-3 rounded-lg ${
                feedbackMessage.includes("Poprawna")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedbackMessage}
            </div>
            <button
              onClick={nextLesson}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
            >
              Następne zadanie
            </button>
          </div>
        ) : (
          <button
            onClick={checkAnswer}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            Sprawdź odpowiedź
          </button>
        )}
      </div>
    );
  };

  // Renderowanie widoku ukończenia
  const renderCompleted = () => (
    <div className="p-4 bg-green-50 rounded-lg shadow text-center">
      <div className="text-green-500 text-4xl mb-4">🎉</div>
      <h2 className="text-xl font-bold mb-2">Gratulacje!</h2>
      <p className="mb-4">Ukończyłeś wszystkie lekcje w tym module!</p>
      <div className="mb-6">
        <div className="text-3xl font-bold text-green-600">
          +{userProgress.totalPoints}
        </div>
        <div className="text-sm">Zdobyte punkty</div>
      </div>
      <button
        onClick={() => setCurrentView("dashboard")}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
      >
        Wróć do tablicy postępów
      </button>
    </div>
  );

  // Renderowanie aktualnego widoku
  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return renderDashboard();
      case "lesson":
        return renderLesson();
      case "completed":
        return renderCompleted();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      <div className="p-4 bg-blue-600 text-white">
        <div className="flex justify-between items-center">
          <button
            onClick={handleClose}
            className="text-xl text-red-600 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          <h1 className="text-lg font-bold">Język Angielski</h1>
          <div className="flex items-center">
            <span className="mr-2">{userProgress.totalPoints}</span>
            <span>⭐</span>
          </div>
        </div>
      </div>

      <div className="p-4">{renderCurrentView()}</div>

      {currentView !== "dashboard" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            Wróć do strony głównej
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageTrainer;
