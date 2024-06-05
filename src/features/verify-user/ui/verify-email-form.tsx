import { z } from "zod";
import { useForm } from "react-hook-form";
import { PiSealCheckFill } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared";

const emailSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
});
type FormValue = z.infer<typeof emailSchema>;
const VerifyEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValue>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: FormValue) => {
    console.log("Email Submitted: ", data);
  };

  return (
    <div className="sticky top-20 rounded-md shadow-md p-4 flex items-center flex-col text-black mx-auto">
      <PiSealCheckFill size={80} className="text-primary" />
      <h3 className="text-base">
        유저 인증을 요청하여 아래 기능들을 사용해보세요.
      </h3>
      <ul className="list-disc mt-3 text-sm">
        <li>아티클 이미지 업로드 가능</li>
        <li>유저 프로필에 Vertified 마크 제공</li>
      </ul>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mt-6 w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdOutlineMailOutline />
          </div>
          <input
            type="text"
            id={`email`}
            placeholder="Your Email"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            {...register("email", {
              required: true,
            })}
          />
        </div>

        <Button className="mt-3 w-full" disabled={!isValid}>
          제출
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
