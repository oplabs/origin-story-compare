import { ReactNode, FunctionComponent, useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Download } from "./Icons/Download";
import { Twitter } from "./Icons/Twitter";
import { Loading } from "./Icons/Loading";
import { Check } from "./Icons/Check";
import { INTERNAL_API_TWITTER_URL } from "../lib/api";
interface CreateImageWrapperProps {
  children: ReactNode;
  footer?: string;
  tweetText?: string;
}

const CreateImageWrapper: FunctionComponent<CreateImageWrapperProps> = ({
  children,
  footer,
  tweetText,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [twitterStatus, setTwitterStatus] = useState<
    "" | "loading" | "success"
  >("");
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

    return await htmlToImage
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
        cloneWrapper?.current?.removeChild(clone);
        return dataUrl;
      });
  };

  const handleDownloadImage = async () => {
    const dataUrl = await handleCreateImage();
    await download(dataUrl, "data-by-origin-protocol.png");
  };

  const handleShareOnTwitter = async () => {
    // Create image
    const dataUrl = await handleCreateImage();
    // Post image to @databyorigin bot
    setTwitterStatus("loading");
    const res = await fetch(`${INTERNAL_API_TWITTER_URL}`, {
      method: "POST",
      body: JSON.stringify({
        image: dataUrl,
        tweetText: tweetText || "",
      }),
    });
    const json = await res.json();

    if (json.success) {
      const tweetId = json?.tweet?.id_str;
      if (tweetId) {
        // Open dialog for user to share on Twitter
        window.open(
          `https://twitter.com/intent/tweet?text=${tweetText} https://twitter.com/databyorigin/status/${tweetId}/photo/1`,
          "_blank"
        );
      }
      setTwitterStatus("success");
    } else {
      setTwitterStatus("");
    }
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
          <div className="absolute h-100 w-100 top-0 left-0 bottom-0 right-0 bg-primary bg-opacity-40 flex items-center justify-center -m-[4px] space-x-4">
            <button className="btn space-x-1" onClick={handleShareOnTwitter}>
              {twitterStatus === "" && <Twitter />}
              {twitterStatus === "loading" && <Loading />}
              {twitterStatus === "success" && <Check />}
              <span>Share on Twitter</span>
            </button>
            <button className="btn space-x-1" onClick={handleDownloadImage}>
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
