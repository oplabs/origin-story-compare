import React from "react";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "./BarChart";

export const SalesByDay = ({ data }: { data: Array<object> | undefined }) => {
  const data30 = data?.slice(Math.max(data.length - 30, 0));

  return (
    <div>
      <div className="text-xl font-medium mb-2">Sales By Day</div>
      <div className="p-4 card border rounded-xl border-gray-150 bg-white">
        <ParentSize>
          {(parent) => (
            <BarChart
              height={300}
              width={parent.width}
              data={data30?.map((r) => ({ label: r.date, value: r.sales }))}
              axisBottomLabel="Day"
              axisLeftLabel="Sales"
              appendCount={true}
              countFontSize={11}
              axisBottomIsDate
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};
