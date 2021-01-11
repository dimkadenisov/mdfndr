import { useRouter } from 'next/router';
import { vkAccessTokenLink } from '../constants';

export default function updateVkAccessToken() {
  const router = useRouter();
  const updateToken = confirm('У вас истек токен. Желаете обновить?');

  if (updateToken) {
    const vkWindow = window.open(vkAccessTokenLink, '_blank');
    vkWindow.focus();
    router.push('getToken');
  } else {
    alert(
      'К сожалению, Вы не сможете публиковать посты пока не обновите токен.',
    );
  }
}
