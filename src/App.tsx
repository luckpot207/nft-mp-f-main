import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import { useColor } from './hooks/useColor';
import Marketplace from "./components/Marketplace";
import Header from "./pages/layout/Header"
import Footer from "./pages/layout/Footer";
import Create from "./pages/create";
import Home from "./pages/home";
import Collection from "./pages/collection";
import Collections from "./pages/collections";
import Mint from "./pages/mint";
import FAQ from "./pages/faq";
import ABOUT from "./pages/about";
import NoPage from './pages/404';
import AuctionPage from "./pages/auction";
import { Auctions, AuctionBoard, Create as AuctionCreate } from "./components/Auction";
import './App.css';

function App() {
  const color = useColor();
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <AnimatePresence>
      <Flex as="main" marginX="auto" minHeight={'100%'} background={color.background} color={textColor}
        flexDirection="column"
        className="duration-300 transition">
        <Router
        >
          <Header />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collection/:contractAddress" element={<Collection />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<ABOUT />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </Router>
        {/* <ScrollButton /> */}
      </Flex>
    </AnimatePresence>
  );
}

export default App;
