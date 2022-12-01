import type { FunctionComponent } from "react";
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
}) => (
  <div className="px-6 md:flex space-y-8 md:space-y-0 md:space-x-8">
    <div className="flex-1">
      <Project data={projectAData} loading={projectALoading} />
    </div>
    <div className="flex-1">
      <Project data={projectBData} loading={projectBLoading} />
    </div>
  </div>
);

export { ProjectComparison };
