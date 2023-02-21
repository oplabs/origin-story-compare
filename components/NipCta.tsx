import type { FunctionComponent } from "react";
import { Modal } from "./Modal";

interface NipCtaProps {
  showModal: boolean;
  onClose: () => void;
}

const NipCta: FunctionComponent<NipCtaProps> = ({ showModal, onClose }) => (
  <Modal showModal={showModal} onClose={onClose}>
    <div className="space-y-4 text-center">
      <h2 className="text-2xl md:text-3xl font-medium">
        Want Access to This Data?
      </h2>
      <p className="sm:text-lg">
        We&apos;re building an NFT intelligence platform for web3 developers.
        Join the waitlist to be the first to hear when our APIs are ready.
      </p>
      <div className="pt-3">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScboPL5rZGRuRqgkCknnv-od29aDdiq8ULq5dkxoPs1DOgrug/viewform"
          className="btn md:btn-lg btn-primary border-none w-full"
          target="_blank"
          rel="noreferrer"
        >
          Join waitlist
        </a>
      </div>
    </div>
  </Modal>
);

export { NipCta };
