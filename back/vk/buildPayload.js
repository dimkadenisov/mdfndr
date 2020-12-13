import FormData from 'form-data';

export async function buildPayload(url) {
  const formData = new FormData();
  const response = await fetch(url);
  const value = response.body;

  formData.append('photo', value, {
    filename: 'file.jpg',
    header: { 'Content-Type': 'image/jpeg' },
    knownLength: response.headers.get('content-length'),
  });

  return formData;
}
