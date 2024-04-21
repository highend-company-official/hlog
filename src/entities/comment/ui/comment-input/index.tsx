import { Button } from "@/shared";

const CommentInput = () => {
  return (
    <>
      <form className="p-2 mx-auto mt-10 bg-white border rounded-lg">
        <div className="mt-2 mb-2">
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-4 outline-none"
            placeholder="댓글을 입력해주세요..."
          />
        </div>
        <Button
          type="submit"
          className="py-1.5 rounded-md text-white text-sm w-full"
        >
          Comment
        </Button>
      </form>

      <p className="text-xs text-center text-gray-500 ms-auto">
        상대방을 향한 비난이나 욕설은 차단 등의 조치가 취해질 수 있습니다.
      </p>
    </>
  );
};

export default CommentInput;
