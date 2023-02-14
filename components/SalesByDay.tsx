import React from "react";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "./BarChart";

export const SalesByDay = ({ data }: { data: Array<object> | undefined }) => {
  return (
    <div>
      <div className="text-xl font-medium md:mb-2">Sales By Day</div>
      <div className="md:p-4 card md:border rounded-xl border-gray-150 bg-white">
        <ParentSize>
          {(parent) => (
            <BarChart
              height={300}
              width={parent.width}
              data={data?.map((r) => ({ label: r.date, value: r.sales }))}
              axisBottomLabel="Day"
              axisLeftLabel="Sales"
              axisBottomIsDate
              showGrid
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};
