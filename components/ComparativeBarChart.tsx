import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { Text } from "@visx/text";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LegendOrdinal } from "@visx/legend";

const verticalMargin = 60;
const horizontalMargin = 20;

const getX = (d: { label: string; value: number }) => d.label;
const getY = (d: { label: string; value: number }) => d.value;

export type ComparativeBarChartProps = {
  width: number;
  height: number;
  events?: boolean;
  data: { label: string; dataPoints: { label: string; value: number }[] }[];
};

const ComparativeBarChart = ({
  width = 600,
  height = 800,
  data,
}: ComparativeBarChartProps) => {
  const xMax = width - horizontalMargin;
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

  let oddBar = false;

  let legendLabels = data.map((d) => d.dataPoints.map((dp) => dp.label)).flat();
  legendLabels = [...new Set(legendLabels)];

  const colorScale = scaleOrdinal<string, string>({
    domain: legendLabels,
    range: ["hsl(var(--p))", "hsl(var(--n))"],
  });

  return width < 10 ? null : (
    <div className="relative">
      <svg width="100%" height={height}>
        <Group top={verticalMargin - 30} left={horizontalMargin}>
          {data.map((d) =>
            d.dataPoints.map((dp) => {
              const letter = getX(dp);
              const barWidth = xScale.bandwidth() / 2;
              const barHeight = yMax - (yScale(getY(dp)) ?? 0);
              const barX = xScale(d.label);
              const barY = yMax - barHeight;
              oddBar = !oddBar;
              if (!barX) {
                return null;
              }
              return (
                <Group key={`bar-${letter}-${d.label}`}>
                  <Bar
                    x={oddBar ? barX : barX + barWidth}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    className={oddBar ? "fill-primary" : "fill-neutral"}
                  />
                  <Text
                    x={oddBar ? barX : barX + barWidth}
                    y={barY}
                    width={barWidth}
                    className="fill-current"
                    fontSize={14}
                    textAnchor="middle"
                    dy={"-0.5em"}
                    dx={barWidth / 2}
                  >
                    {getY(dp)}
                  </Text>
                </Group>
              );
            })
          )}

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#eaeaea"
            hideTicks
            label="Tokens"
            labelOffset={12}
            tickLabelProps={() => ({ fontSize: 11, textAnchor: "middle" })}
          />
          <AxisLeft
            scale={yScale}
            numTicks={0}
            labelOffset={0}
            stroke="#eaeaea"
            hideTicks
            label="Holders"
          />
        </Group>
      </svg>
      <div className="absolute top-0 right-0 text-sm text-neutral">
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
