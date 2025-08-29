import "@rainbow-me/rainbowkit/styles.css";
import "@justweb3/widget/styles.css";
import "./App.css";
import React from "react";
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { JustWeb3Provider, JustWeb3Button } from "@justweb3/widget";
import type { JustWeb3ProviderConfig } from "@justweb3/widget";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const App: React.FC = () => {
  const { wallets } = getDefaultWallets();

  const config = getDefaultConfig({
    appName: "creci ens",
    projectId:
      import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
    wallets: [
      ...wallets,
      {
        groupName: "Other",
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
    chains: [mainnet, sepolia],
    ssr: true,
  });

  const justweb3Config: JustWeb3ProviderConfig = {
    config: {
      domain: import.meta.env.VITE_APP_DOMAIN,
      origin: import.meta.env.VITE_APP_ORIGIN,
      signInTtl: 86400000,
    },
    networks: [
      {
        chainId: 1,
        providerUrl: import.meta.env.VITE_MAINNET_PROVIDER_URL,
      },
    ],
    enableAuth: false,
    openOnWalletConnect: true,
    allowedEns: "all",
    ensDomains: [
      {
        ensDomain: "crecimiento.eth",
        apiKey: import.meta.env.VITE_JUSTWEB3_API_KEY,
        chainId: 1,
      },
    ],
    logo: "https://justaname-bucket.s3.eu-central-1.amazonaws.com/sun-black.png",
    color: {
      primary: "hsl(216, 90%, 58%)",
      background: "hsl(0, 0%, 100%)",
      destructive: "hsl(0, 100%, 50%)",
    },
  };

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustWeb3Provider config={justweb3Config}>
            <JustWeb3Button>
              <ConnectButton />
            </JustWeb3Button>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
