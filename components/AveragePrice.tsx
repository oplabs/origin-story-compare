import React, { useState } from "react";
import Image from "next/image";
import { AreaChart, AreaChartHeader } from "./AreaChart";
import { Range } from "./Range";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { ParentSize } from "@visx/responsive";

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
  data,
  imageFooter,
}: {
  data: AllSalesByDay;
  imageFooter?: string;
}) => {
  let salesByDay: SalesByDay[];

  salesByDay = data?.map(({ date, averagePrice }) => ({
    date,
    averagePrice,
    value: Math.round(averagePrice * 10000) / 10000,
  }));

  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center md:mb-2">
        <div className="text-xl font-medium">Average Price</div>
      </div>
      <CreateImageWrapper footer={imageFooter}>
        <div className="md:px-5 md:py-4 rounded-xl card md:border border-gray-150 bg-white">
          {/*<AreaChartHeader description="All time average price">
            <Image
              src="/eth-icon.svg"
              alt="All time average price"
              width={12}
              height={12}
            />
            <span className="ml-2 text-primary">
              {`${Math.round(allSalesByDay?.stats?.avg * 10000) / 10000}`}
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
