import React, { useState } from "react";
import Image from "next/image";
import { AreaChart, AreaChartHeader } from "./AreaChart";
import { Range } from "./Range";
import { CreateImageWrapper } from "./CreateImageWrapper";

interface AllSalesByDay {
  byDay: SalesByDay[];
  stats: object;
  imageFooter?: string;
}

interface SalesByDay {
  date: string;
  averagePrice: number;
  value: number;
}

export const AveragePrice = ({
  allSalesByDay,
  imageFooter,
}: {
  allSalesByDay: AllSalesByDay;
  imageFooter?: string;
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
  salesByDay = salesByDay?.map(({ date, averagePrice }) => ({
    date,
    averagePrice,
    value: Math.round(averagePrice * 10000) / 10000,
  }));

  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-medium">Average Price</div>
        <Range {...{ range, setRange }} />
      </div>
      <CreateImageWrapper footer={imageFooter}>
        <div className="px-5 py-4 rounded-xl card border border-gray-150 bg-white">
          <AreaChartHeader description="All time average price">
            <Image
              src="/eth-icon.svg"
              alt="All time average price"
              width={12}
              height={12}
            />
            <span className="ml-2 text-primary">
              {`${Math.round(allSalesByDay.stats.avg * 10000) / 10000}`}
            </span>
          </AreaChartHeader>
          <AreaChart data={salesByDay} />
        </div>
      </CreateImageWrapper>
    </div>
  );
};
