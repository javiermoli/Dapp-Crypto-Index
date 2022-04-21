import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/web3";
import Layout from "../components/Layout";
import { SnackbarProvider } from "../contexts/SnackbarContext/Provider";
import { queryClient } from "../utils/reactQuery";
import { QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SnackbarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </Web3ReactProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
