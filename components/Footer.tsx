import type { FunctionComponent } from "react";
import { Wrapper } from "./Wrapper";

const Footer: FunctionComponent = () => (
  <footer className="bg-neutral text-neutral-content py-8 text-xs text-center">
    <Wrapper>
      <p>
        © 2022 <a href="https://originprotocol.com">Origin Protocol Inc.</a> All
        rights reserved.
      </p>
    </Wrapper>
  </footer>
);

export { Footer };
