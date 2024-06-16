import { render, fireEvent } from "@testing-library/react";
import Checkbox from "../checkbox";
import { useState } from "react";

test("Checkbox 컴포넌트 렌더링 및 체크 여부 테스트", () => {
  const CheckboxTest = () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        id="checkbox1"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      >
        Test Checkbox
      </Checkbox>
    );
  };

  const { getByLabelText } = render(<CheckboxTest />);

  const checkbox = getByLabelText("Test Checkbox");
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
