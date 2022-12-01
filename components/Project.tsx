import type { FunctionComponent } from "react";

interface ProjectProps {
  data: object | undefined;
  loading: boolean | undefined;
}

const Project: FunctionComponent<ProjectProps> = ({ data, loading }) => {
  if (loading || (!loading && !data)) {
    return (
      <div className="card border w-full bg-gray-100 min-h-[200px] md:h-full" />
    );
  }

  return (
    <div className="card border bg-base-100 w-full min-h-[200px] p-6">
      <div className="flex">
        <div className="card border p-4">
          <div>1234</div>
          <div>Items</div>
        </div>
      </div>
    </div>
  );
};

export { Project };
