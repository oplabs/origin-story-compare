import type { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HolderDistribution } from "./CombinedData/HolderDistribution";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { SalesByDay } from "./CombinedData/SalesByDay";
import { VolumeByDay } from "./CombinedData/VolumeByDay";
import { AveragePriceByDay } from "./CombinedData/AveragePriceByDay";
import { Sales } from "./CombinedData/Sales";
import { Volume } from "./CombinedData/Volume";
import { AveragePrice } from "./CombinedData/AveragePrice";
import { HolderOverlap } from "./CombinedData/HolderOverlap";
interface CombinedDataProps {
  projectAData: object;
  projectALoading: boolean;
  projectBData?: object;
  projectBLoading?: boolean;
  projectAName: string;
  projectBName?: string;
}

const CombinedDataSkeleton: FunctionComponent = () => (
  <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1000px] mx-auto">
    <div className="flex-1">
      <div className="card border bg-base-100 w-full min-h-[200px]">
        <div className="card-body space-y-6">
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
    </div>
  </div>
);

const CombinedData: FunctionComponent<CombinedDataProps> = ({
  projectAData,
  projectALoading,
  projectBData,
  projectBLoading,
  projectAName,
  projectBName,
}) => {
  if (projectALoading || projectBLoading) return <CombinedDataSkeleton />;

  const dataAEmpty =
    projectAData &&
    Object.keys(projectAData).length > 0 &&
    Object.entries(projectAData).find((d) => d[1] === undefined);

  const dataBEmpty =
    projectBData &&
    Object.keys(projectBData).length > 0 &&
    Object.entries(projectBData).find((d) => d[1] === undefined);

  if (
    !projectALoading &&
    !projectBLoading &&
    (dataAEmpty !== undefined || dataBEmpty !== undefined)
  ) {
    return (
      <div className="space-y-4">
        <div className="alert alert-error text-white max-w-2xl mx-auto">
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
            <span>Couldn&apos;t fetch combined data</span>
          </div>
        </div>
        <CombinedDataSkeleton />
      </div>
    );
  }

  const projectATwitterUsername =
    projectAData?.contract?.collection?.twitter_username;
  const projectBTwitterUsername =
    projectBData?.contract?.collection?.twitter_username;

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const tweetTextEnd = `of ${projectAName}${
    projectATwitterUsername ? ` (@${projectATwitterUsername})` : ``
  } vs. ${projectBName}${
    projectBTwitterUsername ? ` (@${projectBTwitterUsername})` : ``
  } at ${timestamp}. Data by @OriginProtocol`;

  const imageFooter = `${projectAData?.contract?.collection?.name} vs. ${projectBData?.contract?.collection?.name} at ${timestamp}`;

  const holderDistributionData = projectAData?.holderDistribution.map((d) => ({
    label: d[0],
    dataPoints: [{ label: projectAName, value: d[1] }],
  }));
  projectBData?.holderDistribution.forEach((d) => {
    const found = holderDistributionData.find((e) => e.label === d[0]);
    if (found) {
      found.dataPoints.push({
        label: projectBName,
        value: d[1],
      });
    } else {
      holderDistributionData.push({
        label: d[0],
        dataPoints: [{ label: projectBName, value: d[1] }],
      });
    }
  });

  const projectASalesByDayData30 = projectAData?.salesByDay?.byDay.slice(
    Math.max(projectAData?.salesByDay?.byDay.length - 30, 0)
  );
  const projectBSalesByDayData30 = projectBData?.salesByDay?.byDay.slice(
    Math.max(projectBData?.salesByDay?.byDay.length - 30, 0)
  );

  const salesByDayData = projectASalesByDayData30.map((d) => ({
    label: d.date,
    dataPoints: [{ label: projectAName, value: d.sales }],
  }));
  projectBSalesByDayData30.forEach((d) => {
    const found = salesByDayData.find((e) => e.label === d.date);
    if (found) {
      found.dataPoints.push({
        label: projectBName,
        value: d.sales,
      });
    } else {
      salesByDayData.push({
        label: d.date,
        dataPoints: [{ label: projectBName, value: d.sales }],
      });
    }
  });

  const volumeByDayData = projectASalesByDayData30.map((d) => ({
    label: d.date,
    dataPoints: [{ label: projectAName, value: d.ethVolume }],
  }));
  projectBSalesByDayData30.forEach((d) => {
    const found = volumeByDayData.find((e) => e.label === d.date);
    if (found) {
      found.dataPoints.push({
        label: projectBName,
        value: d.ethVolume,
      });
    } else {
      volumeByDayData.push({
        label: d.date,
        dataPoints: [{ label: projectBName, value: d.ethVolume }],
      });
    }
  });

  const averagePriceByDayData = projectASalesByDayData30.map((d) => ({
    label: d.date,
    dataPoints: [{ label: projectAName, value: d.averagePrice }],
  }));
  projectBSalesByDayData30.forEach((d) => {
    const found = averagePriceByDayData.find((e) => e.label === d.date);
    if (found) {
      found.dataPoints.push({
        label: projectBName,
        value: d.averagePrice,
      });
    } else {
      volumeByDayData.push({
        label: d.date,
        dataPoints: [{ label: projectBName, value: d.averagePrice }],
      });
    }
  });

  const salesData = projectAData?.salesByDay?.byDay.map((d) => ({
    label: d.date,
    dataPoints: [{ label: projectAName, value: d.sales }],
  }));
  projectBData?.salesByDay?.byDay.forEach((d) => {
    const found = salesData.find((e) => e.label === d.date);
    if (found) {
      found.dataPoints.push({
        label: projectBName,
        value: d.sales,
      });
    } else {
      salesData.push({
        label: d.date,
        dataPoints: [{ label: projectBName, value: d.sales }],
      });
    }
  });

  const salesDataA = projectAData?.salesByDay?.byDay.map((d) => ({
    date: d.date,
    value: d.sales,
  }));

  const salesDataB = projectBData?.salesByDay?.byDay.map((d) => ({
    date: d.date,
    value: d.sales,
  }));

  const volumeDataA = projectAData?.salesByDay?.byDay.map((d) => ({
    date: d.date,
    value: d.ethVolume,
  }));

  const volumeDataB = projectBData?.salesByDay?.byDay.map((d) => ({
    date: d.date,
    value: d.ethVolume,
  }));

  const averagePriceDataA = projectAData?.salesByDay?.byDay.map((d) => ({
    date: d.date,
    value: d.averagePrice,
  }));

  const averagePriceDataB = projectBData?.salesByDay?.byDay.map((d) => ({
    date: d.date,
    value: d.averagePrice,
  }));

  const projectAOwnerAddressess = projectAData?.ownerAddresses;
  const projectBOwnerAddressess = projectBData?.ownerAddresses;
  const ownersOfBothProjects = projectAOwnerAddressess.filter((a: string) =>
    projectBOwnerAddressess.includes(a)
  );
  const numberOfOwnersOfBothProjects = ownersOfBothProjects.length;
  const percentageOfProjectAOwnersWhoOwnProjectB = (
    (ownersOfBothProjects.length / projectAOwnerAddressess.length) *
    100
  ).toFixed(2);
  const percentageOfProjectBOwnersWhoOwnProjectA = (
    (ownersOfBothProjects.length / projectBOwnerAddressess.length) *
    100
  ).toFixed(2);

  return (
    <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1000px] mx-auto">
      <div className="flex-1">
        <div className="card border bg-base-100 w-full min-h-[200px]">
          <div className="card-body space-y-6">
            <CreateImageWrapper
              footer={imageFooter}
              tweetText={`Holder overlap ${tweetTextEnd}`}
              isCombined
            >
              <HolderOverlap
                numberOfOwnersOfBothProjects={numberOfOwnersOfBothProjects}
                percentageOfProjectAOwnersWhoOwnProjectB={
                  percentageOfProjectAOwnersWhoOwnProjectB
                }
                percentageOfProjectBOwnersWhoOwnProjectA={
                  percentageOfProjectBOwnersWhoOwnProjectA
                }
                projectAName={projectAName}
                projectBName={projectBName}
              />
            </CreateImageWrapper>
            <CreateImageWrapper
              footer={imageFooter}
              tweetText={`Sales by day ${tweetTextEnd}`}
              isCombined
            >
              <SalesByDay data={salesByDayData} />
            </CreateImageWrapper>
            <CreateImageWrapper
              footer={imageFooter}
              tweetText={`Volume by day ${tweetTextEnd}`}
              isCombined
            >
              <VolumeByDay data={volumeByDayData} />
            </CreateImageWrapper>
            <CreateImageWrapper
              footer={imageFooter}
              tweetText={`Average price by day ${tweetTextEnd}`}
              isCombined
            >
              <AveragePriceByDay data={averagePriceByDayData} />
            </CreateImageWrapper>
            <Sales
              dataA={salesDataA}
              dataB={salesDataB}
              dataAKey={projectAName}
              dataBKey={projectBName}
              imageFooter={imageFooter}
              tweetText={`Sales ${tweetTextEnd}`}
            />
            <Volume
              dataA={volumeDataA}
              dataB={volumeDataB}
              dataAKey={projectAName}
              dataBKey={projectBName}
              imageFooter={imageFooter}
              tweetText={`Volume ${tweetTextEnd}`}
            />
            <AveragePrice
              dataA={averagePriceDataA}
              dataB={averagePriceDataB}
              dataAKey={projectAName}
              dataBKey={projectBName}
              imageFooter={imageFooter}
              tweetText={`Volume ${tweetTextEnd}`}
            />
            <CreateImageWrapper
              footer={imageFooter}
              tweetText={`Holder distribution ${tweetTextEnd}`}
            >
              <HolderDistribution data={holderDistributionData} />
            </CreateImageWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CombinedData };
