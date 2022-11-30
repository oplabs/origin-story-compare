import type { FunctionComponent, ReactNode } from "react";
import { Wrapper } from "./Wrapper";
interface PageDescriptionProps {
  children: ReactNode;
}

const PageDescription: FunctionComponent<PageDescriptionProps> = ({
  children,
}) => (
  <Wrapper>
    <p className="text-xl text-neutral">{children}</p>
  </Wrapper>
);

export { PageDescription };
