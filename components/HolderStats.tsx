import { ReactElement } from "react";
import { formatNumber } from "../lib/utils";

export const HolderStats = ({
  totalHolders,
  uniqueHolders,
  highConvictionHolders,
}: {
  totalHolders: number;
  uniqueHolders: string;
  highConvictionHolders: number;
}) => {
  return (
    <div>
      <div className="text-xl font-medium mb-2">Holder Stats</div>
      <div className="space-y-2 md:space-y-0 sm:py-3 md:py-5 sm:space-x-4 sm:divide-x md:p-4 rounded-xl flex flex-col sm:flex-row justify-between card md:border border-gray-150 bg-white">
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
    <div className="sm:px-6">
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
