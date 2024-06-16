import { fireEvent, render } from "@testing-library/react";
import Button from "../button";

describe("Button 컴포넌트 테스트", () => {
  it("기본 속성으로 렌더링되는지 확인", () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonElement = getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
    expect(buttonElement).toHaveClass("cursor-pointer");
    expect(buttonElement).toHaveClass("font-medium");
    expect(buttonElement).toHaveClass("rounded-lg");
    expect(buttonElement).toHaveClass("text-sm");
    expect(buttonElement).toHaveClass("px-5");
    expect(buttonElement).toHaveClass("py-2.5");
    expect(buttonElement).toHaveClass("bg-primary");
    expect(buttonElement).toHaveClass("text-white");
  });

  it("intent 속성에 따라 다른 클래스가 적용되는지 확인", () => {
    const { getByText } = render(<Button intent="success">Click me</Button>);
    const buttonElement = getByText("Click me");

    expect(buttonElement).toHaveClass("bg-success");
    expect(buttonElement).toHaveClass("text-white");
  });

  it("클릭 이벤트가 발생하는지 확인", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const buttonElement = getByText("Click me");

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("비활성화 상태일 때 disabled 스타일이 적용되는지 확인", () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    const buttonElement = getByText("Click me");

    expect(buttonElement).toHaveClass("disabled:bg-gray-300");
    expect(buttonElement).toHaveClass("disabled:cursor-not-allowed");
    expect(buttonElement).toHaveClass("disabled:opacity-50");
  });
});
