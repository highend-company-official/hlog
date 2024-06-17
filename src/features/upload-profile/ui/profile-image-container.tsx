import { If } from "@/shared";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdModeEdit } from "react-icons/md";

type Props = {
  src: string;
  alt: string;

  onUpload: (file: File) => void;
};

const ProfileImageContainer = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [tempProfileData, setTempProfileData] = useState<File | null>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setTempProfileData(file);
    }
  };

  const handleCancelEdit = () => {
    setTempProfileData(null);
  };

  const handleClickEdit = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleClickUpload = async () => {
    if (tempProfileData) {
      props.onUpload(tempProfileData);
    }
  };

  const isEditMode = !!tempProfileData;

  return (
    <>
      {/* Image Displayer */}
      <img
        src={tempProfileData ? URL.createObjectURL(tempProfileData) : props.src}
        alt={props.alt}
        className="object-cover w-64 h-64 transition ease-in-out rounded-full cursor-pointer select-none hover:shadow-xl"
      />

      {/* Edit Util Buttons */}
      <If
        condition={isEditMode}
        trueRender={
          <div className="absolute flex h-10 bg-white rounded-full shadow right-3 bottom-3">
            <button
              onClick={handleCancelEdit}
              type="button"
              className="flex items-center justify-center mx-2 text-error"
            >
              <IoMdClose size={20} className="text-black" />
            </button>
            <button
              onClick={handleClickUpload}
              type="button"
              className="flex items-center justify-center mx-2"
            >
              <MdDone size={20} className="text-primary" />
            </button>
          </div>
        }
        falseRender={
          <button
            onClick={handleClickEdit}
            type="button"
            className="absolute flex items-center justify-center w-10 h-10 rounded-full shadow bg-primary right-3 bottom-3"
          >
            <MdModeEdit size={20} className="text-white" />
          </button>
        }
      />

      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleChangeInput}
      />
    </>
  );
};

export default ProfileImageContainer;
