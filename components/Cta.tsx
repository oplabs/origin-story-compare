import type { FunctionComponent } from "react";
import { Wrapper } from "./Wrapper";

interface CtaProps {
  heading: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
}

const Cta: FunctionComponent<CtaProps> = ({
  heading,
  subheading,
  buttonHref,
  buttonText,
}) => (
  <div className="bg-primary text-primary-content py-20 text-xs text-center">
    <Wrapper>
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium">{heading}</h2>
        {subheading && <p className="sm:text-lg">{subheading}</p>}
        {buttonText && buttonHref && (
          <div className="pt-3">
            <a
              href={buttonHref}
              className="btn md:btn-lg bg-white hover:bg-white hover:opacity-90 border-none text-primary"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </Wrapper>
  </div>
);

export { Cta };
