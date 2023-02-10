import type { FunctionComponent } from "react";
import { Wrapper } from "./Wrapper";
import { Cta } from "./Cta";

const Footer: FunctionComponent = () => (
  <>
    <Cta
      heading="Want Access to This Data?"
      subheading="We're building an NFT intelligence platform for web3 developers. Join the waitlist to be the first to hear when our APIs are ready."
      buttonText="Join waitlist"
      buttonHref="https://docs.google.com/forms/d/e/1FAIpQLScboPL5rZGRuRqgkCknnv-od29aDdiq8ULq5dkxoPs1DOgrug/viewform"
    />
    <footer className="bg-neutral text-neutral-content py-8 text-xs text-center">
      <Wrapper>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://originprotocol.com">Origin Protocol Inc.</a> All
          rights reserved.
        </p>
      </Wrapper>
    </footer>
  </>
);

export { Footer };
