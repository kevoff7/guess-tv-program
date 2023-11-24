export function GameOver({playAgain}: {playAgain: () => void}) {
  return (
    <div className="bg-red- w-96">
      <div className="flex flex-col items-center justify-center h-64 border-2 border-white">
        <p className="mb-10 text-2xl">You Lost!</p>
        <button className="p-1 px-5 border-2 border-white" onClick={playAgain}>
          Play again!
        </button>
      </div>
    </div>
  );
}
