import type {GuessName, Movie} from "../../types";

import confetti from "canvas-confetti";
import {useCallback, useEffect, useState} from "react";

import {movies} from "../../services/movies";
import {getRandomMovie} from "../helpers/getRandomMovie";
import {getPartialMovieName} from "../helpers/getPartialMovieName";
const lifes = [true, true, true];

export function useMovies() {
  const [movie, setMovie] = useState<null | Movie>(null);
  const [guessName, setGuessName] = useState<GuessName[] | null>(null);
  const [lives, setLives] = useState(lifes);
  const [points, setPoints] = useState(0);
  const [hint, setHint] = useState(false);

  const playAgain = () => {
    setHint(false);
    setPoints(0);
    setLives(lifes);
    setMovie(null);
  };
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (guessName === null) return;
      if (event.key === "Backspace") {
        const lastUserIndex = guessName
          .reverse()
          .findIndex((item) => item.letter !== "_" && item.user);
        const lastIndexReversed = guessName.length - 1 - lastUserIndex;

        const newGuessName = guessName
          .reverse()
          .map((items, i) => (i === lastIndexReversed ? {...items, letter: "_"} : items));

        setGuessName(newGuessName);
      } else if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        const firstEmptyIndex = guessName.findIndex((item) => item.letter === "_");

        if (firstEmptyIndex === -1) return;
        guessName[firstEmptyIndex].letter = event.key;

        return setGuessName([...guessName]);
      }
    },
    [guessName, setGuessName],
  );

  const checkNameProgram = () => {
    const nameProgram = guessName?.map((name) => {
      return name.letter;
    });

    const checkName = nameProgram?.join("").toLocaleLowerCase() === movie!.name.toLocaleLowerCase();

    if (!checkName) {
      const copy = [...lives];

      const index = copy.reverse().findIndex((item) => item === true);
      const lastIndexReversed = copy.length - 1 - index;

      copy.reverse()[lastIndexReversed] = false;
      setLives(copy);
    } else {
      confetti();
      setPoints((prevCont) => prevCont + 1);
    }
    setHint(false);
    setMovie(null);
  };

  useEffect(() => {
    movies().then((data) => setMovie(data.results[getRandomMovie(data.results)]));
  }, [lives, points]);

  useEffect(() => {
    if (movie === null) return;
    setGuessName(getPartialMovieName(movie));
  }, [movie]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    movie,
    lives,
    points,
    hint,
    guessName,
    setMovie,
    setLives,
    setPoints,
    playAgain,
    setHint,
    setGuessName,
    checkNameProgram,
  };
}
