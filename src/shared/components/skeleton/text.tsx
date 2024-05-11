import * as React from "react";

type Props = {
  width?: number;
  repeat?: number;
};

const Text = ({ width, repeat }: Props) => {
  const sentences = [
    <div className="h-2.5 w-32 bg-gray-200 rounded-full" />,
    <div className="h-2.5 w-24 mx-2 bg-gray-300 rounded-full" />,
    <div className="h-2.5 mx-2 bg-gray-300 rounded-full w-52" />,
    <div className="h-2.5 mx-2 bg-gray-300 rounded-full w-14" />,
    <div className="h-2.5 w-full mx-2 bg-gray-300 rounded-full" />,
  ];

  // 배열을 섞는 함수
  const shuffleArray = (array: JSX.Element[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const render = (key: number) => {
    const shuffledSentences = shuffleArray([...sentences]);
    return (
      <React.Fragment key={key}>
        <div className="flex items-center w-full">
          {shuffledSentences.map((sentence, index) => (
            <React.Fragment key={index}>{sentence}</React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div
      role="status"
      className={`space-y-2.5 animate-pulse max-w-${width ?? 100}px`}
    >
      {Array(repeat ?? 1)
        .fill(0)
        .map((_, index) => render(index))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Text;
