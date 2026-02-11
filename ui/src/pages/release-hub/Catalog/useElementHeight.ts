import { useLayoutEffect, useRef, useState } from 'react';

export const useElementHeight = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      setHeight(element.getBoundingClientRect().height);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, height };
};
