import checkToken from '../../back/vk/checkToken';

export default async (req, res) => {
  const {
    query: { token },
  } = req;

  const data = await checkToken(token);

  res.status = 200;
  res.json(data);
};
