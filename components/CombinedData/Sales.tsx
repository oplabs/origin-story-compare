import React, { useState, FunctionComponent } from "react";
import { ComparativeAreaChart } from "../ComparativeAreaChart";
import { Range } from "../Range";
import { CreateImageWrapper } from "../CreateImageWrapper";
import { ParentSize } from "@visx/responsive";

interface DataItem {
  label: string;
  value: number;
}
interface Sales {
  dataA: DataItem[];
  dataB: DataItem[];
  imageFooter?: string;
  tweetText?: string;
  dataAKey: string;
  dataBKey: string;
}

export const Sales: FunctionComponent<Sales> = ({
  dataA,
  dataB,
  imageFooter,
  tweetText,
  dataAKey,
  dataBKey,
}) => {
  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center md:mb-2">
        <div className="text-xl font-medium">Sales</div>
      </div>
      <CreateImageWrapper footer={imageFooter} tweetText={tweetText} isCombined>
        <div className="md:px-5 md:py-4 rounded-xl card md:border border-gray-150 bg-white">
          <ParentSize>
            {(parent) => (
              <ComparativeAreaChart
                dataA={dataA}
                dataB={dataB}
                dataAKey={dataAKey}
                dataBKey={dataBKey}
                parentWidth={parent.width}
              />
            )}
          </ParentSize>
        </div>
      </CreateImageWrapper>
    </div>
  );
};
