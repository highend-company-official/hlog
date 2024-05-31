import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-grow min-h-screen bg-gray-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-xl w-96">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">찾으려는 페이지가 없습니다.</p>
        <div
          onClick={() => navigate(-1)}
          className="inline-block px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          뒤로 돌아가기
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
