import {Movie} from "../../types";

export const getPartialMovieName = (movie: Movie) => {
  const name = movie.name.split("");

  const nameWithoutSpaces = movie.name.replace(/\s/g, "");

  const indexes = Array.from({length: movie.name.length}, (_, index) => index)
    .sort((index) =>
      movie.name[index] === " " || movie.name[index] === ":" ? 1 : Math.random() >= 0.5 ? 1 : -1,
    )
    .slice(0, Math.floor((nameWithoutSpaces.length * 50) / 100));

  return name.map((item, i) => {
    return indexes.includes(i) ? {letter: "_", user: true} : {letter: item, user: false};
  });
};
