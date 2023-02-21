import { FunctionComponent, ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Cookies from "universal-cookie";

const cookies = new Cookies();

import dynamic from "next/dynamic";

const NipCta = dynamic(() => import("./NipCta").then((mod) => mod.NipCta), {
  ssr: false,
});
interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log(cookies.get("nipCtaHidden"));
      if (cookies.get("nipCtaHidden") !== "true") {
        setShowModal(true);
      }
    }, 10000);
  }, []);

  const handleOnClose = () => {
    setShowModal(false);
    cookies.set("nipCtaHidden", "true", {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
  };

  return (
    <>
      <div className="mt-10 lg:mt-20 bg-white pb-24">
        <Header />
        <main className="">{children}</main>
      </div>
      <Footer />
      <NipCta showModal={showModal} onClose={handleOnClose} />
    </>
  );
};

export { Layout };
