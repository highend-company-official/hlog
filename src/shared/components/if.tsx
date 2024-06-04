import * as React from "react";

type Props = {
  trueRender?: React.ReactNode;
  falseRender?: React.ReactNode;
  condition: boolean;
};

const If = ({ condition, trueRender, falseRender }: Props) => {
  if (condition) return <>{trueRender}</>;
  else return <>{falseRender}</>;
};

export default If;
