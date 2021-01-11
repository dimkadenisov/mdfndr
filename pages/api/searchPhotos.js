import pick from 'lodash/pick';
import unsplashApi from '../../backend/unsplash/unsplashApi';

export default async (req, res) => {
  try {
    // TODO убери query из запроса и нормально обработай ошибку
    // Прочитай unsplash.js про ошибки
    const { response } = await unsplashApi.search.getPhotos(req.query);
    console.log(response);
    const data = Array.isArray(response.results)
      ? response.results.map((item) => pick(item, 'id', 'urls'))
      : {
          id: response.results.id,
          urls: response.results.urls,
        };

    res.statusCode = 200;
    console.log(data);
    res.json(data);
  } catch (e) {
    res.statusCode = 500;
    res.json({ error: 'pizdec' });
  }
};
