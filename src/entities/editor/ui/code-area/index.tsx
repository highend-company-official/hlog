import { ChangeEvent } from "react";
import { useEditorContext } from "../../lib";

const CodeArea = () => {
  const [value, setValue] = useEditorContext();

  const handleChangeEditor = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="h-[90%]">
      <div className="h-full bg-white rounded-b-lg">
        <label htmlFor="editor" className="sr-only">
          Publish post
        </label>
        <textarea
          value={value}
          className="block w-full h-full px-0 text-gray-800 bg-white"
          placeholder="글을 작성해보세요"
          required
          onChange={handleChangeEditor}
        />
      </div>
    </div>
  );
};

export default CodeArea;
