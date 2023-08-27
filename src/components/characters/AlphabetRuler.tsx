interface AlphabetRulerProps {
  onClick: (letter: string) => void
}

export function AlphabetRuler({ onClick }: AlphabetRulerProps) {
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index),
  )

  return (
    <div className="no-scrollbar flex items-center justify-between gap-2 overflow-x-scroll">
      <button
        className="flex items-center justify-center rounded bg-zinc-700 p-2 hover:bg-zinc-600"
        onClick={() => onClick('all')}
      >
        ALL
      </button>
      <button
        className="flex w-10 items-center justify-center rounded bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
        onClick={() => onClick('0-9')}
      >
        #
      </button>
      {alphabet.map((letter) => (
        <button
          key={letter}
          className="flex w-10 items-center justify-center rounded bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
          onClick={() => onClick(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}
