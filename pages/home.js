import React from 'react';
import Head from 'next/head';
import tokenExpireDecorator from '../frontend/common/tokenExpireDecorator';
import ImageGrid from '../frontend/components/ImageGrid';

export default function Home() {
  const [photos, setPhotos] = React.useState(null);

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

  const handleGetRandomPhoto = React.useCallback(async () => {
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

  const handlePhotoFormSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    try {
      const res = await fetch(
        '/api/searchPhotos?' +
          new URLSearchParams({ query: search, perPage: 6 }),
      );
      const data = await res.json();
      setPhotos(data);
      console.log('biba', data);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div>
      <Head>
        <title>Moodfinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handlePhotoFormSubmit}>
          <input type="text" name="search" placeholder="keywords" />
          <button>Get Query Photos</button>
        </form>
        <button onClick={handleGetRandomPhoto}>Get Random Photos</button>
        <button onClick={handlePostButtonClick}>Post it!</button>
        {photos && <ImageGrid images={photos} />}
      </main>
    </div>
  );
}
