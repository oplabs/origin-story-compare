import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Text } from "@visx/text";
import { AxisBottom, AxisLeft } from "@visx/axis";

const verticalMargin = 60;
const horizontalMargin = 20;

const getX = (d: any) => d.label;
const getY = (d: any) => d.value;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
  data?: { label: string; value: number }[];
  axisLeftLabel?: string;
  axisBottomLabel?: string;
  appendCount?: boolean;
  axisBottomIsDate?: boolean;
  countFontSize?: number;
};

export const BarChart = ({
  width = 600,
  height = 300,
  data,
  axisLeftLabel,
  axisBottomLabel,
  appendCount,
  axisBottomIsDate,
  countFontSize,
}: BarsProps) => {
  const xMax = width - horizontalMargin;
  const yMax = height - 80;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map(getX),
        padding: 0.25,
      }),
    [xMax, data]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map(getY))],
      }),
    [yMax, data]
  );

  return width < 10 ? null : (
    <svg width="100%" height={height} className="text-primary">
      {/* <GridRows scale={xScale} tickValues={data?.map((d) => getX(d))} width={innerWidth} /> */}
      <Group top={verticalMargin - 30} left={horizontalMargin}>
        {data.map((d) => {
          const letter = getX(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getY(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          if (!barX) {
            return null;
          }
          return (
            <Group key={`bar-${letter}`}>
              <Bar
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                className="fill-current"
              />
              {appendCount && (
                <Text
                  x={barX + barWidth / 2}
                  y={barY}
                  width={barWidth}
                  className="fill-current"
                  fontSize={countFontSize || 16}
                  textAnchor="middle"
                  // dx={'-.2em'}
                  dy={"-0.5em"}
                >
                  {getY(d)}
                </Text>
              )}
            </Group>
          );
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
          numTicks={0}
          labelOffset={0}
          stroke="#eaeaea"
          label={axisLeftLabel}
        />
      </Group>
    </svg>
  );
};
