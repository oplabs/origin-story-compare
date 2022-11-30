import type { FunctionComponent } from "react";
import { sortedProjects } from "../lib/projects";

interface ProjectSelectProps {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

const ProjectSelect: FunctionComponent<ProjectSelectProps> = ({
  placeholder,
  onChange,
  value,
}) => (
  <div className="form-control w-full md:max-w-sm">
    <select
      className="select select-primary select-bordered"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option disabled selected value="">
        {placeholder ? placeholder : `Select Project`}
      </option>
      {sortedProjects.map((project) => (
        <option key={project.name} value={project.name}>
          {project.name}
        </option>
      ))}
    </select>
  </div>
);

export { ProjectSelect };
