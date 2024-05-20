import { CgSpinner } from "react-icons/cg";

const UploadOverlay = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full max-h-full overflow-x-hidden overflow-y-auto bg-black/30">
      <div className="flex flex-col items-center justify-center text-white">
        <CgSpinner className="animate-spin" size={50} />

        <span className="mt-5 text-2xl">이미지 업로드 중...</span>
      </div>
    </div>
  );
};

export default UploadOverlay;
