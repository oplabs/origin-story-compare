import { ReactElement } from "react";
import { formatNumber } from "../lib/utils";

export const HolderStats = ({
  totalHolders = 10000,
  uniqueHolders = 5000,
  highConvictionHolders = 10,
}: {
  totalHolders: number;
  uniqueHolders: number;
  highConvictionHolders: number;
}) => {
  return (
    <div>
      <div className="text-xl font-medium mb-2">Holder Stats</div>
      <div className="py-5 space-x-4 divide-x p-4 rounded-xl flex flex-col sm:flex-row justify-between card border border-gray-150 bg-white">
        <Stat label="Total holders">
          <>{formatNumber(totalHolders)}</>
        </Stat>
        <Stat label="Unique holders">
          <>{uniqueHolders}%</>
        </Stat>
        <Stat label="High conviction holders" description="(10+ holdings)">
          <>{formatNumber(highConvictionHolders)}</>
        </Stat>
      </div>
    </div>
  );
};

const Stat = ({
  children,
  description,
  label,
}: {
  children: ReactElement;
  description?: string;
  label: string;
}) => {
  return (
    <div className="px-6">
      <div className="flex items-baseline leading-none">
        <div className="text-2xl font-medium text-primary">{children}</div>
        {!description ? null : (
          <div className="text-xs ml-1 text-gray-400">{description}</div>
        )}
      </div>

      <div className="text-xs">{label}</div>
    </div>
  );
};
