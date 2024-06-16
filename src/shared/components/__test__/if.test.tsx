import { render } from "@testing-library/react";
import If from "../if";

describe("If 컴포넌트", () => {
  it("조건이 true일 때 trueRender를 렌더링합니다", () => {
    const trueRenderContent = "True Content";

    // If 컴포넌트를 렌더링하고, true 조건으로 설정하여 trueRender를 확인합니다.
    const { getByText, queryByText } = render(
      <If condition={true} trueRender={<div>{trueRenderContent}</div>} />
    );

    // trueRenderContent가 렌더링되었는지 확인합니다.
    const renderedTrueContent = getByText(trueRenderContent);
    expect(renderedTrueContent).toBeInTheDocument();

    // falseRenderContent가 렌더링되지 않았는지 확인합니다.
    const renderedFalseContent = queryByText("False Content");
    expect(renderedFalseContent).toBeNull();
  });

  it("조건이 false일 때 falseRender를 렌더링합니다", () => {
    const falseRenderContent = "False Content";

    // If 컴포넌트를 렌더링하고, false 조건으로 설정하여 falseRender를 확인합니다.
    const { getByText, queryByText } = render(
      <If condition={false} falseRender={<div>{falseRenderContent}</div>} />
    );

    // falseRenderContent가 렌더링되었는지 확인합니다.
    const renderedFalseContent = getByText(falseRenderContent);
    expect(renderedFalseContent).toBeInTheDocument();

    // trueRenderContent가 렌더링되지 않았는지 확인합니다.
    const renderedTrueContent = queryByText("True Content");
    expect(renderedTrueContent).toBeNull();
  });
});
