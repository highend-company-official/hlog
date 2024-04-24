type Props = {
  width?: number;
  height?: number;
};

const Default = ({ width, height }: Props) => {
  return (
    <div role="status" className="animate-pulse">
      <div
        className="h-2.5 w-full bg-gray-200 rounded-lg dark:bg-gray-700 mb-4"
        style={{
          width,
          height,
        }}
      />
    </div>
  );
};

export default Default;
