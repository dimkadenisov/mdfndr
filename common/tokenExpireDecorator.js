import { assign, update } from 'lodash';

export default function tokenExpireDecorator(func) {
  return function () {
    const tokenExpire =
      Number(localStorage.getItem('VK_ACCESS_TOKEN_EXPIRE')) * 1000;
    console.log(Date.now(), '\n', tokenExpire);

    if (Date.now() > tokenExpire) {
      const updateToken = confirm('У вас истек токен. Желаете обновить?');

      return updateToken && window.location.assign('/');
    }

    func(arguments);
  };
}
