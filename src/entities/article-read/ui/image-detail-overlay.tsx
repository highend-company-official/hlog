import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

import useEditorStore from "../model";

const ImageDetailOverlay = () => {
  const { detailTarget, setOpen } = useEditorStore();

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.1,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full max-h-full overflow-x-hidden overflow-y-auto bg-black/30"
    >
      <div className="flex flex-col items-center justify-center w-8/12">
        <img src={detailTarget} alt="" className="w-full" />
      </div>

      <button
        className="fixed right-8 top-8"
        onClick={() => setOpen("isImageDetailOverlayOpen", false)}
      >
        <IoMdClose size={50} className="text-white" />
      </button>
    </motion.div>
  );
};

export default ImageDetailOverlay;
