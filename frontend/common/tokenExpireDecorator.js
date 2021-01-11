import isVkAccessTokenValid from './isVkAccessTokenValid';
import updateVkAccessToken from './updateVkAccessToken';

export default function tokenExpireDecorator(func) {
  return function () {
    if (!isVkAccessTokenValid()) {
      return updateVkAccessToken();
    }
    func(arguments);
  };
}
