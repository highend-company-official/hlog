import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

type Props = {
  open: boolean;
  url: string;
  onClose: () => void;
};

const ImageDetailOverlay = ({ open, url, onClose }: Props) => {
  if (!open) return null;

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
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div className="relative flex items-center justify-center w-full h-full p-4">
        <img src={url} alt="" className="max-w-full max-h-full" />
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IoMdClose size={50} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default ImageDetailOverlay;
