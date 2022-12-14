import type { FunctionComponent } from "react";
import Head from "next/head";

interface SeoProps {
  title: string;
  ogTitle: string;
  description: string;
}

const Seo: FunctionComponent<SeoProps> = ({ title, ogTitle, description }) => {
  const seoImage = `${
    process.env.NEXT_PUBLIC_VERCEL_URL
      ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
      : ""
  }/api/og${ogTitle ? `?title=${ogTitle}` : ""}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />
      <meta property="twitter:title" content={ogTitle} />
      <meta property="twitter:image" content={seoImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export { Seo };
