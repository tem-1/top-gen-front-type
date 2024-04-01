import React, { FunctionComponent, ReactNode } from "react";

interface BestDivProps {
  children: ReactNode;
}

const BestDiv: FunctionComponent<BestDivProps> = ({ children }: any) => {
  return (
    <div className="container w-full">
      <div className="justify-center">{children}</div>
    </div>
  );
};

export default BestDiv;
