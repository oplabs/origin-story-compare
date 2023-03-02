import React, { FunctionComponent } from "react";
import { ParentSize } from "@visx/responsive";
import { ComparativeBarChart } from "../ComparativeBarChart";
import { ComparativeSalesByDayData } from "../../types/d.data";

interface AveragePriceByDayProps {
  data: ComparativeSalesByDayData[];
}

const AveragePriceByDay: FunctionComponent<AveragePriceByDayProps> = ({
  data,
}) => {
  return (
    <div>
      <div className="text-xl font-medium mb-2">Average Price By Day</div>
      <div className="md:p-4 card md:border rounded-xl border-gray-150 bg-white">
        <ParentSize>
          {(parent) => (
            <ComparativeBarChart
              height={300}
              width={parent.width}
              data={data}
              axisBottomLabel="Day"
              axisLeftLabel="Price (ETH)"
              appendCount={false}
              countFontSize={11}
              axisBottomIsDate={true}
              showGrid
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export { AveragePriceByDay };
