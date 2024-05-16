import React from "react";

type Props = {
  currentStep: number;
  numberOfSteps: number;
};

const Stepper = ({ currentStep, numberOfSteps }: Props) => {
  const activeColor = (index: number) =>
    currentStep >= index ? "bg-blue-500" : "bg-gray-300";
  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <div className="flex items-center">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`relative w-6 h-6 rounded-full ${activeColor(index)}`}
          >
            <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {index + 1}
            </span>
          </div>
          {isFinalStep(index) ? null : (
            <div className={`w-12 h-1 ${activeColor(index)}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
