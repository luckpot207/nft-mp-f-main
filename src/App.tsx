import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useColor } from './hooks/useColor';
import Marketplace from "./components/Marketplace";
import Header from "./pages/layout/Header"
import Footer from "./pages/layout/Footer";
import Create from "./pages/create";
import Collection from "./pages/collection";
import Collections from "./pages/collections";
import Mint from "./pages/mint";
import NoPage from './pages/404';
import AuctionPage from "./pages/auction";
import { Auctions, AuctionBoard, Create as AuctionCreate } from "./components/Auction";
import './App.css';

function App() {
  const color = useColor();
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <AnimatePresence>
      <Box as="main" marginX="auto" background={color.background} color={textColor}
        className="duration-300 transition">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/create" element={<Create />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collection/:contractAddress" element={<Collection />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/auction" element={<AuctionPage />} />
            <Route path="/auction/create" element={<AuctionCreate />} />
            <Route path="/auction/all" element={<Auctions />} />
            <Route path="/auction/id/:contractAddress" element={<AuctionBoard />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </Router>
        {/* <ScrollButton /> */}
      </Box>
    </AnimatePresence>
  );
}

export default App;
