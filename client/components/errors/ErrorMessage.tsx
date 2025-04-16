import React from "react";

interface ErrorMessageProps {
  title: string;
  message: string;
  suggestion?: string; // Opcjonalna sugestia, np. "Spróbuj ponownie"
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  suggestion = "Sprawdź połączenie z internetem lub zaloguj się ponownie.",
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="dark:bg-card rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full">
        <div className="flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-center text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="mt-2 text-center text-red-500">{message}</p>
        <p className="mt-4 text-sm text-center text-gray-500">{suggestion}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;