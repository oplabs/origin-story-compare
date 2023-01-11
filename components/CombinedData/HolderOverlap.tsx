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
      <div className="text-xl font-medium mb-2">Holder Overlap</div>

      <div className="p-4 card border rounded-xl border-gray-150 bg-white">
        <div className="flex py-4 space-x-8">
          <div className="flex-1 text-center space-y-4">
            <div className="rounded-full bg-gray-100 h-44 w-44 mx-auto flex items-center justify-center">
              <span className="text-primary font-bold text-4xl">
                {numberOfOwnersOfBothProjects}
              </span>
            </div>
            <div className="text-neutral text-sm text-center">
              wallets hold both projects
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-44 w-44 mx-auto flex items-center justify-center">
              <ParentSize>
                {(parent) => (
                  <DonutChart
                    data={[
                      percentageOfProjectAOwnersWhoOwnProjectB,
                      100 - percentageOfProjectAOwnersWhoOwnProjectB,
                    ]}
                    height={parent.height}
                    width={parent.width}
                  />
                )}
              </ParentSize>
              <span className="text-primary font-bold text-2xl absolute">{`${percentageOfProjectAOwnersWhoOwnProjectB}%`}</span>
            </div>
            <div className="text-neutral text-sm text-center max-w-[240px] mx-auto">
              of {projectAName} owners own {projectBName}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-44 w-44 mx-auto flex items-center justify-center">
              <ParentSize>
                {(parent) => (
                  <DonutChart
                    data={[
                      percentageOfProjectBOwnersWhoOwnProjectA,
                      100 - percentageOfProjectAOwnersWhoOwnProjectB,
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
              <span className="text-neutral font-bold text-2xl absolute">{`${percentageOfProjectBOwnersWhoOwnProjectA}%`}</span>
            </div>
            <div className="text-neutral text-sm text-center max-w-[240px] mx-auto">
              of {projectBName} owners own {projectAName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
