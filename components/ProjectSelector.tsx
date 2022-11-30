import type { FunctionComponent } from "react";
import { ProjectSelect } from "./ProjectSelect";

const ProjectSelector: FunctionComponent = () => (
  <div>
    <ul className="flex space-x-4 justify-center items-center text-sm font-medium">
      <li className="text-neutral">Compare</li>
      <li className="pr-4">
        <ProjectSelect />
      </li>
      <li className="text-neutral">With</li>
      <li>
        <ProjectSelect />
      </li>
    </ul>
  </div>
);

export { ProjectSelector };
