import React, { FunctionComponent } from "react";
import { ComparativeAreaChart } from "../ComparativeAreaChart";
import { CreateImageWrapper } from "../CreateImageWrapper";
import { ParentSize } from "@visx/responsive";
import type { DataItem } from "../../types/d.data";
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
                showLeftAxis
                leftAxisLabel="Sales"
              />
            )}
          </ParentSize>
        </div>
      </CreateImageWrapper>
    </div>
  );
};
