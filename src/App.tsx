import {Heart} from "./guess-tv-program/icon";
import {GameOver} from "./guess-tv-program/GameOver";
import {useMovies} from "./guess-tv-program/hooks/useMovies";

function App() {
  const {movie, lives, points, hint, guessName, playAgain, setHint, checkNameProgram} = useMovies();

  return (
    <div className="flex flex-col min-h-screen text-white bg-body">
      <header className="mt-5 text-3xl text-center">
        <h1 className="p-5">Guess the name of a television program</h1>
      </header>
      <main className="flex flex-col items-center max-w-4xl mx-auto">
        {!lives.includes(true) ? (
          <GameOver playAgain={playAgain} />
        ) : (
          <div className="mt-7">
            {!movie ? (
              <p className="text-center">loading...</p>
            ) : (
              <div>
                <div className="flex justify-center">
                  <p className="flex items-center gap-1 text-xl">
                    Lives:
                    {lives.map((li, index) => {
                      return (
                        <span key={index}>
                          {li ? (
                            <Heart color={"text-red-500"} />
                          ) : (
                            <Heart color={"text-gray-500"} />
                          )}
                        </span>
                      );
                    })}
                    - points : {points}
                  </p>
                </div>
                <section className="flex flex-col items-center">
                  <article className="flex flex-row mt-5">
                    {guessName?.map((name, index) => {
                      return (
                        <p key={index} className="p-1 text-3xl font-light">
                          {name.letter === " " ? "\u00A0" : name.letter}
                        </p>
                      );
                    })}
                  </article>
                  <article className="flex gap-5 mt-5">
                    <button className="p-1 border-2 border-gray-600" onClick={() => setHint(!hint)}>
                      Hint
                    </button>
                    <button className="p-1 border-2 border-gray-600" onClick={checkNameProgram}>
                      Check the guess
                    </button>
                  </article>
                  {hint && (
                    <article className="mt-10">
                      <p>{movie.overview}</p>
                    </article>
                  )}
                </section>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
