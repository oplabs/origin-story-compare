import type { FunctionComponent } from "react";
import numeral from "numeral";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

interface PercentageBluechipHoldersProps {
  percentage: number;
}

const PercentageBluechipHolders: FunctionComponent<
  PercentageBluechipHoldersProps
> = ({ percentage }) => {
  if (percentage) {
    return null;
  }
  return (
    <div>
      <div className="text-xl font-medium mb-2">Top Holders</div>
      <div className="card border px-4 py-3 flex justify-between bg-white rounded-lg">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="text-3xl font-bold text-primary flex items-center leading-snug">
              {numeral(percentage).format("0.00%")}
            </div>
            <div className="text-sm leading-none">
              of holders own an NFT from a top collection*
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs leading-none mb-2 text-gray-600">
            <a
              href="https://www.nansen.ai/research/nft-index-methodology"
              target="_blank"
              rel="noreferrer"
            >
              *Top collections include NFTs tracked by Nansen Blue Chip-10 Index
            </a>
          </div>
        </div>
        <div>
          <ResponsiveContainer aspect={1} minHeight={200}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[{ value: 100 }]}
                cx="50%"
                cy="50%"
                outerRadius={"60%"}
                innerRadius={"40%"}
                fill="rgba(125,125,125,.2)"
                strokeWidth={0}
                isAnimationActive={false}
              />
              <Pie
                dataKey="value"
                data={[{ value: 100 }]}
                cx="50%"
                cy="50%"
                outerRadius={"100%"}
                innerRadius={"60%"}
                fill="rgba(125,125,125,.4)"
                strokeWidth={0}
                isAnimationActive={false}
              />
              <Pie
                dataKey="value"
                startAngle={-90}
                endAngle={-90 - 360 * percentage}
                data={[{ value: percentage }]}
                cx="50%"
                cy="50%"
                outerRadius={"60%"}
                innerRadius={"40%"}
                fill="var(--primary)"
                stroke="none"
                style={{ filter: "opacity(50%)" }}
              />
              <Pie
                dataKey="value"
                startAngle={-90}
                endAngle={-90 - 360 * percentage}
                data={[{ value: percentage }]}
                cx="50%"
                cy="50%"
                outerRadius={"100%"}
                innerRadius={"60%"}
                fill="var(--primary)"
                stroke="none"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export { PercentageBluechipHolders };
