import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { CourseProvider } from "@/states/state";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CourseProvider>
      <ShoppingCartProvider>
        <Component {...pageProps} />
      </ShoppingCartProvider>
    </CourseProvider>
  );
}
