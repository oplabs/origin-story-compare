import React, { useState, FunctionComponent } from "react";
import { ComparativeAreaChart } from "../ComparativeAreaChart";
import { Range } from "../Range";
import { CreateImageWrapper } from "../CreateImageWrapper";
import { ParentSize } from "@visx/responsive";

interface DataItem {
  label: string;
  value: number;
}
interface Volume {
  dataA: DataItem[];
  dataB: DataItem[];
  imageFooter?: string;
  tweetText?: string;
  dataAKey: string;
  dataBKey: string;
}

export const Volume: FunctionComponent<Volume> = ({
  dataA,
  dataB,
  imageFooter,
  tweetText,
  dataAKey,
  dataBKey,
}) => {
  const [range, setRange] = useState("1M");

  let dataASlice: DataItem[];
  if (range === "3M") {
    dataASlice = dataA?.slice(-90);
  } else if (range === "1M") {
    dataASlice = dataA?.slice(-30);
  } else if (range === "1Y") {
    dataASlice = dataA?.slice(-365);
  } else {
    dataASlice = dataA;
  }

  let dataBSlice: DataItem[];
  if (range === "3M") {
    dataBSlice = dataB?.slice(-90);
  } else if (range === "1M") {
    dataBSlice = dataB?.slice(-30);
  } else if (range === "1Y") {
    dataBSlice = dataB?.slice(-365);
  } else {
    dataBSlice = dataB;
  }

  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center md:mb-2">
        <div className="text-xl font-medium">Volume</div>
        <Range {...{ range, setRange }} />
      </div>
      <CreateImageWrapper footer={imageFooter} tweetText={tweetText} isCombined>
        <div className="md:px-5 md:py-4 rounded-xl card md:border border-gray-150 bg-white">
          <ParentSize>
            {(parent) => (
              <ComparativeAreaChart
                dataA={dataASlice}
                dataB={dataBSlice}
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
