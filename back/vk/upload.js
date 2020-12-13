import { promisify } from 'util';

export async function upload(url, formData) {
  const formDataLength = await promisify(formData.getLength).call(formData);

  const response = await fetch(url, {
    compress: false,
    method: 'POST',
    headers: {
      ...formData.getHeaders(),
      Connection: 'keep-alive',
      'Content-Length': String(formDataLength),
    },
    formData,
  });

  const result = await response.json();

  return result.response !== undefined ? result.response : result;
}
