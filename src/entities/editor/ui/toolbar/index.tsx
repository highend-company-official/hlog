import * as shared from "@/shared";
import useEditor from "../../hooks";

const Toolbar = () => {
  const { saveCurrentContent } = useEditor();

  return (
    <div className="fixed bottom-0 h-[10%]">
      <shared.Button onClick={saveCurrentContent}>저장</shared.Button>
    </div>
  );
};

export default Toolbar;
