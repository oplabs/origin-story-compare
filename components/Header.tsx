import type { FunctionComponent } from "react";
import Image from "next/image";
import { Wrapper } from "./Wrapper";

const Header: FunctionComponent = () => (
  <header className="text-xs mb-7">
    <Wrapper>
      <div className="flex justify-center items-center space-x-[6px]">
        <p className="text-neutral font-medium">Data by</p>
        <a
          className="text-black"
          href="https://originprotocol.com"
          title="Origin Protcol"
        >
          <Image
            src="/origin-logo.svg"
            alt="Origin Protocol"
            width={80}
            height={20}
          />
        </a>
      </div>
    </Wrapper>
  </header>
);

export { Header };
