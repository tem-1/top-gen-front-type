import { FunctionComponent } from "react";
import Navbar from "../Navbar/Navbar";
import { chdir } from "process";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
