import qs from 'querystring';
import cachingDecorator from '../../common/cachingDecorator';

const urlParams = qs.stringify({
  client_id: process.env.NEXT_PUBLIC_VK_CLIENT_ID,
  client_secret: process.env.VK_SECRET_KEY,
  v: process.env.VK_API_VERSION,
  grant_type: 'client_credentials',
});

async function getAppAccessToken() {
  const response = await fetch(
    `https://oauth.vk.com/access_token?${urlParams}`,
  );

  if (response.status === 200) {
    const data = await response.json();

    if (data.error) {
      throw new Error(data);
    }

    return data.access_token;
  }

  throw new Error({
    error: {
      status: response.status,
      text: response.text,
    },
  });
}

export default cachingDecorator(getAppAccessToken);
