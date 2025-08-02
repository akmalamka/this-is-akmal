import { wrap } from 'motion/react';
import { useState } from 'react';

export type Direction = 1 | -1;

export function useCarousel(length: number) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);

  function setSlide(newDirection: Direction) {
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
