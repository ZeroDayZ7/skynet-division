'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

type ColorKey = 'blue' | 'red' | 'green' | 'yellow';

type Square = {
  color: ColorKey;
  selected: boolean;
  correct: boolean;
};

type CaptchaProps = {
  onSuccess: () => void;
  disabled?: boolean;
  className?: string;
};

const COLORS: ColorKey[] = ['blue', 'red', 'green', 'yellow'];

const COLOR_MAP: Record<ColorKey, string> = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
};

export default function Captcha({
  onSuccess,
  disabled = false,
  className = ''
}: CaptchaProps) {
  const t = useTranslations('Captcha');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [squares, setSquares] = useState<Square[]>([]);
  const [instruction, setInstruction] = useState('');
  const [solved, setSolved] = useState(false);

  const generateCaptcha = useCallback(() => {
    const chosenColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const tempSquares: Square[] = Array.from({ length: 9 }, () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        color,
        selected: false,
        correct: color === chosenColor,
      };
    });

    const colorLabel = t(`colors.${chosenColor}`);
    setInstruction(`${t('instructionPrefix')} ${colorLabel} ${t('instructionSuffix')}`);
    setSquares(tempSquares);
  }, [t]);

  useEffect(() => {
    if (!disabled) {
      generateCaptcha();
    }
  }, [generateCaptcha, disabled]);

  const handleSquareClick = useCallback((index: number) => {
    if (disabled) return;
    setSquares((prev) =>
      prev.map((sq, i) => (i === index ? { ...sq, selected: !sq.selected } : sq))
    );
  }, [disabled]);

  const checkAnswer = useCallback(() => {
    if (disabled) return;

    const isCorrect = squares.every(
      (sq) => (sq.correct && sq.selected) || (!sq.correct && !sq.selected)
    );

    if (isCorrect) {
      setSolved(true);
      setIsDialogOpen(false);
      onSuccess();
    } else {
      alert(t('incorrect'));
      generateCaptcha();
    }
  }, [squares, onSuccess, generateCaptcha, disabled, t]);

  const handleCheckboxChange = useCallback((checked: boolean) => {
    if (disabled) return;

    if (!checked) {
      setSolved(false);
      return;
    }
    setIsDialogOpen(true);
  }, [disabled]);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center gap-2 cursor-pointer">
        <Input
          name="captcha"
          type="checkbox"
          checked={solved}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          disabled={disabled || solved}
          className="w-5 h-5"
        />
        <span className="text-sm">{t('label')}</span>
      </label>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm flex flex-col items-center">
          <DialogHeader className="text-center">
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>{instruction}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {squares.map((square, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSquareClick(idx)}
                disabled={disabled}
                className={`relative w-20 h-20 rounded border-2 transition-colors
                  ${square.selected ? 'border-black' : 'border-gray-300'}
                  ${COLOR_MAP[square.color]}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                `}
                aria-label={`Kwadrat ${t(`colors.${square.color}`)}`}
              >
                {square.selected && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded" />
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={checkAnswer}
            disabled={disabled}
            className="w-full mt-6"
          >
            {t('check')}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
