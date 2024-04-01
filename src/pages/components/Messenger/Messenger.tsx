import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

const Messenger = () => {
  return (
    <FacebookProvider appId="1085395405829630" chatSupport>
      <CustomChat pageId="267523980049003" minimized={true} />
    </FacebookProvider>
  );
};

export default Messenger;
