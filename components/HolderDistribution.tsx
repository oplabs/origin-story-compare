import React from "react";
import { ParentSize } from "@visx/responsive";

import { formatNumber } from "../lib/utils";

import { BarChart } from "./BarChart";

export const HolderDistribution = ({
  data,
}: {
  data: Array<object> | undefined;
}) => {
  return (
    <div>
      <div className="text-xl font-medium mb-2">Distribution of holders</div>
      <div className="p-4 card border rounded-xl border-gray-150 dark:border-dark-700 bg-white dark:bg-black">
        <ParentSize>
          {(parent) => (
            <BarChart
              height={300}
              width={parent.width}
              data={data?.map((r) => ({ label: r[0], value: r[1] }))}
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};
