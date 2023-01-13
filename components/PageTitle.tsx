import type { FunctionComponent, ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle: FunctionComponent<PageTitleProps> = ({ children }) => (
  <h1 className="text-3xl lg:text-4xl font-medium">{children}</h1>
);

export { PageTitle };
