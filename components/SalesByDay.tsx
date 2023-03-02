import React, { FunctionComponent } from "react";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "./BarChart";
import type { SalesByDayDataItem } from "../types/d.data";

interface SalesByDayProps {
  data: SalesByDayDataItem[];
}

const SalesByDay: FunctionComponent<SalesByDayProps> = ({ data }) => {
  return (
    <div>
      <div className="text-xl font-medium md:mb-2">Sales By Day</div>
      <div className="md:p-4 card md:border rounded-xl border-gray-150 bg-white">
        <ParentSize>
          {(parent) => (
            <BarChart
              height={300}
              width={parent.width}
              data={data?.map((d) => ({ label: d.date, value: d.sales }))}
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

export { SalesByDay };
