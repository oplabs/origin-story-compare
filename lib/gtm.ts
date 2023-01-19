export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, string>[];
};

declare const window: WindowWithDataLayer;

export const pageview = () => {
  setTimeout(() => {
    console.log(window.location.href, document.title);
    window?.dataLayer?.push({
      event: 'pageview',
      pageUrl: window.location.href,
      pageTitle: document.title,
    });
  }, 500);
}