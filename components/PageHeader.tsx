import type { FunctionComponent, ReactNode } from "react";
import { Wrapper } from "./Wrapper";

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ children }) => (
  <header className="text-center space-y-4">
    <Wrapper>{children}</Wrapper>
  </header>
);

export { PageHeader };
