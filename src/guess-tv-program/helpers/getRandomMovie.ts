import type {Movie} from "../../types";

export const getRandomMovie = (movie: Movie[]) => {
  return Math.floor(Math.random() * movie.length);
};
