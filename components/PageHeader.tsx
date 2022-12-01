import type { FunctionComponent, ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }) => (
  <header className="text-center space-y-4 max-w-2xl mx-auto px-6">
    {children}
  </header>
);

export { PageHeader };
