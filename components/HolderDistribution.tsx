import React from "react";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "./BarChart";

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
            <BarChart
              height={300}
              width={parent.width}
              data={data?.map((r) => ({ label: r[0], value: r[1] }))}
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
