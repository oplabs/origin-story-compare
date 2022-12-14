import type { FunctionComponent } from "react";
import Head from "next/head";

interface SeoProps {
  title: string;
  ogTitle: string;
  description: string;
}

const Seo: FunctionComponent<SeoProps> = ({ title, ogTitle, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta
      property="og:image"
      content={`${
        process.env.NEXT_PUBLIC_VERCEL_URL
          ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
          : ""
      }/api/og${ogTitle ? `?title=${ogTitle}` : ""}`}
    />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export { Seo };
