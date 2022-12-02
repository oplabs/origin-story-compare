import type { FunctionComponent } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { formatNumber } from "../lib/utils";
import { AveragePrice } from "./AveragePrice";
import { HolderStats } from "./HolderStats";
import { HolderDistribution } from "./HolderDistribution";
interface StatProps {
  value: number | string;
  label: string;
  showEth?: boolean;
}

const Stat: FunctionComponent<StatProps> = ({ value, label, showEth }) => {
  return (
    <div className="px-4">
      <div className="flex space-x-1 items-center">
        {showEth && (
          <div className="flex-shrink-0">
            <Image src="/eth-icon.svg" alt={label} width={9} height={9} />
          </div>
        )}
        <div className="text-lg text-primary font-medium">{value}</div>
      </div>
      <div className="text-xs text-neutral">{label}</div>
    </div>
  );
};

interface ProjectProps {
  data: object | undefined;
  loading: boolean | undefined;
}

const Project: FunctionComponent<ProjectProps> = ({ data, loading }) => {
  if (loading || (!loading && !data)) {
    return (
      <div className="card border w-full bg-gray-100 min-h-[200px] md:h-full" />
    );
  }

  //console.log(data);

  const totalHolders = data?.holderDistribution?.reduce((m, o) => m + o[1], 0);
  const uniqueHoldersPercentage = (
    (totalHolders / data?.contractStats?.totalSupply) *
    100
  ).toFixed(0);

  return (
    <div className="card border bg-base-100 w-full min-h-[200px]">
      <div className="card-body space-y-6">
        <div className="space-y-2 lg:flex lg:space-x-4 items-center">
          <figure className="w-24 h-24 rounded-full border flex-shrink-0">
            <Image
              src={data?.contract?.collection?.image_url}
              alt={data?.contract?.collection?.name}
              width={100}
              height={100}
            />
          </figure>
          <div className="space-y-2 lg:space-y-1">
            <div className="font-medium text-2xl">
              {data?.contract?.collection?.name}
            </div>
            <div className="-ml-4 flex justify-start divide-x">
              <Stat
                value={formatNumber(data?.contractStats?.totalSupply)}
                label="Items"
              />
              <Stat
                value={ethers.utils.formatUnits(
                  data?.contractStats?.floorPrice,
                  18
                )}
                label="Floor Price"
                showEth
              />
              <Stat
                value={formatNumber(data?.contractStats?.oneDayVolume)}
                label="Volume (24h)"
                showEth
              />
              <Stat
                value={formatNumber(data?.contractStats?.totalVolume)}
                label="Volume (Total)"
                showEth
              />
            </div>
          </div>
        </div>
        <AveragePrice allSalesByDay={data?.salesByDay} />
        <HolderStats
          totalHolders={totalHolders}
          uniqueHolders={uniqueHoldersPercentage}
          highConvictionHolders={data?.highConvictionHolders}
        />
        <HolderDistribution data={data?.holderDistribution} />
      </div>
    </div>
  );
};

export { Project };
