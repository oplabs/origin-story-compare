import type { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HolderDistribution } from "./CombinedData/HolderDistribution";
import { CreateImageWrapper } from "./CreateImageWrapper";
import { SalesByDay } from "./CombinedData/SalesByDay";

interface CombinedDataProps {
  projectAData: object;
  projectALoading: boolean;
  projectBData?: object;
  projectBLoading?: boolean;
  projectAName: string;
  projectBName?: string;
}

const CombinedDataSkeleton: FunctionComponent = () => (
  <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1400px] mx-auto">
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

  const projectATwitterUsername =
    projectAData?.contract?.collection?.twitter_username;
  const projectBTwitterUsername =
    projectBData?.contract?.collection?.twitter_username;

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const tweetTextEnd = `of ${projectAName}${
    projectATwitterUsername ? ` (@${projectATwitterUsername})` : ``
  } vs. ${projectBName}${
    projectBTwitterUsername ? ` (@${projectBTwitterUsername})` : ``
  } at ${timestamp}`;

  const imageFooter = `${projectAData?.contract?.collection?.name} vs. ${projectBData?.contract?.collection?.name} at ${timestamp}`;

  const holderDistributionData = projectAData?.holderDistribution.map((d) => ({
    label: d[0],
    dataPoints: [{ label: projectAData?.contract?.name, value: d[1] }],
  }));
  projectBData?.holderDistribution.forEach((d) => {
    const found = holderDistributionData.find((e) => e.label === d[0]);
    if (found) {
      found.dataPoints.push({
        label: projectBData?.contract?.name,
        value: d[1],
      });
    } else {
      holderDistributionData.push({
        label: d[0],
        dataPoints: [{ label: projectBData?.contract?.name, value: d[1] }],
      });
    }
  });

  console.log(projectAData?.salesByDay?.byDay);

  const projectASalesByDayData30 = projectAData?.salesByDay?.byDay.slice(
    Math.max(projectAData?.salesByDay?.byDay.length - 30, 0)
  );
  const projectBSalesByDayData30 = projectBData?.salesByDay?.byDay.slice(
    Math.max(projectBData?.salesByDay?.byDay.length - 30, 0)
  );

  const salesByDayData = projectASalesByDayData30.map((d) => ({
    label: d.date,
    dataPoints: [{ label: projectAData?.contract?.name, value: d.sales }],
  }));
  projectBSalesByDayData30.forEach((d) => {
    const found = salesByDayData.find((e) => e.label === d.date);
    if (found) {
      found.dataPoints.push({
        label: projectBData?.contract?.name,
        value: d.sales,
      });
    } else {
      salesByDayData.push({
        label: d.date,
        dataPoints: [{ label: projectBData?.contract?.name, value: d.sales }],
      });
    }
  });

  return (
    <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1400px] mx-auto">
      <div className="flex-1">
        <div className="card border bg-base-100 w-full min-h-[200px]">
          <div className="card-body space-y-6">
            <CreateImageWrapper
              footer={imageFooter}
              tweetText={`Sales by day ${tweetTextEnd}`}
            >
              <SalesByDay data={salesByDayData} />
            </CreateImageWrapper>
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
