import React, { useState } from "react";
import Image from "next/image";
import { AreaChart, AreaChartHeader } from "./AreaChart";
import { Range } from "./Range";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { formatNumber } from "../lib/utils";
import { ParentSize } from "@visx/responsive";
interface AllSalesByDay {
  byDay: SalesByDay[];
  stats: object;
  imageFooter?: string;
}

interface SalesByDay {
  date: string;
  sales: number;
  value: number;
}

export const Sales = ({
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
  salesByDay = salesByDay?.map(({ date, sales }) => ({
    date,
    sales,
    value: Math.round(sales * 10000) / 10000,
  }));

  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center md:mb-2">
        <div className="text-xl font-medium">Sales</div>
        <Range {...{ range, setRange }} />
      </div>
      <CreateImageWrapper footer={imageFooter}>
        <div className="md:px-5 md:py-4 rounded-xl card md:border border-gray-150 bg-white">
          {/*<AreaChartHeader description="All time total sales">
            <Image
              src="/eth-icon.svg"
              alt="All time total sales"
              width={12}
              height={12}
            />
            <span className="ml-2 text-primary">
              {`${formatNumber(
                Math.round(allSalesByDay?.stats?.sum * 10000) / 10000
              )}`}
            </span>
              </AreaChartHeader>*/}
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
