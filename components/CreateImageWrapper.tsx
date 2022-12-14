import { ReactNode, FunctionComponent, useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Download } from "./Icons/Download";
import { Twitter } from "./Icons/Twitter";

interface CreateImageWrapperProps {
  children: ReactNode;
  footer?: string;
}

const CreateImageWrapper: FunctionComponent<CreateImageWrapperProps> = ({
  children,
  footer,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const cloneWrapper = useRef<HTMLDivElement>(null);

  const handleCreateImage = async () => {
    if (!imageWrapper.current || !cloneWrapper.current) return;

    const clone = imageWrapper.current.cloneNode(true) as HTMLDivElement;
    if (footer) {
      const footerElement = document.createElement("p");
      footerElement.classList.add(
        "text-xs",
        "font-medium",
        "text-neutral",
        "mt-[10px]",
        "w-full",
        "text-center"
      );
      footerElement.innerText = footer;
      clone.appendChild(footerElement);
    }
    const watermark = document.createElement("p");
    watermark.classList.add(
      "text-xs",
      "font-medium",
      "text-neutral",
      "opacity-70",
      "mt-[3px]",
      "w-full",
      "text-center"
    );
    watermark.innerText = "Data by Origin Protocol";
    clone.appendChild(watermark);
    cloneWrapper.current.appendChild(clone);

    htmlToImage
      .toPng(clone, {
        height: cloneWrapper.current.clientHeight + 40,
        width: cloneWrapper.current.clientWidth + 40,
        backgroundColor: "white",
        style: {
          margin: "20px",
          width: "100%",
        },
        cacheBust: true,
      })
      .then(async (dataUrl) => {
        await download(dataUrl, "data-by-origin-protocol.png");
        cloneWrapper?.current?.removeChild(clone);
      });
  };

  return (
    <>
      <div
        className="relative"
        onMouseOverCapture={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <div ref={imageWrapper}>{children}</div>
        {isHovering && (
          <div className="absolute h-100 w-100 top-0 left-0 bottom-0 right-0 bg-primary bg-opacity-40 flex items-center justify-center -m-3 space-x-4">
            <button
              className="btn space-x-1"
              onClick={() => console.log("test")}
            >
              <Twitter />
              <span>Share on Twitter</span>
            </button>
            <button className="btn space-x-1" onClick={handleCreateImage}>
              <Download />
              <span>Download image</span>
            </button>
          </div>
        )}
      </div>
      <div
        className="w-[600px]"
        ref={cloneWrapper}
        style={{ position: "absolute", left: "-100vw", top: "-100vh" }}
      />
    </>
  );
};

export { CreateImageWrapper };
