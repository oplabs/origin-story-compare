import React from "react";

export const Range = ({
  range,
  setRange,
}: {
  range: string;
  setRange: (range: string) => void;
}) => {
  const RangeOpt = ({ children }: { children: string }) => {
    const selectedClass = children === range ? " text-white bg-primary" : "";
    return (
      <div
        onClick={() => setRange(children)}
        className={`rounded leading-7 py-0 px-2${selectedClass} cursor-pointer border border-transparent hover:border-primary`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="flex gap-1 text-sm">
      <RangeOpt>1M</RangeOpt>
      <RangeOpt>3M</RangeOpt>
      <RangeOpt>1Y</RangeOpt>
      <RangeOpt>All</RangeOpt>
    </div>
  );
};
