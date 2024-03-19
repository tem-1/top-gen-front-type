import React, { FunctionComponent, ReactNode } from "react";

interface BestDivProps {
  children: ReactNode;
}

const BestDiv: FunctionComponent<BestDivProps> = ({ children }: any) => {
  return (
    <div className="container ">
      <div className="w-full grid grid-col justify-center">{children}</div>
    </div>
  );
};

export default BestDiv;
