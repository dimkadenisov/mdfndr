import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const tokenLink =
  'https://oauth.vk.com/authorize?' +
  new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_VK_CLIENT_ID,
    display: 'popup',
    scope: ['wall', 'photos', 'groups', 'secure'],
    response_type: 'token',
    v: '5.126',
  });

export default function Home() {
  const handleFormSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    const token = e.target.token.value;
    try {
      const response = await fetch(`/api/checkToken?token=${token}`);

      if (response.status === 200) {
        //b96b08d2e6e492c2494289670dc15b86571d6cf1563118677ffe7c9ca2912fec4917725ea25c517db4998
        const data = await response.json();

        if (data.error) {
          throw new Error();
        }

        if (data.response.success) {
          localStorage.setItem('VK_ACCESS_TOKEN_EXPIRE', data.response.expire);
          localStorage.setItem('VK_ACCESS_TOKEN', token);

          window.location.replace('/home');
        }
      }
    } catch {
      alert(
        'Не удалось проверить токен. Проверьте правильность ввода или повторите попытку позже.',
      );
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Moodfinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span>Для использования приложения необходимо получить токен вк</span>
        <a target="blank" href={tokenLink}>
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
