import { VK } from 'vk-io';

export default async (req, res) => {
  const {
    query: { access_token, photos },
  } = req;

  const photosUrls = photos.split(',');

  const vk = new VK({
    token: access_token,
  });
  const attachments = await Promise.all(
    photosUrls.map((url) =>
      vk.upload.wallPhoto({
        source: {
          value: url,
        },
      }),
    ),
  );

  const post = await vk.api.wall.post({
    attachments,
    ownerId: `-${process.env.NEXT_PUBLIC_VK_CLUB_ID}`,
  });

  console.log(post);

  res.statusCode = 200;
  res.json({ result: true });
};
