"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { useFeedbackForm } from "./useFeedbackForm";
import { useAuth } from "@/context/AuthContext"; // zakładam, że masz taki hook

export function FeedbackForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuth(); // zakładam że zwraca user.username

  const {
    rating,
    setRating,
    feedback,
    setFeedback,
    type,
    setType,
    handleSubmit,
  } = useFeedbackForm(() => setIsSubmitted(true));

  return (
    <div className="container flex justify-center items-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Podziel się swoją opinią</CardTitle>
          <CardDescription>Twoja opinia pomaga nam się rozwijać.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isSubmitted ? (
            <div className="p-4 text-sm text-green-600 border border-green-200 rounded-md">
              Dziękujemy za opinię, {user?.nick}! Twoje uwagi są dla nas bardzo cenne.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <fieldset className="space-y-2">
                <legend>Ocena</legend>
                <div id="rating" className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`Ocena ${star} gwiazdek`}
                      className={`p-1 ${
                        rating && star <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="feedback">Twoja opinia</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Co nam się podoba, a co możemy poprawić?"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <fieldset className="space-y-2">
                <legend>Typ opinii</legend>
                <RadioGroup
                  id="type"
                  name="type"
                  value={type}
                  onValueChange={setType}
                  className="flex gap-4"
                >
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
              </fieldset>

              <Button type="submit" className="w-full">
                Wyślij opinię
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
