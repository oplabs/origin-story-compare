import type { FunctionComponent, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  showModal,
  onClose,
}) => (
  <>
    {ReactDOM.createPortal(
      <div
        className={`modal modal-bottom sm:modal-middle ${
          showModal && `modal-open`
        }`}
        onClick={() => onClose()}
      >
        <div
          className="modal-box relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-circle btn-neutral absolute right-2 top-2"
            onClick={() => onClose()}
          >
            ✕
          </button>
          <div className="sm:p-4">{children}</div>
        </div>
      </div>,
      document?.getElementsByTagName("body")["0"]
    )}
  </>
);

export { Modal };
