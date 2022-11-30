import type { FunctionComponent } from "react";
import Head from "next/head";

interface SeoProps {
  title: string;
  description: string;
}

const Seo: FunctionComponent<SeoProps> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export { Seo };
