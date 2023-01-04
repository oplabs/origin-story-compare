import React, { useState } from "react";
import { ComparativeAreaChart } from "./ComparativeAreaChart";
import { Range } from "../Range";
import { CreateImageWrapper } from "../CreateImageWrapper";
import { formatNumber } from "../../lib/utils";
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
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-medium">Sales</div>
        <Range {...{ range, setRange }} />
      </div>
      <CreateImageWrapper footer={imageFooter}>
        <div className="px-5 py-4 rounded-xl card border border-gray-150 bg-white">
          <ParentSize>
            {(parent) => (
              <ComparativeAreaChart
                data={salesByDay}
                parentWidth={parent.width}
              />
            )}
          </ParentSize>
        </div>
      </CreateImageWrapper>
    </div>
  );
};
