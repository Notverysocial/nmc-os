'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed + (displayText.length === 0 ? delay : 0));
    } else {
      setIsDone(true);
    }

    return () => clearTimeout(timeout);
  }, [displayText, text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-[2px] h-[0.8em] ml-1 bg-current vertical-middle"
          style={{ verticalAlign: 'middle' }}
        />
      )}
    </span>
  );
}
