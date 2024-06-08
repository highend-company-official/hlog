import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdModeEdit } from "react-icons/md";

import {
  profileKeyFactor,
  usePatchProfileImage,
  usePatchProfileImageReset,
} from "@/entities/profile";
import {
  Blockquote,
  If,
  Modal,
  isProviderURL,
  useBucket,
  useFetchUser,
  useToast,
} from "@/shared";
import defaultProfile from "@/shared/assets/default-profile.jpg";

const ProfileUploadForm = () => {
  const params = useParams<{ user_id: string }>();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { read } = useBucket("profiles");
  const { data: userData } = useFetchUser(params.user_id!);

  const { open } = useToast();
  const { mutateAsync: uploadProfileImage } = usePatchProfileImage(
    params.user_id!
  );
  const { mutateAsync: resetProfileImage } = usePatchProfileImageReset(
    params.user_id!,
    userData!.profile_url!
  );

  const [tempProfileData, setTempProfileData] = useState<File | null>(null);
  const [isResetProfileModalOpen, setIsResetProfileModalOpen] = useState(false);

  const hasProfile = !!userData?.profile_url;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget && event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      setTempProfileData(file);
    }
  };

  const handleClickInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadProfile = async () => {
    if (!tempProfileData) return;

    try {
      await uploadProfileImage(tempProfileData);
      open({
        type: "success",
        content: "프로필 설정에 성공했습니다.",
        staleTime: 3000,
      });
      setTempProfileData(null);
      queryClient.invalidateQueries({
        queryKey: profileKeyFactor.detail(params.user_id!).queryKey,
      });
    } catch (error) {
      open({
        type: "error",
        content: "프로필 설정에 실패했습니다." + error,
        staleTime: 3000,
      });
    }
  };

  const handleResetTempProfile = () => {
    setTempProfileData(null);
  };

  const handleResetProfile = async () => {
    try {
      await resetProfileImage();
      open({
        type: "success",
        content: "기본 프로필 설정에 성공했습니다.",
        staleTime: 3000,
      });
      setIsResetProfileModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: profileKeyFactor.detail(params.user_id!).queryKey,
      });
    } catch (error: unknown) {
      open({
        type: "error",
        content: "기본 프로필 설정에 실패했습니다." + error,
        staleTime: 3000,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="relative my-4 rounded-full shadow-md select-none bg-black/10">
          <If
            condition={hasProfile}
            trueRender={
              <img
                src={
                  isProviderURL(userData?.profile_url ?? "")
                    ? userData!.profile_url
                    : read(userData!.profile_url)
                }
                alt={userData?.username}
                className="object-cover w-full h-full rounded-full"
              />
            }
            falseRender={
              <img
                src={
                  tempProfileData
                    ? URL.createObjectURL(tempProfileData)
                    : defaultProfile
                }
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            }
          />

          <If
            condition={!!tempProfileData}
            trueRender={
              <div className="absolute flex h-10 bg-white rounded-full shadow right-3 bottom-3">
                <button
                  onClick={handleResetTempProfile}
                  type="button"
                  className="flex items-center justify-center mx-2 text-error"
                >
                  <IoMdClose size={20} className="text-black" />
                </button>
                <button
                  onClick={handleUploadProfile}
                  type="button"
                  className="flex items-center justify-center mx-2"
                >
                  <MdDone size={20} className="text-primary" />
                </button>
              </div>
            }
            falseRender={
              <button
                onClick={handleClickInput}
                type="button"
                className="absolute flex items-center justify-center w-10 h-10 rounded-full shadow bg-primary right-3 bottom-3"
              >
                <MdModeEdit size={20} className="text-white" />
              </button>
            }
          />
        </div>
      </div>

      <If
        condition={hasProfile}
        trueRender={
          <button
            type="button"
            className="text-black hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => setIsResetProfileModalOpen(true)}
          >
            기본 프로필 사진으로 설정
          </button>
        }
        falseRender={
          <Blockquote>
            아직 프로필 사진이 등록되지 않았습니다. 프로필 사진을 등록해주세요.
          </Blockquote>
        }
      />

      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleChangeInput}
      />

      <Modal open={isResetProfileModalOpen}>
        <Modal.Header>이 작업은 되돌릴 수 없습니다.</Modal.Header>
        <Modal.Content>
          기본 프로필로 설정 시, 기존의 프로필 사진은
          <strong className="font-bold">
            데이터상 제거되며 복구할 수 없게됩니다.
          </strong>
          <br />
          계속 진행하시겠습니까?
        </Modal.Content>
        <Modal.Footer align="right">
          <Modal.Button
            type="normal"
            onClick={() => setIsResetProfileModalOpen(false)}
          >
            취소
          </Modal.Button>
          <div className="ml-1"></div>
          <Modal.Button type="decline" onClick={handleResetProfile}>
            기본 프로필로 설정
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileUploadForm;
