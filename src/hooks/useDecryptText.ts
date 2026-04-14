'use client';

import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-{}[]|;:,.<>?';

export function useDecryptText(target: string, duration = 1.5, delay = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isResolved, setIsResolved] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!target) return;

    let iteration = 0;
    const interval = (duration * 1000) / target.length;

    const startDecrypt = () => {
      timerRef.current = setInterval(() => {
        setDisplayText(prev => 
          target.split('').map((char, index) => {
            if (index < iteration) return target[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );

        if (iteration >= target.length) {
          clearInterval(timerRef.current!);
          setIsResolved(true);
        }

        iteration += 1 / 3; // Slow down resolution for more "scramble"
      }, interval / 3);
    };

    const delayTimer = setTimeout(startDecrypt, delay * 1000);

    return () => {
      clearInterval(timerRef.current!);
      clearTimeout(delayTimer);
    };
  }, [target, duration, delay]);

  return { displayText, isResolved };
}
