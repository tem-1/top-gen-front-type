import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { CourseProvider } from "@/states/state";
import { CategoryProvider } from "@/states/categoryState";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CategoryProvider>
      <CourseProvider>
        <ShoppingCartProvider>
          <Component {...pageProps} />
        </ShoppingCartProvider>
      </CourseProvider>
    </CategoryProvider>
  );
}
