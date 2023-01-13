import React from "react";
import { ParentSize } from "@visx/responsive";
import { ComparativeBarChart } from "../ComparativeBarChart";

export const HolderDistribution = ({
  data,
}: {
  data: Array<object> | undefined;
}) => {
  return (
    <div>
      <div className="text-xl font-medium mb-2">Distribution Of Holders</div>
      <div className="md:p-4 card md:border rounded-xl border-gray-150 bg-white">
        <ParentSize>
          {(parent) => (
            <ComparativeBarChart
              height={300}
              width={parent.width}
              data={data}
              axisBottomLabel="Tokens"
              axisLeftLabel="Holders"
              appendCount={true}
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};
