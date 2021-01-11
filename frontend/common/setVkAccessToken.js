export default function setVkAccessToken(token, expire) {
  localStorage.setItem('VK_ACCESS_TOKEN_EXPIRE', expire);
  localStorage.setItem('VK_ACCESS_TOKEN', token);
}
