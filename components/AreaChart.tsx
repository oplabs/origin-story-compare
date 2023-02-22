import React from "react";
import { curveCardinal } from "@visx/curve";
import {
  Axis,
  Grid,
  AreaSeries,
  XYChart,
  buildChartTheme,
} from "@visx/xychart";

interface Item {
  date: Date;
  value: number;
}

const accessors = {
  xAccessor: (d: Item) => d.date,
  yAccessor: (d: Item) => d.value,
};

export const AreaChart = ({
  data,
  showLeftAxis,
  parentWidth,
  leftAxisLabel,
  bottomAxisLabel,
}: {
  data: Array<Item>;
  showLeftAxis?: boolean;
  parentWidth?: number;
  leftAxisLabel?: string;
  bottomAxisLabel?: string;
}) => {
  const customTheme = buildChartTheme({
    backgroundColor: "#fff",
    colors: ["hsl(var(--p))"],
    tickLength: 0,
    gridColor: "rgba(0, 0, 0, 0.15)",
    gridColorDark: "rgba(0, 0, 0, 0.15)",
  });

  const height = 220;

  return (
    <XYChart
      height={height + 20}
      margin={{ top: 20, right: 0, bottom: 45, left: showLeftAxis ? 50 : 0 }}
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
          fontSize: 9,
          fontWeight: 400,
          fill: "#000",
        })}
        tickFormat={(d) => {
          if (d === data[0].date) return "";
          return d.slice(5).replace("-", "/");
        }}
        label={bottomAxisLabel ? bottomAxisLabel : "Date"}
        labelProps={{
          fontSize: 10,
          fontWeight: 400,
          fill: "#000",
          textAnchor: "middle",
          verticalAnchor: "middle",
          dx: -15,
          dy: -5,
        }}
      />
      {showLeftAxis && (
        <Axis
          orientation="left"
          numTicks={6}
          hideAxisLine
          left={48}
          tickLabelProps={() => ({
            fontSize: 9,
            fontWeight: 400,
            fill: "#000",
            textAnchor: "end",
            verticalAnchor: "end",
          })}
          label={leftAxisLabel ? leftAxisLabel : "Sales"}
          labelProps={{
            fontSize: 10,
            fontWeight: 400,
            fill: "#000",
            textAnchor: "middle",
            verticalAnchor: "middle",
            dx: -25,
          }}
        />
      )}
      <Grid columns={false} numTicks={4} />
      <AreaSeries
        dataKey="Sales"
        data={data}
        curve={curveCardinal}
        fillOpacity={0.1}
        lineProps={{ strokeWidth: 3, stroke: "hsl(var(--p))" }}
        {...accessors}
        width={showLeftAxis && parentWidth ? parentWidth - 30 : undefined}
      />
    </XYChart>
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
