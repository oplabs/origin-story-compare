import type { FunctionComponent, ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <>
    <div className="mt-20 bg-white pb-24">
      <Header />
      <main className="">{children}</main>
    </div>
    <Footer />
  </>
);

export { Layout };
