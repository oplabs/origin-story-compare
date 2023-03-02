import React, { FunctionComponent } from "react";
import { ParentSize } from "@visx/responsive";
import { ComparativeBarChart } from "../ComparativeBarChart";
import type { ComparativeSalesByDayData } from "../../types/d.data";

interface HolderDistributionProps {
  data: ComparativeSalesByDayData[];
}

const HolderDistribution: FunctionComponent<HolderDistributionProps> = ({
  data,
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

export { HolderDistribution };
