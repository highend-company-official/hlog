type Props = {
  width?: number;
  height?: number;
};

const Default = ({ width, height }: Props) => {
  return (
    <div role="status" className="animate-pulse">
      <div
        className={`
              h-${height ?? 2.5} w-${width ?? 120}
              bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4
          `}
      ></div>
    </div>
  );
};

export default Default;
