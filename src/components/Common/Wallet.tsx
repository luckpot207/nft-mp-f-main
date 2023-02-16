import { useState, useContext } from "react";
import { ethers } from "ethers";

import { useOnceEffect } from "./CustomHook";
import { hasEthereum, requestAccount } from "../../utils/ethereum";
import { UserContext } from "./UserContext";

import Button from "@mui/material/Button";

export default function Wallet() {
  const userContext = useContext(UserContext);
  // UI state
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Connect wallet");

  // First load
  useOnceEffect(function () {
    async function fetchConnectedAccount() {
      if (!hasEthereum()) {
        setMessage("Install MetaMask");
        setLoading(false);
        return;
      }

      await setConnectedAccount();

      setLoading(false);
    }
    fetchConnectedAccount();
  }, []);

  // Account changes
  useOnceEffect(function () {
    async function listenMMAccount() {
      if (!hasEthereum()) return;
      window.ethereum.on("accountsChanged", async function (accounts: any) {
        if (accounts && accounts[0]) {
          setMessage(accounts[0]);
        } else {
          userContext.setConnected(false);
          setMessage("Connect wallet");
        }
      });
    }

    listenMMAccount();
  }, []);

  // Request connection to wallet
  async function requestConnection() {
    try {
      await requestAccount();
    } catch (error: any) {
      if (error.message) setMessage(error.message);
    }
  }

  // Request connection to wallet
  async function requestDisconnection() {
    try {
      userContext.setConnected(false);
      setMessage("Connect wallet");
    } catch (error: any) {
      if (error.message) setMessage(error.message);
    }
  }

  // Set address of connected wallet
  async function setConnectedAccount() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // console.log(signer);
      const address = await signer.getAddress();

      if (address) {
        userContext.setConnected(true);
        setMessage("Disconnect");
      }
    } catch {
      setMessage("Connect wallet");
    }
  }

  // Handle connect wallet click
  async function handleConnectWallet() {
    setLoading(true);
    if (userContext.connected) {
      await requestDisconnection();
    } else {
      await requestConnection();
      await setConnectedAccount();
    }

    setLoading(false);
  }

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleConnectWallet}
      disabled={message === "Install MetaMask"}
      style={{ fontFamily: "Montserrat" }}>
      {!loading ? (
        <>
          <span
            className={
              userContext.connected
                ? "rounded-full h-2 w-2 block mr-2 bg-green-500"
                : "rounded-full h-2 w-2 block mr-2 bg-red-500"
            }
          />
          {message}
        </>
      ) : (
        <span>Loading...</span>
      )}
    </Button>
  );
}
