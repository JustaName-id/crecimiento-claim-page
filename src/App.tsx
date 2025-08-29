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
    appName: "Crecimiento",
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
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
      primary: "#FF5728",
      background: "#F2F3E1",
      destructive: "hsl(0, 100%, 50%)",
    },
  };

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustWeb3Provider config={justweb3Config}>
            <div className="app">
              <header className="header">
                <div className="header-content">
                  <div className="logo">
                    <h1>Crecimiento</h1>
                    <span className="tagline">Building Argentina Onchain</span>
                  </div>
                  <div className="connect-wrapper">
                    <JustWeb3Button>
                      <ConnectButton />
                    </JustWeb3Button>
                  </div>
                </div>
              </header>

              <main className="main">
                <section className="hero">
                  <div className="hero-content">
                    <h2 className="hero-title">
                      Connect with{" "}
                      <span className="highlight">Crecimiento.eth</span>
                    </h2>
                    <p className="hero-description">
                      Secure your ENS subname and join the movement bringing
                      Argentina onchain. Connect your wallet to get started.
                    </p>
                  </div>
                </section>

                <section className="features">
                  <div className="feature-grid">
                    <div className="feature-card">
                      <div className="feature-icon">🌟</div>
                      <h3>Secure ENS</h3>
                      <p>
                        Get your crecimiento.eth subname with full security and
                        ownership
                      </p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-icon">🚀</div>
                      <h3>Onchain Future</h3>
                      <p>
                        Be part of the movement bringing Argentina's innovation
                        onchain
                      </p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-icon">🤝</div>
                      <h3>Community</h3>
                      <p>
                        Join builders, creators, and innovators shaping the
                        future
                      </p>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
