import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/home');
    }
  }, []);

  return <h1>Change Remote Repo</h1>;
}

export default Home;
