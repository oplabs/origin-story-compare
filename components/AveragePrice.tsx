import React from "react";
import { AreaChart } from "./AreaChart";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { ParentSize } from "@visx/responsive";
import type { SalesByDayDataItem, DataItem } from "../types/d.data";

export const AveragePrice = ({
  data,
  imageFooter,
  tweetText,
}: {
  data: SalesByDayDataItem[];
  imageFooter?: string;
  tweetText?: string;
}) => {
  let salesByDay: DataItem[] = [];

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
      <CreateImageWrapper footer={imageFooter} tweetText={tweetText}>
        <div className="md:px-5 md:py-4 rounded-xl card md:border border-gray-150 bg-white">
          <ParentSize>
            {(parent) => (
              <AreaChart
                data={salesByDay}
                parentWidth={parent.width}
                showLeftAxis
                leftAxisLabel="Average Price (ETH)"
              />
            )}
          </ParentSize>
        </div>
      </CreateImageWrapper>
    </div>
  );
};
