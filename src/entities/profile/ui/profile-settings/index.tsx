import React, { Suspense, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { MdOutlineMailOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaUserSlash } from "react-icons/fa";
import { IoMdClose, IoIosLink } from "react-icons/io";
import { MdModeEdit, MdDone } from "react-icons/md";

import defaultProfile from "@/shared/assets/default-profile.jpg";

import * as features from "@/features";
import * as shared from "@/shared";

import { Blockquote, Modal, useFetchUser } from "@/shared";
import { useParams } from "react-router-dom";

import {
  usePatchProfileImage,
  usePatchProfileImageReset,
  usePatchProfileInfo,
} from "../../lib";
import { useToastStore } from "@/app/store";
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";

const ProfileSettingSection = () => {
  const params = useParams<{ user_id: string }>();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { read } = shared.useBucket("profiles");

  const { addToast } = useToastStore();
  const { data: userData } = useFetchUser(params.user_id!);
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
      addToast({
        type: "success",
        content: "프로필 설정에 성공했습니다.",
        staleTime: 3000,
      });
      setTempProfileData(null);
      queryClient.invalidateQueries({
        queryKey: [shared.QUERY_CONSTS.USER, params.user_id!],
      });
    } catch (error) {
      addToast({
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
      addToast({
        type: "success",
        content: "기본 프로필 설정에 성공했습니다.",
        staleTime: 3000,
      });
      setIsResetProfileModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: [shared.QUERY_CONSTS.USER, params.user_id!],
      });
    } catch (error: unknown) {
      addToast({
        type: "error",
        content: "기본 프로필 설정에 실패했습니다." + error,
        staleTime: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[500px]">
      <div className="flex">
        <div className="relative w-64 h-64 my-4 rounded-full shadow-md select-none bg-black/10">
          <shared.If
            condition={hasProfile}
            trueRender={
              <img
                src={(userData && read(userData.profile_url!)) ?? ""}
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

          <shared.If
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

      <shared.If
        condition={hasProfile}
        trueRender={
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

      <shared.If
        condition={isResetProfileModalOpen}
        trueRender={
          <shared.Modal>
            <shared.Modal.Header>
              이 작업은 되돌릴 수 없습니다.
            </shared.Modal.Header>
            <shared.Modal.Content>
              기본 프로필로 설정 시, 기존의 프로필 사진은
              <strong className="font-bold">
                데이터상 제거되며 복구할 수 없게됩니다.
              </strong>
              <br />
              계속 진행하시겠습니까?
            </shared.Modal.Content>
            <shared.Modal.Footer align="right">
              <shared.Modal.Button
                type="normal"
                onClick={() => setIsResetProfileModalOpen(false)}
              >
                취소
              </shared.Modal.Button>
              <div className="ml-1"></div>
              <shared.Modal.Button type="decline" onClick={handleResetProfile}>
                기본 프로필로 설정
              </shared.Modal.Button>
            </shared.Modal.Footer>
          </shared.Modal>
        }
      />
    </div>
  );
};

type InfoInputProps = {
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InfoInput = React.forwardRef<HTMLInputElement, InfoInputProps>(
  ({ icon, label, ...props }, ref) => {
    return (
      <>
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor={`${label}-input`}
        >
          {label}
        </label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {icon}
          </div>
          <input
            type="text"
            id={`${label}-input`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            ref={ref}
            {...props}
          />
        </div>
      </>
    );
  }
);

type FormType = {
  email: string;
  phone: string;
  link: string;
};

const UserInfoSettingSection = () => {
  const params = useParams<{ user_id: string }>();
  const { addToast } = useToastStore();
  const { data: userData } = useFetchUser(params.user_id!);
  const { mutateAsync: patchProfileInfo, isPending } = usePatchProfileInfo(
    params.user_id!
  );
  const {
    register,
    formState: { isDirty },
    getValues,
  } = useForm<FormType>({
    defaultValues: {
      email: userData?.email ?? "",
      link: userData?.link ?? "",
      phone: userData?.phone ?? "",
    },
  });
  const [isEditInfo, setIsEditInfo] = useState(false);

  const handleEditProfileInfo = async () => {
    await patchProfileInfo(getValues());

    addToast({
      type: "success",
      content: "프로필 정보 설정을 완료했습니다.",
      staleTime: 3000,
    });
    setIsEditInfo(false);
  };

  useEffect(() => {
    setIsEditInfo(isDirty);
  }, [isDirty]);

  return (
    <div className="w-[300px]">
      <InfoInput
        icon={<MdOutlineMailOutline />}
        label="Email"
        placeholder="example@example.com"
        {...register("email")}
      />
      <InfoInput
        icon={<FaPhoneAlt />}
        label="Phone"
        placeholder="010-XXXX-XXXX"
        {...register("phone")}
      />
      <InfoInput
        icon={<IoIosLink />}
        label="Link"
        placeholder="https://XXXXX.XXX"
        {...register("link")}
      />

      <shared.If
        condition={isEditInfo}
        trueRender={
          <shared.Button
            className="w-full"
            disabled={isPending}
            onClick={handleEditProfileInfo}
          >
            수정하기
          </shared.Button>
        }
      />
    </div>
  );
};

const OptionsSection = () => {
  return (
    <div className="flex flex-col">
      <shared.Switch
        name="dark-mode"
        label="다크모드 설정 (🛠️ 다크 모드는 시험용 기능입니다.)"
      />

      <div className="my-2" />
    </div>
  );
};

const AuthSection = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    await features.auth.signOut();

    queryClient.refetchQueries({
      queryKey: [shared.QUERY_CONSTS.SESSION, shared.QUERY_CONSTS.USER],
    });
  };

  const handleDeleteUser = async () => {
    try {
      await features.auth.quit();
      await features.auth.signOut();

      queryClient.refetchQueries({
        queryKey: [shared.QUERY_CONSTS.SESSION, shared.QUERY_CONSTS.USER],
      });
      addToast({
        type: "success",
        content: "회원탈퇴가 정상적으로 진행되었습니다.",
      });
    } catch (error) {
      addToast({
        type: "error",
        content: "회원 탈퇴 과정중 오류가 발생했습니다.",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-end justify-center">
        <button
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          onClick={handleSignOut}
        >
          로그아웃
          <CiLogout className="ml-3" size={20} />
        </button>
        <button
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          onClick={() => setIsModalOpen(true)}
        >
          회원탈퇴
          <FaUserSlash className="ml-3" size={20} />
        </button>
      </div>

      <shared.If
        condition={isModalOpen}
        trueRender={
          <Modal>
            <Modal.Header>정말로 회원탈퇴 하시겠습니까?</Modal.Header>
            <Modal.Content>이 작업은 되돌릴 수 없습니다.</Modal.Content>
            <Modal.Footer align="right">
              <Modal.Button onClick={() => setIsModalOpen(false)}>
                닫기
              </Modal.Button>
              <div className="ml-2" />
              <Modal.Button onClick={handleDeleteUser} type="decline">
                탈퇴
              </Modal.Button>
            </Modal.Footer>
          </Modal>
        }
      />
    </>
  );
};

export type Options = {
  isDarkMode: boolean;
  editorConfig: null;
};

const ProfileSettings = () => {
  return (
    <>
      <Suspense fallback={<shared.Skeleton height={300} />}>
        <div className="flex pb-8">
          <ProfileSettingSection />

          <div className="mx-4 border-r border-gray-300 border-solid" />

          <UserInfoSettingSection />
        </div>
      </Suspense>

      <Suspense fallback={<shared.Skeleton height={500} />}>
        <div className="mt-4" />
        <OptionsSection />
      </Suspense>

      <AuthSection />
    </>
  );
};

export default ProfileSettings;
