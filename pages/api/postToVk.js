import { VK } from 'vk-io';

export default async (req, res) => {
  const {
    query: { photos, token },
  } = req;
  try {
    const vk = new VK({
      token,
    });
    const photosUrls = photos.split(',');
    const attachments = await Promise.all(
      photosUrls.map((url) =>
        vk.upload.wallPhoto({
          source: {
            value: url,
          },
          group_id: process.env.VK_CLUB_ID,
        }),
      ),
    );
    const post = await vk.api.wall.post({
      owner_id: `-${process.env.VK_CLUB_ID}`,
      attachments,
    });
    res.statusCode = 200;
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};
