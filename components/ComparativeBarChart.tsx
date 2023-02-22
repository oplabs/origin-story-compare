import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { Text } from "@visx/text";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LegendOrdinal } from "@visx/legend";
import { GridRows } from "@visx/grid";

const verticalMargin = 60;

const getX = (d: { label: string; value: number }) => d.label;
const getY = (d: { label: string; value: number }) => d.value;

export type ComparativeBarChartProps = {
  width: number;
  height: number;
  events?: boolean;
  data: { label: string; dataPoints: { label: string; value: number }[] }[];
  axisLeftLabel?: string;
  axisBottomLabel?: string;
  appendCount?: boolean;
  axisBottomIsDate?: boolean;
  countFontSize?: number;
  showGrid?: boolean;
};

const ComparativeBarChart = ({
  width = 600,
  height = 800,
  data,
  axisLeftLabel,
  axisBottomLabel,
  appendCount = true,
  axisBottomIsDate = false,
  countFontSize = 14,
  showGrid = false,
}: ComparativeBarChartProps) => {
  const horizontalMargin = appendCount ? 20 : 60;

  const xMax = width - (appendCount ? 20 : 60);
  const yMax = height - 80;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map((d) => d.label),
        padding: 0.25,
      }),
    [xMax, data]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          0,
          Math.max(
            ...data.map((d) => d.dataPoints.map((dp) => dp.value)).flat()
          ),
        ],
      }),
    [yMax, data]
  );

  let legendLabels = data.map((d) => d.dataPoints.map((dp) => dp.label)).flat();
  legendLabels = [...new Set(legendLabels)];

  const colorScale = scaleOrdinal<string, string>({
    domain: legendLabels,
    range: ["hsl(var(--p))", "hsl(var(--n))"],
  });

  return width < 10 ? null : (
    <div className="relative">
      <svg width="100%" height={height + 20}>
        <Group top={verticalMargin - 10} left={horizontalMargin}>
          {showGrid && (
            <GridRows
              left={0}
              top={0}
              scale={yScale}
              width={innerWidth}
              strokeOpacity={1}
              strokeWidth={1}
              pointerEvents="none"
            />
          )}
          {data.map((d) => {
            return d.dataPoints.map((dp, i) => {
              const letter = getX(dp);
              const barWidth = xScale.bandwidth() / 2;
              const barHeight = yMax - (yScale(getY(dp)) ?? 0);
              const barX = xScale(d.label);
              const barY = yMax - barHeight;

              if (!barX) {
                return null;
              }
              return (
                <Group key={`bar-${letter}-${d.label}`}>
                  <Bar
                    x={i % 2 ? barX + barWidth : barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    className={i % 2 ? "fill-neutral" : "fill-primary"}
                  />
                  {appendCount && (
                    <Text
                      x={i % 2 ? barX + barWidth : barX}
                      y={barY}
                      width={barWidth}
                      className="fill-current"
                      fontSize={countFontSize}
                      textAnchor="middle"
                      dy={"-0.5em"}
                      dx={barWidth / 2}
                    >
                      {getY(dp)}
                    </Text>
                  )}
                </Group>
              );
            });
          })}

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#eaeaea"
            hideTicks={!axisBottomIsDate}
            tickStroke="#cccccc"
            label={axisBottomLabel}
            labelOffset={12}
            tickLabelProps={() => ({
              fontSize: axisBottomIsDate ? 9 : 11,
              textAnchor: "middle",
            })}
            tickFormat={
              axisBottomIsDate
                ? (d) => {
                    if (d === data[0].date) return "";
                    return d.slice(5).replace("-", "/");
                  }
                : (d) => d
            }
          />
          <AxisLeft
            scale={yScale}
            numTicks={appendCount ? 0 : undefined}
            tickStroke="#cccccc"
            labelOffset={appendCount ? 0 : undefined}
            stroke="#eaeaea"
            label={axisLeftLabel}
          />
        </Group>
      </svg>
      <div className="absolute top-0 left-0 md:left-auto md:right-0 text-xs md:text-sm text-neutral">
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div>
    </div>
  );
};

export { ComparativeBarChart };
