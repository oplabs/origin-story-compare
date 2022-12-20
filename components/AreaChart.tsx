import React from "react";
import { curveCardinal } from "@visx/curve";
import {
  Axis,
  Grid,
  AreaSeries,
  XYChart,
  Tooltip,
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

export const AreaChart = ({ data }: { data: Array<Item> }) => {
  const customTheme = buildChartTheme({
    backgroundColor: "#fff",
    colors: ["hsl(var(--p))"],
    tickLength: 0,
    gridColor: "rgba(0, 0, 0, 0.15)",
    gridColorDark: "rgba(0, 0, 0, 0.15)",
  });

  const height = 210;

  return (
    <XYChart
      height={height}
      margin={{ top: 20, right: 0, bottom: 25, left: 0 }}
      xScale={{ type: "band" }}
      yScale={{ type: "linear" }}
      theme={customTheme}
    >
      <Axis
        orientation="bottom"
        numTicks={6}
        hideAxisLine
        hideTicks
        top={height - 15}
        tickLabelProps={() => ({
          fontSize: 10,
          fontWeight: 400,
          fill: "#000",
          textAnchor: "middle",
          verticalAnchor: "middle",
        })}
        tickFormat={(d) => {
          if (d === data[0].date) return "";
          return d.slice(5).replace("-", "/");
        }}
      />
      <Grid columns={false} numTicks={4} />
      <AreaSeries
        dataKey="Sales"
        data={data}
        curve={curveCardinal}
        fillOpacity={0.1}
        lineProps={{ strokeWidth: 3, stroke: "hsl(var(--p))" }}
        {...accessors}
      />
      <Tooltip
        showVerticalCrosshair
        showSeriesGlyphs
        glyphStyle={{ stroke: "var(--inverse)", strokeWidth: 3, r: 6 }}
        renderTooltip={({ tooltipData, colorScale }) => {
          if (!tooltipData?.nearestDatum?.key || !colorScale) return null;
          return (
            <>
              <div>
                <>
                  <div>{tooltipData.nearestDatum.key}</div>
                  {accessors.xAccessor(tooltipData.nearestDatum.datum as Item)}
                  {": "}
                  {accessors.yAccessor(tooltipData.nearestDatum.datum as Item)}
                </>
              </div>
            </>
          );
        }}
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
