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
import { useNavigate } from "react-router-dom";
import { useModal } from "@/app/store";
import { useLocalStorage, STORAGE_CONSTS } from "@/shared";

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
  const { addModal } = useModal();
  const { editorState, saveCurrentContent, setEditorState } = useEditor();

  const toggleInline =
    (type: DraftInlineStyleType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    };

  // useBlocker 사용해보기?
  const detectBackLinking = () => {
    addModal({
      title: "저장하시겠습니까?",
      content: "저장하지 않으면 변경한 내용이 손실됩니다.",
      onClickAccept: () => {
        saveCurrentContent();
        navigate(-1);
      },
      onClickDecline: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className="relative w-full h-[10%] bg-white drop-shadow-md flex align-center justify-center py-2">
      <div className="absolute left-3">
        <ToolbarItem>
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
      <div className="absolute right-8">
        <ToolbarItem onClick={saveCurrentContent} selected>
          <BiSave />
        </ToolbarItem>
      </div>
    </div>
  );
};

export default Toolbar;
