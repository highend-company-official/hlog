import { useState } from "react";

const useImageDetail = () => {
  const [open, setOpen] = useState(false);
  const [targetURL, setTargetURL] = useState("");

  const openDetailView = (url: string) => {
    setTargetURL(url);
    setOpen(true);
  };
  const closeDetailView = () => {
    setTargetURL("");
    setOpen(false);
  };

  return {
    open,
    targetURL,
    openDetailView,
    closeDetailView,
  };
};

export default useImageDetail;
