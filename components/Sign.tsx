import type { FunctionComponent, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({ children }) => (
  <div className="modal modal-bottom sm:modal-middle z-50">
    <div className="modal-box relative">
      <button className="btn btn-sm btn-circle absolute right-2 top-2">
        ✕
      </button>
      <div>{children}</div>
    </div>
  </div>
);

export { Modal };
