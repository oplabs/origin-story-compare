import type { FunctionComponent } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { formatNumber } from "../lib/utils";
interface StatProps {
  value: number | string;
  label: string;
  showEth?: boolean;
}

const Stat: FunctionComponent<StatProps> = ({ value, label, showEth }) => {
  return (
    <div className="pl-4">
      <div className="flex space-x-1 items-center ">
        {showEth && (
          <div className="flex-shrink-0">
            <Image src="/eth-icon.svg" alt={label} width={9} height={9} />
          </div>
        )}
        <div className="text-xl text-primary font-medium">{value}</div>
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

  return (
    <div className="card border bg-base-100 w-full min-h-[200px]">
      <div className="card-body space-y-6">
        <div className="flex space-x-4 items-center">
          <figure className="rounded-full border flex-shrink-0">
            <Image
              src={data?.contract?.collection?.image_url}
              alt={data?.contract?.collection?.name}
              width={100}
              height={100}
            />
          </figure>
          <div className="space-y-2">
            <div className="card-title">{data?.contract?.collection?.name}</div>
            <div className="-ml-4 flex space-x-4 justify-start divide-x">
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
        <div className="card border p-4">
          <div>1234</div>
          <div>Items</div>
        </div>
      </div>
    </div>
  );
};

export { Project };
