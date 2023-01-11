import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";

export const DonutChart = ({
  data,
  height = 400,
  width = 400,
  colors = ["hsl(var(--p))", "rgb(243 244 246 / var(--tw-bg-opacity))"],
}: {
  data: number[];
  height?: number;
  width?: number;
  colors?: string[];
}) => {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;
  const donutThickness = 30;

  return (
    <div>
      <svg width={width} height={height}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={(d) => d}
            outerRadius={radius}
            innerRadius={radius - donutThickness}
            padAngle={0.05}
          >
            {(pie) => {
              return (
                <>
                  {pie.arcs.map((arc, i) => {
                    return (
                      <g key={i}>
                        <path d={pie.path(arc) || ""} fill={colors[i]} />
                      </g>
                    );
                  })}
                </>
              );
            }}
          </Pie>
        </Group>
      </svg>
    </div>
  );
};
