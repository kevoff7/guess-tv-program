const URL = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

export const movies = async () => {
  return fetch(URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  })
    .then((resp) => resp.json())
    .catch((err) => {
      throw new Error(err);
    });
};
