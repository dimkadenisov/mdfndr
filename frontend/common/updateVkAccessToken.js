import { vkAccessTokenLink } from '../constants';

export default function updateVkAccessToken() {
  const updateToken = confirm('У вас истек токен. Желаете обновить?');

  if (updateToken) {
    const vkWindow = window.open(vkAccessTokenLink, '_blank');
    vkWindow.focus();
    window.location.assign('getToken');
  } else {
    alert(
      'К сожалению, Вы не сможете публиковать посты пока не обновите токен.',
    );
  }
}
