import React from "react";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "./BarChart";

export const HolderDistribution = ({
  data,
}: {
  data: {
    name: string;
    value: number;
  }[];
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
              data={data?.map((d) => ({ label: d?.name, value: d?.value }))}
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
