export default async function getImageBlob(url) {
  try {
    const data = await fetch(url);

    return await data.blob();
  } catch (e) {
    return e;
  }
}
