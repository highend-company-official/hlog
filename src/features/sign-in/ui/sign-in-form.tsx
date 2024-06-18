import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";

import * as shared from "@/shared";
import { authKeyFactor, signIn } from "@/entities/auth";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { open } = shared.useToast();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = handleSubmit(async (data) => {
    const { email, password } = data;
    setIsLoading(true);

    try {
      const { error } = await signIn.withEmail({ email, password });

      console.log(error?.message);
      if (error?.message === "Email not confirmed") {
        open({
          type: "warning",
          content: "아직 이메일 인증이 되지 않았습니다.",
          hasCloseButton: true,
        });
      }

      if (error?.message === "Invalid login credentials") {
        open({
          type: "warning",
          content: "로그인 정보가 맞지 않습니다. 다시 시도해주세요.",
          hasCloseButton: true,
        });
      }

      if (!error) {
        queryClient.refetchQueries({
          queryKey: authKeyFactor.session.queryKey,
        });

        open({
          type: "success",
          content: "로그인에 성공했습니다!",
          hasCloseButton: true,
          staleTime: 3000,
        });

        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      open({
        type: "error",
        content: "문제가 발생했습니다.",
        hasCloseButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  });

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn.withGithub();
    } catch (error) {
      open({
        type: "error",
        content: "문제가 발생했습니다.",
        hasCloseButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleEmailSignIn}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-black"
        >
          이메일 (Email)
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="example@mail.com"
          required
          {...register("email")}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          required
          {...register("password")}
        />
      </div>
      <shared.Button type="submit" disabled={isLoading} className="w-full">
        로그인
      </shared.Button>

      <shared.Divider>또는</shared.Divider>

      <button
        type="button"
        disabled={isLoading}
        className="flex items-center justify-center w-full px-4 py-3 mt-2 text-sm font-bold text-gray-100 transition ease-in-out bg-gray-900 rounded-lg cursor-pointer disabled:bg-gray-900/50 disabled:cursor-not-allowed disabled:text-white/50"
        onClick={handleGithubSignIn}
      >
        <FaGithub size={26} />
        <span className="pl-3">Github로 로그인하기</span>
      </button>

      <p className="text-sm font-light text-gray-500 ">
        아직 계정이 없으신가요?
        <Link
          to="/auth/sign-up"
          className="font-medium text-primary-600 hover:underline"
        >
          회원가입
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
