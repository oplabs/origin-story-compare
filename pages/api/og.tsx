import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { OPENSEA_API_CONTRACT_URL } from "../../lib/api";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(new URL("../../assets/Helvetica.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function handler(req: NextRequest) {
  if (!process.env.OPENSEA_KEY) {
    return;
  }

  const fontData = await font;

  const { searchParams } = new URL(req.url);

  // ?title=<title>
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Compare top NFT projects";

  // ?contract-a=<contract-a>
  const hasContractA = searchParams.has("contract-a");
  const contractA = hasContractA ? searchParams.get("contract-a") : "";

  // ?contract-b=<contract-b>
  const hasContractB = searchParams.has("contract-b");
  const contractB = hasContractB ? searchParams.get("contract-b") : "";

  if (!contractA || !contractB) {
    return;
  }

  const fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-KEY": process.env.OPENSEA_KEY,
    },
  };

  let imageA;
  let bgA;
  if (contractA) {
    const res = await fetch(
      `${OPENSEA_API_CONTRACT_URL}${contractA}`,
      fetchOptions
    );
    const json = await res.json();
    imageA = json?.image_url;
    bgA = json?.collection?.banner_image_url;
  }

  let imageB;
  let bgB;
  if (contractB) {
    const res = await fetch(
      `${OPENSEA_API_CONTRACT_URL}${contractB}`,
      fetchOptions
    );
    const json = await res.json();
    imageB = json?.image_url;
    bgB = json?.collection?.banner_image_url;
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#fff",
          height: "100%",
          width: "100%",
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
          fontFamily: "Helvetica",
          position: "relative",
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <div tw="h-full w-[50%] absolute top-0 left-0 opacity-05 flex overflow-hidden items-center justify-center">
          <img alt={contractA} src={bgA} height={722} width={3000} />
        </div>
        <div tw="h-full w-[50%] absolute top-0 right-0 opacity-05 flex overflow-hidden items-center justify-center">
          <img alt={contractB} src={bgB} height={722} width={3000} />
        </div>
        <div tw="flex items-center justify-center mb-5">
          <img
            tw="rounded-full h-36 w-36 mr-3 border"
            alt={contractA}
            src={imageA}
            height={500}
            width={500}
          />
          <span tw="mr-3 text-lg text-gray-800">vs</span>
          <img
            tw="rounded-full h-36 w-36 border"
            alt={contractB}
            src={imageB}
            height={500}
            width={500}
          />
        </div>
        <div tw="text-6xl max-w-[680px] leading-snug mb-5">{title}</div>
        <span tw="text-lg text-gray-800 mb-2">Data by</span>

        <img
          alt="Origin Protocol"
          width={101}
          height={24}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMTAxIDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzQuODk4MyAyMi42MDgyTDMwLjUxMjMgMTUuMDgwNUMzMC40MTE4IDE1LjA4MDUgMzAuMzQ4OSAxNS4wODA1IDMwLjI2MSAxNS4wODA1SDI2LjkxODJWMjIuNjA4MkgyMi41NDQ4VjAuNTUyOTUxSDMwLjI2MUMzNS42Nzc0IDAuNTUyOTUxIDM4LjkxOTcgMy40ODEwOSAzOC45MTk3IDcuOTE3MjZDMzguOTE5NyAxMC45NDU5IDM3LjQzNjggMTMuMTQ1MiAzNC43NiAxNC4yNTExTDM5Ljc5OTQgMjIuNTk1NkgzNC44OTgzVjIyLjYwODJaTTI2LjkzMDggMTEuMTcyMUgzMC44MzkxQzMzLjI2NDUgMTEuMTcyMSAzNC4zOTU1IDkuNjAxMjUgMzQuMzk1NSA3LjkyOTgzQzM0LjM5NTUgNi4xOTU1NyAzMy4yMjY4IDQuNjQ5ODIgMzAuODM5MSA0LjY0OTgySDI2LjkzMDhWMTEuMTcyMVpNNDEuODEwMiAyMi42MDgyVjAuNTUyOTUxSDQ2LjE4MzVWMjIuNTk1Nkg0MS44MTAyVjIyLjYwODJaTTY2LjQ2NjcgMjAuMzA4NEM2NS4yNzI5IDIxLjY2NTcgNjIuNjU4OSAyMy4wNDgxIDU5Ljc5MzcgMjMuMDQ4MUM1My40NTk4IDIzLjA0ODEgNDguMzU3NiAxOC4yMzQ4IDQ4LjM1NzYgMTEuNTg2OEM0OC4zNTc2IDQuOTM4ODYgNTMuNDU5OCAwLjEyNTY3MSA1OS43OTM3IDAuMTI1NjcxQzY0LjE2NjkgMC4xNjMzNzIgNjcuODI0IDIuNDI1NDUgNjkuODA5NiA1Ljk1NjhMNjUuMzM1OCA3LjEyNTUzQzY0LjE0MTggNS40OTE4MSA2MS45Njc4IDQuNDQ4NzUgNTkuNzkzNyA0LjQ0ODc1QzU1LjY3MTYgNC40NDg3NSA1Mi45MzIgNy40MTQ1OCA1Mi45MzIgMTEuNTk5NEM1Mi45MzIgMTUuOTcyOCA1NS45NjA3IDE4Ljc3NTIgNjAuMDQ1IDE4Ljc3NTJDNjMuODI3NyAxOC43NzUyIDY1LjgxMzMgMTYuNzAxNyA2Ni41MDQ1IDE0Ljk5MjVWMTQuMDVINjAuMzk2OFYxMC40ODFINzAuMjQ5NFYyMi42MDgySDY2LjQ2NjdDNjYuNDY2NyAyMC43ODU5IDY2LjUwNDUgMjAuMzQ2MSA2Ni41MDQ1IDIwLjMwODRINjYuNDY2N1pNNzMuMzI4NCAyMi42MDgyVjAuNTUyOTUxSDc3LjcwMTdWMjIuNTk1Nkg3My4zMjg0VjIyLjYwODJaTTEwMC4yODUgMC41NTI5NTFWMjIuNTk1Nkg5Ni4xNjI0TDg5Ljg5MTggMTQuMDg3N0M4Ny45MDYyIDExLjM3MzIgODUuNDgwOCA3LjkxNzI2IDg1LjQ1NTYgNy45MTcyNkg4NS40MTc5Qzg1LjM5MjcgNy45MTcyNiA4NS40NTU2IDExLjA5NjcgODUuNDU1NiAxNS40NzAxVjIyLjU4M0g4MS4wODIyVjAuNTUyOTUxSDg1LjIwNDNMOTEuNjAwOSA5LjE0ODg0QzkzLjEwODkgMTEuMTM0NSA5NS44ODYzIDE1LjA2OCA5NS45MTE0IDE1LjA2OEg5NS45NDkxQzk1Ljk4NjggMTUuMDY4IDk1LjkxMTQgMTEuNDczNyA5NS45MTE0IDcuNzY2NDZWMC41NTI5NTFIMTAwLjI4NVpNMTkuNDE1NiA1LjY4MDMyTDE1Ljg0NjYgOS4yNDkzN0MxNS45ODQ4IDkuOTUzMDkgMTYuMDYwMiAxMC43MzIzIDE2LjA2MDIgMTEuNTc0MkMxNi4wNjAyIDE2LjA4NTkgMTMuOTM2NCAxOC43ODc4IDEwLjM3OTkgMTguNzg3OEM4Ljg5Njk2IDE4Ljc4NzggNy42NTI4MSAxOC4zMTAzIDYuNzEwMjggMTcuNDA1NEwxOS4wNzYzIDUuMDM5NEMxOC43NDk1IDQuNDQ4NzUgMTguMzcyNSAzLjkwODM2IDE3Ljk0NTIgMy40MDU2OEMxNy43NjkzIDMuMTkyMDQgMTcuNTgwOCAzLjAwMzUzIDE3LjM5MjMgMi44MDI0NkMxNy4zNjcxIDIuNzc3MzMgMTcuMzQyMSAyLjc1MjIgMTcuMzE2OSAyLjcyNzA1QzE3LjI1NCAyLjY3Njc5IDE3LjIwMzggMi42MTM5NiAxNy4xNDEgMi41NjM2OEMxNS4zMzEzIDAuODc5Njk2IDEzLjAzMTUgMCAxMC4zNzk5IDBDNy4zMjYwOCAwIDQuNzEyMTIgMS4xNjg3NCAyLjgzOTYyIDMuMzkzMTFDMS4wNjc2NiA1LjQ5MTgxIDAuMTAwMDAyIDguMzk0ODEgMC4xMDAwMDIgMTEuNTc0MkMwLjEwMDAwMiAxMy42ODU2IDAuNTI3MjgzIDE1LjY3MTEgMS4zMzE1OCAxNy4zODAzTDQuOTI1NzYgMTMuNzg2MUM0LjgwMDA5IDEzLjEwNzUgNC43MzcyNSAxMi4zNjYgNC43MzcyNSAxMS41NjE4QzQuNzM3MjUgOS40ODgxNSA1LjE2NDU0IDcuODA0MTYgNS45OTM5NiA2LjU2MDAyQzYuOTc0MiA1LjExNDggOC40OTQ4MSA0LjM0ODIxIDEwLjM3OTkgNC4zNDgyMUMxMS44NTAyIDQuMzQ4MjEgMTMuMDgxOCA0LjgxMzE5IDE0LjAxMTcgNS42ODAzMkwxLjY3MDg5IDE4LjAyMTJDMi4wMTAyIDE4LjYzNyAyLjM5OTc4IDE5LjIxNTEgMi44Mzk2MiAxOS43MzAzQzIuOTI3NiAxOS44MzA4IDMuMDE1NTYgMTkuOTMxNCAzLjExNjEgMjAuMDMxOUMzLjIxNjY0IDIwLjE0NSAzLjMyOTc0IDIwLjI1ODEgMy40NDI4NSAyMC4zNzEyQzMuNDU1NDEgMjAuMzgzOCAzLjQ2Nzk4IDIwLjM5NjQgMy40ODA1NSAyMC40MDg5QzMuNTE4MjUgMjAuNDQ2NyAzLjU0MzM4IDIwLjQ4NDQgMy41ODEwOSAyMC41MDk0QzUuMzc4MTggMjIuMjE4NiA3LjcwMzA5IDIzLjEyMzQgMTAuMzc5OSAyMy4xMjM0QzEzLjQ0NjIgMjMuMTIzNCAxNi4wNjAyIDIxLjk1NDcgMTcuOTQ1MiAxOS43MzAzQzE5LjcxNzIgMTcuNjMxNiAyMC42OTc1IDE0Ljc0MTIgMjAuNjk3NSAxMS41NjE4QzIwLjY5NzUgOS40MjUzMSAyMC4yNDUgNy40MDIwMSAxOS40MTU2IDUuNjgwMzJaIiBmaWxsPSIjMDA3NEYwIi8+Cjwvc3ZnPgo="
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Helvetica",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
