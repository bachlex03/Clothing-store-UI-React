import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debounceValue, setDebounce] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
}

export default useDebounce;
