import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { GTM_ID, pageview } from "../lib/gtm";

interface NextWebVitalsMetric {
  id: string;
  label: string;
  name: string;
  startTime: number;
  value: number;
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "Next.js-hydration":
      return pageview();
    case "Next.js-route-change-to-render":
      return pageview();
    default:
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {GTM_ID && (
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
          }}
        />
      )}
      <Component {...pageProps} />
    </>
  );
}
