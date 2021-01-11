import qs from 'querystring';

export default async function getWallUploadServer(accessToken) {
  try {
    const data = await fetch(
      `${process.env.VK_API_BASE_URL}/photos.getWallUploadServer?` +
        qs.stringify({
          group_id: process.env.VK_CLUB_ID,
          access_token:
            '09f5db0306c76a4c9b9f695112f36ddbf14111f311af6efa4d426561d4987940bcbe9055c90bbba15cef6',
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

    return upload_url;
  } catch (e) {
    return e;
  }
}
