import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import setVkAccessToken from '../frontend/common/setVkAccessToken';
import { vkAccessTokenLink } from '../frontend/constants';

export default function GetToken() {
  const router = useRouter();

  const handleFormSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    const token = e.target.token.value;
    try {
      const response = await fetch(`/api/checkToken?token=${token}`);

      if (response.status === 200) {
        const data = await response.json();

        if (data.error) {
          throw new Error();
        }

        if (data.response.success) {
          setVkAccessToken(token, data.response.expire);
          router.push('/home');
        }
      }
    } catch {
      alert(
        'Не удалось проверить токен. Проверьте правильность ввода или повторите попытку позже.',
      );
    }
  });

  return (
    <div>
      <Head>
        <title>Получить токен</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span>Для использования приложения необходимо получить токен вк</span>
        <br />
        <a target="_blank" rel="noreferrer" href={vkAccessTokenLink}>
          Получить токен
        </a>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="token" required />
          <button>Проверить токен</button>
        </form>
      </main>
    </div>
  );
}
