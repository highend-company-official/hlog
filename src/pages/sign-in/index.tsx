import * as shared from "@/shared";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <>
      <shared.Button>로그인</shared.Button>

      <Link to="/auth/sign-up">회원가입 하러가기</Link>
    </>
  );
}

export default SignInPage;
