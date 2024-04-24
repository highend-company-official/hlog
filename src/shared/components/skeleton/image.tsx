import { CiImageOn } from "react-icons/ci";

const Image = () => {
  return (
    <div
      role="status"
      className={`flex items-center justify-center w-full h-96 bg-gray-300 rounded-lg animate-pulse`}
    >
      <CiImageOn size={120} />
    </div>
  );
};

export default Image;
