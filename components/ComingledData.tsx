import type { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HolderDistribution } from "./ComingledData/HolderDistribution";

interface ComingledDataProps {
  projectAData: object;
  projectALoading: boolean;
  projectBData?: object;
  projectBLoading?: boolean;
}

const ComingledDataSkeleton: FunctionComponent = () => (
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
    </div>
  </div>
);

const ComingledData: FunctionComponent<ComingledDataProps> = ({
  projectAData,
  projectALoading,
  projectBData,
  projectBLoading,
}) => {
  if (projectALoading || projectBLoading) return <ComingledDataSkeleton />;

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

  return (
    <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1400px] mx-auto">
      <div className="flex-1">
        <div className="card border bg-base-100 w-full min-h-[200px]">
          <div className="card-body space-y-6">
            <HolderDistribution data={holderDistributionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ComingledData };
