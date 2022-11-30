import type { FunctionComponent, ReactNode } from "react";

interface PageDescriptionProps {
  children: ReactNode;
}

const PageDescription: FunctionComponent<PageDescriptionProps> = ({
  children,
}) => <p className="text-xl text-neutral">{children}</p>;

export { PageDescription };
