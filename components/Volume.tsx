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
  data,
  imageFooter,
  totalVolume,
  tweetText,
}: {
  data: AllSalesByDay;
  imageFooter?: string;
  totalVolume: number;
  tweetText?: string;
}) => {
  let salesByDay: SalesByDay[] = [];

  salesByDay = data?.map(({ date, ethVolume }) => ({
    date,
    ethVolume,
    value: Math.round(ethVolume * 10000) / 10000,
  }));

  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center md:mb-2">
        <div className="text-xl font-medium">Volume</div>
      </div>
      <CreateImageWrapper footer={imageFooter} tweetText={tweetText}>
        <div className="md:px-5 md:py-4 rounded-xl card md:border border-gray-150 bg-white">
          {/*<AreaChartHeader description="All time total volume">
            <Image
              src="/eth-icon.svg"
              alt="All time total volume"
              width={12}
              height={12}
            />
            <span className="ml-2 text-primary">{totalVolume}</span>
  </AreaChartHeader>*/}
          <ParentSize>
            {(parent) => (
              <AreaChart
                data={salesByDay}
                parentWidth={parent.width}
                showLeftAxis
                leftAxisLabel="Volume (ETH)"
              />
            )}
          </ParentSize>
        </div>
      </CreateImageWrapper>
    </div>
  );
};
