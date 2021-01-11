import React from 'react';
import { useRouter } from 'next/router';
import isVkAccessTokenValid from '../frontend/common/isVkAccessTokenValid';

export default function Application() {
  const router = useRouter();

  React.useEffect(() => {
    if (isVkAccessTokenValid()) {
      router.push('/home');
    }
  }, []);

  const handleButtonClick = React.useCallback(() => {
    router.push('/getToken');
  });

  return (
    <main>
      Хотите автоматом постить вк?
      <button onClick={handleButtonClick}>Жмите сюда</button>
    </main>
  );
}
