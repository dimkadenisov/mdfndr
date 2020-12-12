import qs from 'querystring';

export default async function getWallUploadServer(accessToken) {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_VK_API_BASE_URL}/photos.getWallUploadServer?` +
        qs.stringify({
          group_id: process.env.NEXT_PUBLIC_VK_CLUB_ID,
          access_token: accessToken,
          v: '5.126',
        }),
    );

    const parsedData = await data.json();

    if (parsedData.error) {
      throw new Error(parsedData.error);
    }

    const {
      response: { album_id, upload_url, user_id },
    } = parsedData;

    return { album_id, upload_url, user_id };
  } catch (e) {
    return e;
  }
}
