import * as shared from "@/shared";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <>
      <shared.Button>회원가입</shared.Button>

      <Link to="/auth/sign-in">로그인 하러가기</Link>
    </>
  );
}

export default SignUpPage;
