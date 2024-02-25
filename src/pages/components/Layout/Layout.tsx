import React, {
  FunctionComponent,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader";
import Footer from "../Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay with setTimeout
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time as needed

    // Cleanup function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? <Loader /> : <div className="w-full">{children}</div>}
      <Footer />
    </div>
  );
};

export default Layout;
