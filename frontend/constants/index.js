export const vkAccessTokenLink =
  'https://oauth.vk.com/authorize?' +
  new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_VK_CLIENT_ID,
    display: 'popup',
    scope: ['wall', 'photos', 'groups', 'secure'],
    response_type: 'token',
    v: process.env.NEXT_PUBLIC_NEXT_PUBLIC_VK_API_VERSION,
  });
