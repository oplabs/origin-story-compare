import type { FunctionComponent, PropsWithChildren } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import Skeleton from "react-loading-skeleton";
import { formatNumber } from "../lib/utils";
import { AveragePrice } from "./AveragePrice";
import { HolderStats } from "./HolderStats";
import { HolderDistribution } from "./HolderDistribution";
import { TopHolders } from "./TopHolders";
import { CreateImageWrapper } from "./CreateImageWrapper";

import "react-loading-skeleton/dist/skeleton.css";
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

function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
  return <span className="px-1">{children}</span>;
}

const ProjectSkeleton: FunctionComponent = () => (
  <div className="card border bg-base-100 w-full min-h-[200px]">
    <div className="card-body space-y-6">
      <div className="space-y-2 lg:flex lg:space-x-4 lg:space-y-0 items-center">
        <figure className="w-24 h-24 rounded-full border flex-shrink-0">
          <Skeleton circle height={100} width={100} />
        </figure>
        <div className="space-y-2 lg:space-y-1">
          <div className="font-medium text-2xl w-[48.5%]">
            <Skeleton />
          </div>
          <div className="-ml-1 flex justify-start divide-x">
            <Skeleton
              count={4}
              wrapper={InlineWrapperWithMargin}
              inline
              width={100}
              height={45}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="font-medium text-2xl w-[48.5%] mb-1">
          <Skeleton />
        </div>
        <Skeleton height={290} width={"100%"} />
      </div>
      <div>
        <div className="font-medium text-2xl w-[48.5%] mb-1">
          <Skeleton />
        </div>
        <Skeleton height={90} width={"100%"} />
      </div>
      <div>
        <div className="font-medium text-2xl w-[48.5%] mb-1">
          <Skeleton />
        </div>
        <Skeleton height={290} width={"100%"} />
      </div>
      <div>
        <div className="font-medium text-2xl w-[48.5%] mb-1">
          <Skeleton />
        </div>
        <Skeleton height={290} width={"100%"} />
      </div>
    </div>
  </div>
);

interface ProjectProps {
  data: object | undefined;
  loading: boolean | undefined;
}

const Project: FunctionComponent<ProjectProps> = ({ data, loading }) => {
  if (loading || (!loading && !data)) {
    return <ProjectSkeleton />;
  }

  const totalHolders = data?.holderDistribution?.reduce((m, o) => m + o[1], 0);
  const uniqueHoldersPercentage = (
    (totalHolders / data?.contractStats?.totalSupply) *
    100
  ).toFixed(0);

  const imageFooter = `${
    data?.contract?.collection?.name
  } at ${new Date().toLocaleString()}`;

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
        <CreateImageWrapper footer={imageFooter}>
          <AveragePrice allSalesByDay={data?.salesByDay} />
        </CreateImageWrapper>
        <CreateImageWrapper footer={imageFooter}>
          <HolderStats
            totalHolders={totalHolders}
            uniqueHolders={uniqueHoldersPercentage}
            highConvictionHolders={data?.highConvictionHolders}
          />
        </CreateImageWrapper>
        <CreateImageWrapper footer={imageFooter}>
          <HolderDistribution data={data?.holderDistribution} />
        </CreateImageWrapper>
        <CreateImageWrapper footer={imageFooter}>
          <TopHolders
            data={data?.topHolders?.slice(0, 5)}
            contract={data?.contract?.address}
          />
        </CreateImageWrapper>
      </div>
    </div>
  );
};

export { Project };
