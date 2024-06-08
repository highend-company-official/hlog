import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { useParams } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

import { profileKeyFactor, usePatchProfileInfo } from "@/entities/profile";
import { Button, If, useFetchUser, useToast } from "@/shared";

type InfoInputProps = {
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InfoInput = forwardRef<HTMLInputElement, InfoInputProps>(
  ({ icon, label, ...props }, ref) => {
    return (
      <>
        <label
          className="block mb-2 text-sm font-medium text-black"
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
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
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

const UserInfoSettingForm = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ user_id: string }>();
  const { open } = useToast();
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

    open({
      type: "success",
      content: "프로필 정보 설정을 완료했습니다.",
      staleTime: 3000,
    });
    queryClient.invalidateQueries({
      queryKey: profileKeyFactor.detail(params.user_id!).queryKey,
    });
    setIsEditInfo(false);
  };

  useEffect(() => {
    setIsEditInfo(isDirty);
  }, [isDirty]);

  return (
    <>
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

      <If
        condition={isEditInfo}
        trueRender={
          <Button
            className="w-full"
            disabled={isPending}
            onClick={handleEditProfileInfo}
          >
            수정하기
          </Button>
        }
      />
    </>
  );
};

export default UserInfoSettingForm;
