import pick from 'lodash/pick';
import unsplashApi from '../../backend/unsplash/unsplashApi';

export default async (req, res) => {
  try {
    const { response } = await unsplashApi.photos.getRandom(req.query);
    const data = Array.isArray(response)
      ? response.map((item) => pick(item, 'id', 'urls'))
      : {
          id: response.id,
          urls: response.urls,
        };
    res.statusCode = 200;
    res.json(data);
  } catch (e) {
    res.statusCode = 500;
    res.json({ error: e });
  }
};
