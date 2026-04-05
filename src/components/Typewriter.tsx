'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursor = true,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const index = useRef(0);
  const timer = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    // Reset state
    setDisplayText('');
    setIsDone(false);
    index.current = 0;
    
    if (timer.current) clearTimeout(timer.current);

    const startTyping = () => {
      if (index.current < text.length) {
        index.current++;
        setDisplayText(text.substring(0, index.current));
        timer.current = setTimeout(startTyping, speed);
      } else {
        setIsDone(true);
      }
    };

    const initialDelay = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(initialDelay);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-[2px] h-[0.8em] ml-1 bg-current"
          style={{ verticalAlign: 'middle', background: '#0066FF' }}
        />
      )}
    </span>
  );
}
