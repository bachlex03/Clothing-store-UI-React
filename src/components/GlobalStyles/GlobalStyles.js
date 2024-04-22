import { useEffect } from 'react';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
  useEffect(() => {
    const body = document.querySelector('body');

    const windowHeigh = window.innerHeight;

    window.addEventListener('scroll', function (event) {
      // Your code to handle scrolling event goes here
      console.log('Page scrolled');
    });
  }, []);

  return children;
}

export default GlobalStyles;
