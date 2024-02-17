import React, { FunctionComponent, ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
