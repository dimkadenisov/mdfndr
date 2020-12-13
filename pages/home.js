import React from 'react';
import Head from 'next/head';
import tokenExpireDecorator from '../common/tokenExpireDecorator';
import ImageGrid from '../components/ImageGrid';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [photos, setPhotos] = React.useState(null);

  const handleAutorizeButtonClick = React.useCallback(() => {
    window.location.assign(
      'https://oauth.vk.com/authorize?' +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_VK_CLIENT_ID,
          display: 'popup',
          scope: ['wall', 'photos', 'groups', 'secure'],
          response_type: 'token',
          v: '5.126',
        }),
    );
  });

  const handlePostButtonClick = React.useCallback(
    tokenExpireDecorator(async function handlePostButtonClick() {
      try {
        const res = await fetch(
          '/api/postToVk?' +
            new URLSearchParams({
              token: localStorage.getItem('VK_ACCESS_TOKEN'),
              photos: photos.map((photo) => photo.urls.regular),
            }),
          {
            method: 'POST',
          },
        );
        const data = await res.json();
        console.log('bibbia', data);
      } catch (e) {
        console.log('PPPPPP', e);
      }
    }),
  );

  const handlePhotoButtonClick = React.useCallback(async () => {
    try {
      const res = await fetch(
        '/api/randomPictures?' + new URLSearchParams({ count: 6 }),
      );
      const data = await res.json();
      setPhotos(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Moodfinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={handleAutorizeButtonClick}>Autorize</button>
        <button onClick={handlePostButtonClick}>Post it!</button>
        <button onClick={handlePhotoButtonClick}>Get Random Photos</button>
        {photos && <ImageGrid images={photos} />}
      </main>
    </div>
  );
}
