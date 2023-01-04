import React, { useState } from "react";
import Image from "next/image";
import { AreaChart, AreaChartHeader } from "./AreaChart";
import { Range } from "./Range";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { ParentSize } from "@visx/responsive";

interface AllSalesByDay {
  byDay: SalesByDay[];
  stats: object;
}

interface SalesByDay {
  date: string;
  ethVolume: number;
  value: number;
}

export const Volume = ({
  allSalesByDay,
  imageFooter,
  totalVolume,
}: {
  allSalesByDay: AllSalesByDay;
  imageFooter?: string;
  totalVolume: number;
}) => {
  const [range, setRange] = useState("1M");

  let salesByDay: SalesByDay[];
  if (range === "3M") {
    salesByDay = allSalesByDay?.byDay.slice(-90);
  } else if (range === "1M") {
    salesByDay = allSalesByDay?.byDay.slice(-30);
  } else if (range === "1Y") {
    salesByDay = allSalesByDay?.byDay.slice(-365);
  } else {
    salesByDay = allSalesByDay?.byDay;
  }
  salesByDay = salesByDay?.map(({ date, ethVolume }) => ({
    date,
    ethVolume,
    value: Math.round(ethVolume * 10000) / 10000,
  }));

  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-medium">Volume</div>
        <Range {...{ range, setRange }} />
      </div>
      <CreateImageWrapper footer={imageFooter}>
        <div className="px-5 py-4 rounded-xl card border border-gray-150 bg-white">
          <AreaChartHeader description="All time total volume">
            <Image
              src="/eth-icon.svg"
              alt="All time total volume"
              width={12}
              height={12}
            />
            <span className="ml-2 text-primary">{totalVolume}</span>
          </AreaChartHeader>
          <ParentSize>
            {(parent) => (
              <AreaChart data={salesByDay} parentWidth={parent.width} />
            )}
          </ParentSize>
        </div>
      </CreateImageWrapper>
    </div>
  );
};
