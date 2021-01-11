export default function isVkAccessTokenValid() {
  const expireDate = localStorage.getItem('VK_ACCESS_TOKEN_EXPIRE');

  if (!expireDate) return false;

  return Date.now() < Number(expireDate) * 1000;
}
