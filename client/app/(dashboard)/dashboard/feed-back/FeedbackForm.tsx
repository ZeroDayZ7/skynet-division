// components/FeedbackForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";

export function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj można dodać logikę wysyłania
    console.log({ rating, feedback, email });
    setIsSubmitted(true);
    setRating(null);
    setFeedback("");
    setEmail("");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Podziel się swoją opinią</h3>
      
      {isSubmitted ? (
        <div className="p-4 text-sm text-green-600 border border-green-200 rounded-md">
          Dziękujemy za opinię! Twoje uwagi są dla nas bardzo cenne.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Ocena</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${rating && star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
                >
                  <Star className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Twoja opinia</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Co nam się podoba, a co możemy poprawić?"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (opcjonalnie)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Jeśli chcesz otrzymać odpowiedź"
            />
          </div>

          <div className="space-y-2">
            <Label>Typ opinii</Label>
            <RadioGroup defaultValue="general" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general" className="font-normal">
                  Ogólna
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug" className="font-normal">
                  Znalazłem błąd
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suggestion" id="suggestion" />
                <Label htmlFor="suggestion" className="font-normal">
                  Propozycja zmian
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Wyślij opinię
          </Button>
        </form>
      )}
    </div>
  );
}