import { render } from "@testing-library/react";
import Blockquote from "../blockquote";

describe("Blockquote", () => {
  it("자식을 잘 렌더링 해야합니다.", () => {
    // 테스트할 자식 요소
    const childrenText = "This is a quote text";

    const { getByText } = render(<Blockquote>{childrenText}</Blockquote>);

    const renderedChildren = getByText(childrenText);
    expect(renderedChildren).toBeInTheDocument();

    const blockquoteElement = renderedChildren.parentElement;
    expect(blockquoteElement).toHaveClass("p-4");
    expect(blockquoteElement).toHaveClass("my-4");
    expect(blockquoteElement).toHaveClass("bg-blue-100");
    expect(blockquoteElement).toHaveClass("border-l-4");
    expect(blockquoteElement).toHaveClass("border-solid");
    expect(blockquoteElement).toHaveClass("border-primary");
  });
});
