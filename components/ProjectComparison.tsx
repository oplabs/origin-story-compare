import type { FunctionComponent } from "react";
import { useState } from "react";
import { Project } from "./Project";
interface ProjectComparisonProps {
  projectAData: object;
  projectALoading: boolean;
  projectBData?: object;
  projectBLoading?: boolean;
}

const ProjectComparison: FunctionComponent<ProjectComparisonProps> = ({
  projectAData,
  projectALoading,
  projectBData,
  projectBLoading,
}) => {
  const [view, setView] = useState<"side-by-side" | "comingled">(
    "side-by-side"
  );

  const Tabs: FunctionComponent = () => (
    <div className="flex items-center justify-center px-4 mb-6 space-x-2 ">
      <div className="text-sm text-neutral">Toggle View</div>
      <div className="tabs tabs-boxed bg-gray-100">
        <button
          className={`tab ${view === "side-by-side" && " tab-active"}`}
          onClick={() => setView("side-by-side")}
        >
          Side by Side
        </button>
        <button
          className={`tab ${view === "comingled" && " tab-active"}`}
          onClick={() => setView("comingled")}
        >
          Comingled
        </button>
      </div>
    </div>
  );

  if (view === "comingled") {
    return (
      <>
        <Tabs />
        <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1400px] mx-auto">
          <div className="flex-1">Comingled charts and data</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Tabs />
      <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8 max-w-[1400px] mx-auto">
        <div className="flex-1">
          <Project data={projectAData} loading={projectALoading} />
        </div>
        <div className="flex-1">
          <Project data={projectBData} loading={projectBLoading} />
        </div>
      </div>
    </>
  );
};

export { ProjectComparison };
