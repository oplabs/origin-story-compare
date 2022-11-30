import type { FunctionComponent, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => (
  <div className="max-w-2xl mx-auto px-6">{children}</div>
);

export { Wrapper };
