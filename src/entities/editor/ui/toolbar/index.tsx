import { RichUtils, DraftInlineStyleType } from "draft-js";
import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiUnderline,
  BiSave,
  BiArrowBack,
} from "react-icons/bi";

import useEditor from "../../hooks";
import classNames from "classnames";
import { unstable_usePrompt, useNavigate } from "react-router-dom";

type ToolbarItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

const ToolbarItem = (props: ToolbarItemProps) => {
  return (
    <button
      {...props}
      className={classNames(
        `w-10 h-10 flex items-center justify-center rounded-sm drop-shadow-sm`,
        {
          "bg-primary text-white": !!props.selected,
        }
      )}
    />
  );
};

const Toolbar = () => {
  const navigate = useNavigate();
  const { editorState, saveCurrentContent, setEditorState } = useEditor();

  const toggleInline =
    (type: DraftInlineStyleType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    };

  unstable_usePrompt({
    message: "작업이 취소될 수 있습니다. 계속 하시겠습니까?",
    when: ({ currentLocation, nextLocation }) =>
      editorState.getCurrentContent().hasText() &&
      currentLocation.pathname !== nextLocation.pathname,
  });

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-10 py-2 bg-white">
      <div>
        <ToolbarItem onClick={() => navigate("/")}>
          <BiArrowBack />
        </ToolbarItem>
      </div>

      <div className="flex items-center justify-center">
        <ToolbarItem onClick={toggleInline("BOLD")}>
          <BiBold />
        </ToolbarItem>
        <ToolbarItem onClick={toggleInline("ITALIC")}>
          <BiItalic />
        </ToolbarItem>
        <ToolbarItem onClick={toggleInline("STRIKETHROUGH")}>
          <BiStrikethrough />
        </ToolbarItem>
        <ToolbarItem onClick={toggleInline("UNDERLINE")}>
          <BiUnderline />
        </ToolbarItem>
      </div>

      <div>
        <ToolbarItem onClick={saveCurrentContent} selected>
          <BiSave />
        </ToolbarItem>
      </div>
    </div>
  );
};

export default Toolbar;
