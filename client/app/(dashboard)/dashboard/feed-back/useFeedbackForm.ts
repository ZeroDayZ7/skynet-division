// hooks/useFeedbackForm.ts
import { useState } from "react";

export function useFeedbackForm(onSubmit: () => void) {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [type, setType] = useState("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, feedback, type });
    onSubmit();
    setRating(null);
    setFeedback("");
    setType("general");
  };

  return {
    rating,
    setRating,
    feedback,
    setFeedback,
    type,
    setType,
    handleSubmit,
  };
}
