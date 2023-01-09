import React from "react";
import { curveCardinal } from "@visx/curve";
import {
  Axis,
  Grid,
  AreaSeries,
  XYChart,
  buildChartTheme,
} from "@visx/xychart";
import { LegendOrdinal } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";

interface DataItem {
  date: Date;
  value: number;
}

const accessors = {
  xAccessor: (d: DataItem) => d.date,
  yAccessor: (d: DataItem) => d.value,
};

export const ComparativeAreaChart = ({
  dataA,
  dataB,
  showLeftAxis,
  parentWidth,
  dataAKey,
  dataBKey,
}: {
  showLeftAxis?: boolean;
  parentWidth?: number;
  dataA: DataItem[];
  dataB: DataItem[];
  dataAKey: string;
  dataBKey: string;
}) => {
  const customTheme = buildChartTheme({
    backgroundColor: "#fff",
    colors: ["hsl(var(--p))", "hsl(var(--b))"],
    tickLength: 0,
    gridColor: "rgba(0, 0, 0, 0.15)",
    gridColorDark: "rgba(0, 0, 0, 0.15)",
  });

  const height = 220;

  const colorScale = scaleOrdinal<string, string>({
    domain: [dataAKey, dataBKey],
    range: ["hsl(var(--p))", "hsl(var(--n))"],
  });

  return (
    <div className="pt-8">
      <XYChart
        height={height}
        margin={{ top: 20, right: 0, bottom: 25, left: showLeftAxis ? 40 : 0 }}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
        theme={customTheme}
        width={showLeftAxis && parentWidth ? parentWidth - 20 : undefined}
      >
        <Axis
          orientation="bottom"
          numTicks={6}
          hideAxisLine
          hideTicks
          top={height - 20}
          tickLabelProps={() => ({
            fontSize: 10,
            fontWeight: 400,
            fill: "#000",
            textAnchor: "middle",
            verticalAnchor: "middle",
          })}
          tickFormat={(d) => {
            if (d === dataA[0].date) return "";
            return d.slice(5).replace("-", "/");
          }}
        />
        {showLeftAxis && (
          <Axis
            orientation="left"
            numTicks={6}
            hideAxisLine
            hideTicks
            left={35}
            tickLabelProps={() => ({
              fontSize: 10,
              fontWeight: 400,
              fill: "#000",
              textAnchor: "end",
              verticalAnchor: "end",
            })}
          />
        )}
        <Grid columns={false} numTicks={4} />
        <AreaSeries
          dataKey={dataAKey}
          data={dataA}
          curve={curveCardinal}
          fillOpacity={0.1}
          lineProps={{ strokeWidth: 3, stroke: "hsl(var(--p))" }}
          {...accessors}
          width={showLeftAxis && parentWidth ? parentWidth - 30 : undefined}
        />
        <AreaSeries
          dataKey={dataBKey}
          data={dataB}
          curve={curveCardinal}
          fillOpacity={0.1}
          lineProps={{ strokeWidth: 3, stroke: "hsl(var(--n))" }}
          {...accessors}
          width={showLeftAxis && parentWidth ? parentWidth - 30 : undefined}
        />
      </XYChart>
      <div className="absolute top-4 right-2 text-sm text-neutral">
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div>
    </div>
  );
};

export const AreaChartHeader = ({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) => {
  return (
    <>
      <div className="text-2xl font-medium flex items-center leading-snug">
        {children}
      </div>
      <div className="leading-none mb-2 text-neutral">{description}</div>
    </>
  );
};
