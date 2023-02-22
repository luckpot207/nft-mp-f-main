import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
} from '@rainbow-me/rainbowkit'
import { ChakraProvider } from "@chakra-ui/react";
import ChainContextProvider from './context/ChainContextProvider'
import theme from './theme';
import { EthConnectionProvider } from './context/EthConnectionProvider';
import { MarketplaceProvider } from './context/MarketplaceProvider';
import { NativeNftProvider } from './context/NativeNftProvider';
import supportedChains from './utils/chains'
import { BLOCKCHAIN } from './utils/enums';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  imTokenWallet,
  omniWallet,
  ledgerWallet,
  braveWallet,
  argentWallet
} from '@rainbow-me/rainbowkit/wallets';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { chains, provider } = configureChains(supportedChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || '' }),
  publicProvider(),
])

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
      imTokenWallet({ chains }),
      omniWallet({ chains }),
      ledgerWallet({ chains }),
      braveWallet({ chains }),
      argentWallet({ chains })
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

root.render(
  <React.StrictMode>
    {/* <ThirdwebProvider desiredChainId={ChainId.Mumbai}> */}
    <ChakraProvider theme={theme}>
      <EthConnectionProvider defaultNetwork={BLOCKCHAIN.PolygonTestnet}>
        <MarketplaceProvider>
          <NativeNftProvider>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains}>
                <App />
              </RainbowKitProvider>
            </WagmiConfig>
          </NativeNftProvider>
        </MarketplaceProvider>
      </EthConnectionProvider>
    </ChakraProvider>
    {/* </ThirdwebProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
