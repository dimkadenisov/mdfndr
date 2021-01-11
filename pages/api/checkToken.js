import checkToken from '../../backend/vk/checkToken';

export default async (req, res) => {
  const {
    query: { token },
  } = req;

  // TODO  try catch попробуй убрать параметр запроса
  const data = await checkToken(token);

  res.status = 200;
  res.json(data);
};
