import React, { FunctionComponent } from "react";
import { ParentSize } from "@visx/responsive";
import { BarChart } from "./BarChart";
import type { SalesByDayDataItem } from "../types/d.data";
interface VolumeByDayProps {
  data: SalesByDayDataItem[];
}

const VolumeByDay: FunctionComponent<VolumeByDayProps> = ({ data }) => {
  return (
    <div>
      <div className="text-xl font-medium md:mb-2">Volume By Day</div>
      <div className="md:p-4 card md:border rounded-xl border-gray-150 bg-white">
        <ParentSize>
          {(parent) => (
            <BarChart
              height={300}
              width={parent.width}
              data={data?.map((d) => ({ label: d.date, value: d.ethVolume }))}
              axisBottomLabel="Day"
              axisLeftLabel="Volume (ETH)"
              axisBottomIsDate
              showGrid
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export { VolumeByDay };
