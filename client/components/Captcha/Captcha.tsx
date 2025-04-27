'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Square {
  color: string;
  selected: boolean;
  correct: boolean;
}

const colors = ['niebieskie', 'czerwone', 'zielone', 'żółte'];

const colorMap: Record<string, string> = {
  niebieskie: 'blue',
  czerwone: 'red',
  zielone: 'green',
  żółte: 'yellow',
};

export default function Captcha({ onSuccess }: { onSuccess: () => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [squares, setSquares] = useState<Square[]>([]);
  const [instruction, setInstruction] = useState('');
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const tempSquares: Square[] = Array.from({ length: 9 }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return { color, selected: false, correct: color === chosenColor };
    });
    setInstruction(`Kliknij wszystkie ${chosenColor} kwadraty`);
    setSquares(tempSquares);
  };

  const handleSquareClick = (index: number) => {
    setSquares((prev) =>
      prev.map((sq, i) => (i === index ? { ...sq, selected: !sq.selected } : sq))
    );
  };

  const checkAnswer = () => {
    const correct = squares.every(
      (sq) => (sq.correct && sq.selected) || (!sq.correct && !sq.selected)
    );
    if (correct) {
      setSolved(true);
      setIsDialogOpen(false);
      onSuccess();
    } else {
      alert('Niepoprawnie! Spróbuj jeszcze raz.');
      generateCaptcha();
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <Input
          type="checkbox"
          checked={solved}
          onChange={(e) => {
            if (!e.target.checked) {
              setSolved(false);
              return;
            }
            setIsDialogOpen(true);
          }}
          disabled={solved}
          className="w-5 h-5"
        />
        <span className="text-sm">Nie jestem robotem</span>
      </label>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm flex flex-col items-center">
          <DialogHeader className="text-center">
            <DialogTitle>{instruction}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {squares.map((square, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSquareClick(idx)}
                className={`relative w-20 h-20 rounded border-2 ${
                  square.selected ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: colorMap[square.color] }}
              >
                {square.selected && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded"></div>
                )}
              </button>
            ))}
          </div>
          <Button onClick={checkAnswer} className="w-full mt-6">
            Sprawdź
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
