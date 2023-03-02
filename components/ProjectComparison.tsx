import type { FunctionComponent } from "react";
import { useState } from "react";
import { Project } from "./Project";
import { CombinedData } from "./CombinedData";
interface ProjectComparisonProps {
  projectAData?: object;
  projectALoading?: boolean;
  projectBData?: object;
  projectBLoading?: boolean;
  projectAName?: string;
  projectBName?: string;
}

const ProjectComparison: FunctionComponent<ProjectComparisonProps> = ({
  projectAData,
  projectALoading,
  projectBData,
  projectBLoading,
  projectAName,
  projectBName,
}) => {
  const [view, setView] = useState<"side-by-side" | "combined">("side-by-side");
  const [range, setRange] = useState<
    "Last 7 days" | "Last 30 days" | "Last 90 days" | "Last year" | "All time"
  >("Last 30 days");
  const hasProjectB = projectBData && projectBName;

  const Tabs: FunctionComponent = () => (
    <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 items-center justify-center px-4 mb-6 space-x-2">
      <div className="text-xs md:text-sm text-neutral">Toggle View</div>
      <div className="tabs tabs-boxed bg-gray-100">
        <button
          className={`tab ${view === "side-by-side" && " tab-active"}`}
          onClick={() => setView("side-by-side")}
        >
          <span className="lg:hidden">Individual</span>
          <span className="hidden lg:inline-block">Side by Side</span>
        </button>
        <button
          className={`tab ${view === "combined" && " tab-active"}`}
          onClick={() => setView("combined")}
          disabled={!hasProjectB}
        >
          Combined
        </button>
      </div>
    </div>
  );

  const RangeFilter: FunctionComponent = () => {
    return (
      <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 items-center justify-center px-4 mb-6 space-x-2">
        <div className="text-xs md:text-sm text-neutral">Select Range</div>
        <select
          defaultValue={range}
          className="select select-bordered select-sm"
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="Last 7 days">Last 7 days</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 90 days">Last 90 days</option>
          <option value="Last year">Last year</option>
          <option value="All time">All time</option>
        </select>
      </div>
    );
  };

  const Switches: FunctionComponent = () => (
    <div
      className={`${
        view === "combined" ? "max-w-[1000px]" : "max-w-[1400px]"
      } mx-auto px-4`}
    >
      <div className="md:flex justify-between items-center">
        <Tabs />
        <RangeFilter />
      </div>
    </div>
  );

  if (hasProjectB && view === "combined") {
    return (
      <>
        <Switches />
        <CombinedData
          projectAData={projectAData}
          projectALoading={projectALoading}
          projectBData={projectBData}
          projectBLoading={projectBLoading}
          projectAName={projectAName}
          projectBName={projectBName}
          range={range}
        />
      </>
    );
  }

  return (
    <>
      <Switches />
      <div className="p-0 lg:px-6 lg:flex space-y-8 lg:space-y-0 lg:space-x-8 max-w-[1400px] mx-auto">
        <div className="flex-1 lg:w-1/2">
          <Project
            data={projectAData}
            loading={projectALoading}
            name={projectAName}
            range={range}
          />
        </div>
        <div className="divider lg:hidden" />
        <div className="flex-1 lg:w-1/2">
          <Project
            data={hasProjectB ? projectBData : {}}
            loading={hasProjectB ? projectBLoading : true}
            name={hasProjectB ? projectBName : ""}
            range={range}
          />
        </div>
      </div>
    </>
  );
};

export { ProjectComparison };
