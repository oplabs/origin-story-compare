import React from "react";
import { ParentSize } from "@visx/responsive";
import { DonutChart } from "../DonutChart";

export const HolderOverlap = ({
  numberOfOwnersOfBothProjects,
  percentageOfProjectAOwnersWhoOwnProjectB,
  percentageOfProjectBOwnersWhoOwnProjectA,
  projectAName,
  projectBName,
}: {
  numberOfOwnersOfBothProjects: number;
  percentageOfProjectAOwnersWhoOwnProjectB: string;
  percentageOfProjectBOwnersWhoOwnProjectA: string;
  projectAName: string;
  projectBName?: string;
}) => {
  return (
    <div>
      <div className="text-xl font-medium md:mb-2">Holder Overlap</div>

      <div className="md:p-4 card md:border rounded-xl border-gray-150 bg-white">
        <div className="lg:flex py-4 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 text-center space-y-2 lg:space-y-4">
            <div className="rounded-full bg-gray-100 h-32 w-32 lg:h-44 lg:w-44 mx-auto flex items-center justify-center">
              <span className="text-primary font-bold text-2xl lg:text-4xl">
                {numberOfOwnersOfBothProjects}
              </span>
            </div>
            <div className="text-neutral text-xs lg:text-sm text-center">
              wallets hold both projects
            </div>
          </div>
          <div className="flex-1 space-y-2 lg:space-y-4">
            <div className="h-32 w-32 lg:h-44 lg:w-44 mx-auto flex items-center justify-center">
              <ParentSize>
                {(parent) => (
                  <DonutChart
                    data={[
                      parseInt(percentageOfProjectAOwnersWhoOwnProjectB),
                      100 - parseInt(percentageOfProjectAOwnersWhoOwnProjectB),
                    ]}
                    height={parent.height}
                    width={parent.width}
                  />
                )}
              </ParentSize>
              <span className="text-primary font-bold lg:text-2xl absolute">{`${percentageOfProjectAOwnersWhoOwnProjectB}%`}</span>
            </div>
            <div className="text-neutral text-xs lg:text-sm text-center max-w-[240px] mx-auto">
              of {projectAName} owners own {projectBName}
            </div>
          </div>
          <div className="flex-1 space-y-2 lg:space-y-4">
            <div className="h-32 w-32 lg:h-44 lg:w-44 mx-auto flex items-center justify-center">
              <ParentSize>
                {(parent) => (
                  <DonutChart
                    data={[
                      parseInt(percentageOfProjectBOwnersWhoOwnProjectA),
                      100 - parseInt(percentageOfProjectBOwnersWhoOwnProjectA),
                    ]}
                    height={parent.height}
                    width={parent.width}
                    colors={[
                      "hsl(var(--n))",
                      "rgb(243 244 246 / var(--tw-bg-opacity))",
                    ]}
                  />
                )}
              </ParentSize>
              <span className="text-neutral font-bold lg:text-2xl absolute">{`${percentageOfProjectBOwnersWhoOwnProjectA}%`}</span>
            </div>
            <div className="text-neutral text-xs lg:text-sm text-center max-w-[240px] mx-auto">
              of {projectBName} owners own {projectAName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
