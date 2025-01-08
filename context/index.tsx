"use client";

import { ReactNode, useContext, useState } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { projectId, wagmiAdapter } from "../config";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, base } from "@reown/appkit/networks";
import { createContext } from "vm";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("ProjectId is not defined");
}

const metadata = {
  name: "butter's dream",
  description: "AppKit Example",
  url: "http://localhost:3000/", // origin must match your domain & subdomain
  icons: ["/favicon.ico"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  // networks: [mainnet, arbitrum],
  networks: [base],
  defaultNetwork: base,
  // defaultNetwork: mainnet,
  metadata,
  features: {
    email: false,
    analytics: true,
    socials: [],
  },
  themeMode: "dark",
  debug: true,
});

function ConTextProvider({
  children,
}: // cookies,
{
  children: ReactNode;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ConTextProvider;
