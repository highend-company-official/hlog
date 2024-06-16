import { render } from "@testing-library/react";
import Stepper from "../stepper";

test("Stepper 컴포넌트 렌더링 및 단계 표시 테스트", () => {
  const { container } = render(<Stepper currentStep={2} numberOfSteps={5} />);

  const stepIndicators = container.querySelectorAll(".rounded-full");
  expect(stepIndicators.length).toBe(5);

  stepIndicators.forEach((step, index) => {
    const stepNumber = index + 1;
    expect(step.textContent).toBe(stepNumber.toString());
    if (index < 4) {
      const connector = container.querySelector(".w-12");
      expect(connector).toBeInTheDocument();
    }
  });
});
