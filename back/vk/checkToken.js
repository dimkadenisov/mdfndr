import qs from 'querystring';
import getAppAccessToken from './getAppAccessToken';

export default async function checkToken(token) {
  const appAccessToken = await getAppAccessToken();
  const urlParams = qs.stringify({
    token,
    access_token: appAccessToken,
    client_secret: process.env.VK_SECRET_KEY,
    v: process.env.VK_API_VERSION,
  });

  const response = await fetch(
    `${process.env.VK_API_BASE_URL}/secure.checkToken?${urlParams}`,
  );

  if (response.status === 200) {
    const data = await response.json();

    if (data.error) {
      throw new Error(data);
    }

    return data;
  }

  throw new Error({
    error: {
      status: response.status,
      text: response.text,
    },
  });
}
