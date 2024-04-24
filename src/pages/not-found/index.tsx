import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center flex-grow min-h-screen bg-gray-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-xl w-96">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">찾으려는 페이지가 없습니다.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          뒤로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
