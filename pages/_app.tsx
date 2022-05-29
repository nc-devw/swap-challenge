import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { AppProvider } from "@/context/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </AppProvider>
  );
}

export default MyApp;
