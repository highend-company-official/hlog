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
  useFetchUser,
  useProfile,
  useToast,
} from "@/shared";

import ProfileImageContainer from "./profile-image-container";

const ProfileUploadForm = () => {
  const params = useParams<{ user_id: string }>();
  const queryClient = useQueryClient();

  const { data: userData } = useFetchUser(params.user_id!);
  const profileData = useProfile(params.user_id!);

  const { open } = useToast();
  const { mutateAsync: uploadProfileImage } = usePatchProfileImage(
    params.user_id!
  );
  const { mutateAsync: resetProfileImage } = usePatchProfileImageReset(
    params.user_id!,
    userData!.profile_url!
  );

  const [isResetProfileModalOpen, setIsResetProfileModalOpen] = useState(false);

  const hasProfile = !!userData?.profile_url;

  const handleUploadProfile = async (file: File) => {
    try {
      await uploadProfileImage(file);
      open({
        type: "success",
        content: "프로필 설정에 성공했습니다.",
        staleTime: 3000,
      });
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

  if (!profileData) return null;

  return (
    <>
      <div className="flex justify-center">
        <div className="relative my-4 rounded-full shadow-md select-none bg-black/10">
          <ProfileImageContainer
            src={profileData.profile_url}
            alt={profileData.username}
            onUpload={handleUploadProfile}
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
