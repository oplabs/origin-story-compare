import type { FunctionComponent } from "react";
import { Project } from "./Project";
interface ProjectComparisonProps {
  projectAData: object;
  projectBData?: object;
}

const ProjectComparison: FunctionComponent<ProjectComparisonProps> = ({
  projectAData,
  projectBData,
}) => (
  <div className="px-6">
    <div>
      <Project data={projectAData} />
    </div>
    <div>{projectBData && <Project data={projectBData} />}</div>
  </div>
);

export { ProjectComparison };
