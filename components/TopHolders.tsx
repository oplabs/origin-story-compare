import React, { useState } from "react";
import Image from "next/image";
import useElWidth from "../hooks/useElWidth";

export const TopHolders = ({
  data,
  contract,
}: {
  data: {
    address: string;
    tokenIds: string[];
  }[];
  contract: string;
}) => {
  const { ref, width } = useElWidth();
  const assetTemplate = `https://assets.story.xyz/${contract}/assets/xs/TOKEN_ID`;

  return (
    <div>
      <div className="text-xl font-medium mb-4 md:mb-2">Top Holders</div>
      <div className="card md:border rounded-xl border-gray-150 bg-white">
        <div className="md:m-6 grid grid-cols-7">
          <div className="text-xs text-neutral pb-4 mb-3 border-b border-gray-300 col-span-1">
            Position
          </div>
          <div className="text-xs text-neutral pb-4 mb-3 border-b border-gray-300 col-span-3">
            Holder
          </div>
          <div
            ref={ref}
            className="text-xs text-neutral pb-4 mb-3 border-b border-gray-300 col-span-3"
          >
            Tokens
          </div>
          {data?.map((d, i) => (
            <Row
              key={d.address}
              position={i + 1}
              width={width}
              address={d.address}
              tokenIds={d.tokenIds}
              last={i === data?.length - 1}
              assetTemplate={assetTemplate}
              total={d.tokenIds.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Row = ({
  address,
  position,
  total,
  last,
  assetTemplate,
  tokenIds,
  width,
}: {
  address: string;
  position: number;
  total: number;
  assetTemplate: string;
  last?: boolean;
  width: number;
  tokenIds: string[];
}) => {
  const showTokens = Math.floor(width / 30);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const profileToken = tokenIds.find((t) => !hiddenIds.includes(t));

  return (
    <>
      <div
        className={`col-span-1 flex items-center pl-4 text-xl sm:text-2xl text-primary font-medium ${
          last ? "" : "border-b border-gray-300 pb-3 mb-3 pr-3"
        }`}
      >
        {position}
      </div>
      <div
        className={`col-span-3 flex items-center text-lg sm:text-xl ${
          last ? "" : "border-b border-gray-300 pb-3 mb-3 pr-3"
        }`}
      >
        {profileToken && (
          <Image
            className="rounded-full mr-3 w-14 h-14 sm:w-16 sm:h-16 "
            src={assetTemplate.replace("TOKEN_ID", profileToken)}
            alt={address}
            height={64}
            width={64}
            onError={() => {
              setHiddenIds([...hiddenIds, profileToken]);
            }}
          />
        )}

        <div className="min-w-0 truncate hover:opacity-90 text-sm">
          <a href={`https://etherscan.io/address/${address}`}>{`${address.slice(
            0,
            5
          )}...${address.slice(-3)}`}</a>
        </div>
      </div>
      <div
        className={`col-span-3 flex items-center justify-between relative pr-4 sm:pr-10 ${
          last ? "" : "border-b border-gray-300 pb-3 mb-3"
        }`}
      >
        {tokenIds
          .filter((t) => !hiddenIds.includes(t))
          .slice(0, showTokens)
          .map((t) => (
            <div className="flex-1 relative h-8 sm:h-11" key={t}>
              <Image
                className={`absolute w-8 sm:w-11 h-8 sm:h-11 rounded-full max-w-none`}
                src={assetTemplate.replace("TOKEN_ID", t)}
                alt={t}
                height={44}
                width={44}
                onError={() => {
                  setHiddenIds([...hiddenIds, t]);
                }}
              />
            </div>
          ))}
        <div className="relative flex-1 h-8 sm:h-11">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-neutral text-neutral-content absolute flex items-center justify-center text-xs">
            {`+${total - showTokens}`}
          </div>
        </div>
      </div>
    </>
  );
};
