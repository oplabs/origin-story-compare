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
        process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
      }/api/og?title=${ogTitle}`}
    />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export { Seo };
