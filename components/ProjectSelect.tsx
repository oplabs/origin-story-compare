import type { FunctionComponent } from "react";

const ProjectSelect: FunctionComponent = () => (
  <div className="form-control w-full max-w-sm">
    <select className="select select-primary select-bordered">
      <option>Project A</option>
      <option>Project B</option>
    </select>
  </div>
);

export { ProjectSelect };
