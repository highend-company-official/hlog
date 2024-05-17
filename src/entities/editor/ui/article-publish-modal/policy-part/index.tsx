import { Checkbox, Divider } from "@/shared";

type Props = {
  value: boolean;
  onChange: () => void;
};

const PolicyPart = ({ value, onChange }: Props) => {
  return (
    <>
      <div className="my-4 font-bold ">글 발행 전에 확인해주세요!</div>

      <li className="text-base leading-9">
        개인정보를 포함한 내용을 작성했는지 확인해주세요.
      </li>
      <li className="text-base leading-9">
        테크 목적이 아닌 용도로 작성한 글은 삭제될 수 있습니다.
      </li>
      <li className="text-base leading-9">
        남을 비방하는 내용이 포함되는 경우 삭제될 수 있습니다.
      </li>
      <li className="text-base leading-9">
        위 기재된 내용 외에 부적절하다고 판단되는 글은 검토 후 삭제조치됩니다.
      </li>

      <div className="my-4">
        <Divider />
      </div>

      <Checkbox checked={value} onChange={onChange} id="agree-all">
        위 내용을 숙지하였고 동의합니다.
      </Checkbox>
    </>
  );
};

export default PolicyPart;
