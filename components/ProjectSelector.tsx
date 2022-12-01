import { FunctionComponent, useState } from "react";
import { ProjectSelect } from "./ProjectSelect";
import { useRouter } from "next/router";
import { projects } from "../lib/projects";

interface ProjectSelectorProps {
  projectAPlaceholder?: string;
  projectBPlaceholder?: string;
}

const ProjectSelector: FunctionComponent<ProjectSelectorProps> = ({
  projectAPlaceholder,
  projectBPlaceholder,
}) => {
  const [projectA, setProjectA] = useState("");
  const [projectB, setProjectB] = useState("");
  const router = useRouter();

  return (
    <div className="flex justify-center w-full md:w-auto">
      <div className="bg-gray-100 p-5 w-full mx-6 md:w-auto md:mx-0 space-y-3 md:space-y-0 md:inline-flex md:space-x-4 rounded-lg justify-between items-center text-sm font-medium">
        <div className="flex space-x-3 items-center justify-between md:justify-start">
          <div className="text-neutral w-24 md:w-auto">Compare</div>
          <div className="w-full">
            <ProjectSelect
              placeholder={
                projectAPlaceholder ? projectAPlaceholder : "Project A"
              }
              onChange={setProjectA}
              value={projectA}
            />
          </div>
        </div>
        <div className="flex space-x-3 items-center justify-between md:justify-start">
          <div className="text-neutral w-24 md:w-auto">With</div>
          <div className="w-full">
            <ProjectSelect
              placeholder={
                projectBPlaceholder ? projectBPlaceholder : "Project B"
              }
              onChange={setProjectB}
              value={projectB}
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary whitespace-nowrap w-full md:w-[110px]"
            onClick={() => {
              const projectAAddress = projects.find(
                (project) => project.name === projectA
              )?.address;
              const projectBAddress = projects.find(
                (project) => project.name === projectB
              )?.address;
              router.push(`/${projectAAddress}/${projectBAddress}`);
            }}
          >
            Get data
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProjectSelector };
