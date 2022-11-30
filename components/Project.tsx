import type { FunctionComponent } from "react";

interface ProjectProps {
  data: object;
}

const Project: FunctionComponent<ProjectProps> = () => (
  <div className="card border bg-base-100 w-full h-28 p-6">
    Project
  </div>
);

export { Project };
