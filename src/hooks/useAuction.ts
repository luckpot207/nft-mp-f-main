import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { encode } from 'base64-arraybuffer'
import { BigNumber, BigNumberish, Contract, ethers } from "ethers";
import { Auction } from "../typechain-types";
import { NewBidEvent } from "../typechain-types/contracts/Auction";
import { AuctionData } from "../types/auction";
import { AUCTIONIMPLEMENT_ABI } from "../utils/abi";
import { dev } from "../utils/log";
import { putFileWeb3 } from "../utils/web3Storage";
import { slugify } from "../utils/string";
import { decodeMetadataUri } from "../utils/nft";
import { useEthConnection } from "../context/EthConnectionProvider";

const useAuction = (initialValue: AuctionData) => {
  const toast = useToast();
  const { signer, signerAddr, provider } = useEthConnection();
  const auctionContract = useMemo(() => (
    !!signer && !!provider ? new Contract(initialValue.auctionContractAddr, AUCTIONIMPLEMENT_ABI, signer) as Auction : null
  ), [signer, initialValue]);
  const [progressActive, setProgressActive] = useState<boolean>(false);
  const [progressBid, setProgressBid] = useState<boolean>(false);
  const [progressResolve, setProgressResolve] = useState<boolean>(false);

  // Function to make new auction
  const active = useCallback(async () => {
    if (!!auctionContract) {

      try {
        setProgressActive(true);
        const txn = await auctionContract.active();
        const rcpt = await txn.wait();

        toast({
          title: "SUCCESSFULLY ACTIVATE NEW AUCTION!",
          description: "Anyone can bid to this aution.",
          status: "success"
        });

      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR WHILE ACTIVATING!",
          description: "Your new auction could not be activated. Please try again.",
          status: "error"
        });
      } finally {
        setProgressActive(false);
      }
    }
  }, [auctionContract, toast])

  const bid = useCallback(async (value: BigNumber) => {
    if (!!auctionContract) {

      try {
        setProgressBid(true);
        const txn = await auctionContract.bid({ value });
        const rcpt = await txn.wait();
        const { args: { amount } }: NewBidEvent = rcpt.events?.find((e) => e.event === "NewBid") as NewBidEvent;


        toast({
          title: "NEW BID APPEARED!",
          description: `Now the price is updated ${amount}.`,
          status: "success"
        });

      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR WHILE BIDDING!",
          description: "Your new bid could not be run. Please try again.",
          status: "error"
        });
      } finally {
        setProgressBid(false);
      }
    }
  }, [auctionContract, toast]);

  const resolve = useCallback(async () => {
    if (!!auctionContract) {

      try {
        setProgressResolve(true);
        const txn = await auctionContract.resolve();
        await txn.wait();


        toast({
          title: "AUCTION RESOLVED",
          description: `Now the auction is resolved .`,
          status: "success"
        });

      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR WHILE RESOLVING!",
          description: "congrate",
          status: "error"
        });
      } finally {
        setProgressResolve(false);
      }
    }
  }, [auctionContract, toast]);



  return ({
    active,
    bid,
    resolve,
    progressActive,
    progressBid,
    progressResolve
  })
}

export default useAuction;