export default async function getImageBlob(url) {
  try {
    const data = await fetch(url);

    return await data.blob();
  } catch (e) {
    return e;
  }
}

// fetch(
//   'https://images.unsplash.com/photo-1604684078750-dbc0eb8bcac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxODY4MDd8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=400',
// ).then(async (res) => {
//   const blob = await res.blob();
//   console.log(blob);
// });
