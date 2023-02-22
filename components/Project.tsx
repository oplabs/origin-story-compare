import {
  FunctionComponent,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import Image from "next/image";
import { BigNumber, ethers } from "ethers";
import Skeleton from "react-loading-skeleton";
import { formatNumber } from "../lib/utils";
import { Sales } from "./Sales";
import { Volume } from "./Volume";
import { AveragePrice } from "./AveragePrice";
import { HolderStats } from "./HolderStats";
import { HolderDistribution } from "./HolderDistribution";
import { TopHolders } from "./TopHolders";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { SalesByDay } from "./SalesByDay";
import { VolumeByDay } from "./VolumeByDay";
import { AveragePriceByDay } from "./AveragePriceByDay";
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
  name: string | undefined;
  range?: string | undefined;
}

const Project: FunctionComponent<ProjectProps> = ({
  data,
  loading,
  name,
  range,
}) => {
  const [salesByDayRanged, setSalesByDayRanged] = useState([]);

  useEffect(() => {
    if (data?.salesByDay?.byDay) {
      if (range === "Last 7 days") {
        setSalesByDayRanged(data?.salesByDay?.byDay.slice(-7));
      } else if (range === "Last 30 days") {
        setSalesByDayRanged(data?.salesByDay?.byDay.slice(-30));
      } else if (range === "Last 90 days") {
        setSalesByDayRanged(data?.salesByDay?.byDay.slice(-90));
      } else if (range === "Last year") {
        setSalesByDayRanged(data?.salesByDay?.byDay.slice(-365));
      } else {
        setSalesByDayRanged(data?.salesByDay?.byDay);
      }
    }
  }, [data?.salesByDay?.byDay, range]);

  if (loading) {
    return <ProjectSkeleton />;
  }

  const dataEmpty =
    data &&
    Object.keys(data).length > 0 &&
    Object.entries(data).find((d) => d[1] === undefined);

  if ((!loading && data?.error !== undefined) || dataEmpty) {
    return (
      <div className="space-y-4">
        <div className="alert alert-error text-white">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Couldn&apos;t fetch project data</span>
          </div>
        </div>
        <ProjectSkeleton />
      </div>
    );
  }

  const { totalHolders, uniqueOwners, highConvictionHolders } = data;

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const twitterUsername = data?.contract?.collection?.twitter_username;
  const tweetTextEnd = `of ${name}${
    twitterUsername ? ` (@${twitterUsername})` : ``
  } at ${timestamp}. Data by @OriginProtocol`;

  const imageFooter = `${data?.contract?.collection?.name} at ${timestamp}`;

  return (
    <div className="card lg:border bg-base-100 w-full min-h-[800px]">
      <div className="card-body space-y-6">
        <div className="w-full flex flex-col space-y-2 xl:flex-row xl:space-x-4 items-center">
          <figure className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full border flex-shrink-0">
            <Image
              src={data?.contract?.collection?.image_url}
              alt={data?.contract?.collection?.name}
              width={100}
              height={100}
            />
          </figure>
          <div className="space-y-2 xl:space-y-1 w-full">
            <div className="font-medium text-2xl text-center xl:text-left">
              {data?.contract?.collection?.name}
            </div>
            <div className="max-w-[240px] md:max-w-full mx-auto grid grid-cols-2 gap-2 md:-ml-4 md:flex justify-start md:justify-center xl:justify-start md:divide-x">
              <Stat
                value={formatNumber(data?.contractStats?.totalSupply)}
                label="Items"
              />
              <Stat
                value={ethers.utils.formatUnits(
                  data?.contractStats?.floorPrice || BigNumber.from(0),
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
        <CreateImageWrapper
          tweetText={`Sales by day ${tweetTextEnd}`}
          footer={imageFooter}
        >
          <SalesByDay data={salesByDayRanged} />
        </CreateImageWrapper>
        <CreateImageWrapper
          tweetText={`Volume by day ${tweetTextEnd}`}
          footer={imageFooter}
        >
          <VolumeByDay data={salesByDayRanged} />
        </CreateImageWrapper>
        <CreateImageWrapper
          tweetText={`Average price by day ${tweetTextEnd}`}
          footer={imageFooter}
        >
          <AveragePriceByDay data={salesByDayRanged} />
        </CreateImageWrapper>
        <Sales data={salesByDayRanged} imageFooter={imageFooter} />
        <Volume
          data={salesByDayRanged}
          totalVolume={formatNumber(data?.contractStats?.totalVolume)}
          imageFooter={imageFooter}
        />
        <AveragePrice data={salesByDayRanged} imageFooter={imageFooter} />
        <CreateImageWrapper
          tweetText={`Holder stats ${tweetTextEnd}`}
          footer={imageFooter}
        >
          <HolderStats
            totalHolders={totalHolders}
            uniqueHolders={uniqueOwners}
            highConvictionHolders={highConvictionHolders}
          />
        </CreateImageWrapper>
        <CreateImageWrapper
          tweetText={`Holder distribution ${tweetTextEnd}`}
          footer={imageFooter}
        >
          <HolderDistribution data={data?.holderDistribution} />
        </CreateImageWrapper>
        <CreateImageWrapper
          tweetText={`Top holders ${tweetTextEnd}`}
          footer={imageFooter}
        >
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
