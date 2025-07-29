import { wrap } from 'motion/react';
import { useState } from 'react';

export function useCarousel(length: number) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(0, length, selectedIndex + newDirection);
    setSelectedIndex(nextItem);
    setDirection(newDirection);
  }

  return {
    selectedIndex,
    direction,
    setSlide,
  };
}
