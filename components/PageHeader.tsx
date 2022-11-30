import type { FunctionComponent, ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }) => (
  <header className="text-center space-y-4">{children}</header>
);

export { PageHeader };
