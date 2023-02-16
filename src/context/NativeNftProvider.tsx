import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import { NFT_STATUS } from "../utils/enums";
import { useEthConnection } from "../context/EthConnectionProvider";
import { NativeNFT } from "../typechain-types";
import { NativeNft as NativeNftDisplay, Attribute } from "../types/nativeNft";
import { dev } from "../utils/log";
import { isStringsEqualCaseInsensitive } from "../utils/string";
import { NATIVENFT_ABI } from "../utils/abi";
import { NATIVENFT_ADDR } from "../utils/config";

interface NativeNftContextProps {
  mintNativeNft: (mintAmount: BigNumber) => Promise<void>,
  progressMintNativeNft: boolean,
  numOfNativeNftsOwned: BigNumber,
  nativeNftsOwned: Array<NativeNftDisplay>,
  progressFetchNativeNfts: boolean,
  price: BigNumber,
  maxNativeNftsNum: BigNumber,
  maxMintNum: BigNumber,
  nativeNftMintedsNum: BigNumber
  progressSell: boolean,
  putForSale: (tokenId: BigNumber, priceMatic: number | string) => Promise<void>,
  cancelSale: (tokenId: BigNumber) => Promise<void>,
  progressCancel: boolean,
  nativeNftsForSaleByOthers: Array<NativeNftDisplay>,
  progressGetAllNativeNftsForSaleByOthers: boolean,
  setAllNativeNftsForSaleByOthers: () => Promise<void>,
  progressBuy: boolean,
  buyNativeNftForSale: (NativeNft: NativeNftDisplay) => Promise<void>,
  nativeNftContract: NativeNFT | null,
  nativeNftContractConn: NativeNFT | null
}

export const NativeNftContext = createContext<NativeNftContextProps>({
  mintNativeNft: async () => { },
  progressMintNativeNft: false,
  numOfNativeNftsOwned: BigNumber.from(0),
  nativeNftsOwned: [],
  progressFetchNativeNfts: false,
  price: BigNumber.from(0),
  maxNativeNftsNum: BigNumber.from(0),
  maxMintNum: BigNumber.from(0),
  nativeNftMintedsNum: BigNumber.from(0),
  progressSell: false,
  putForSale: async (tokenId, priceMatic) => { },
  cancelSale: async (tokenId) => { },
  progressCancel: false,
  nativeNftsForSaleByOthers: [],
  progressGetAllNativeNftsForSaleByOthers: true,
  setAllNativeNftsForSaleByOthers: async () => { },
  progressBuy: false,
  buyNativeNftForSale: async () => { },
  nativeNftContract: null,
  nativeNftContractConn: null
});

export const NativeNftProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, signerAddr, signer, provider } = useEthConnection();
  const [nativeNftContract, setNativeNftContract] = useState<NativeNFT | null>(null);
  const [nativeNftContractConn, setNativeNftContractConn] = useState<NativeNFT | null>(null);
  const toast = useToast();
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const [maxNativeNftsNum, setMaxNativeNftsNum] = useState<BigNumber>(BigNumber.from(0));
  const [maxMintNum, setMaxMintNum] = useState<BigNumber>(BigNumber.from(0));
  const [nativeNftMintedsNum, setNativeNftsMintedNum] = useState<BigNumber>(BigNumber.from(0));
  const [numOfNativeNftsOwned, setNumOfNativeNftsOwned] = useState<BigNumber>(BigNumber.from(0));
  const [nativeNftsOwned, setNativeNftsOwned] = useState<Array<NativeNftDisplay>>([]);
  const [progressMintNativeNft, setProgressMintNativeNft] = useState<boolean>(false);
  const [progressFetchNativeNfts, setProgressFetchNativeNfts] = useState<boolean>(false);
  const [progressSell, setProgressSell] = useState<boolean>(false);
  const [progressCancel, setProgressCancel] = useState<boolean>(false);
  const [nativeNftsForSaleByOthers, setNativeNftsForSaleByOthers] = useState<Array<NativeNftDisplay>>([]);
  const [progressGetAllNativeNftsForSaleByOthers, setProgressGetAllNativeNftsForSaleByOthers] = useState<boolean>(false);
  const [progressBuy, setProgressBuy] = useState<boolean>(false);

  // CONNECT TO CONTRACT
  useEffect(() => {
    if (!!signer && !!provider) {
      const newNativeNftContract = new ethers.Contract(NATIVENFT_ADDR, NATIVENFT_ABI, provider) as unknown as NativeNFT;
      setNativeNftContract(newNativeNftContract);
      const newNativeNftContractConn = newNativeNftContract.connect(signer);
      setNativeNftContractConn(newNativeNftContractConn);
    } else {
      setNativeNftContract(null);
      setNativeNftContractConn(null);
    }
  }, [signer, provider])

  // UPDATE LIST OF NativeNfts FOR SALE ON FIRST RENDER
  useEffect(() => {
    if (!!nativeNftContractConn) {
      setAllNativeNftsForSaleByOthers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeNftContractConn])

  // SET NUM OF NativeNfts OWNED AND NUM OF NativeNfts IN CIRCULATION AND MAX
  useEffect(() => {
    (async () => {
      if (!!nativeNftContract && !!signerAddr && signerAddr !== "") {

        const newNumOfNativeNftsOwned = await nativeNftContract.balanceOf(signerAddr);
        setNumOfNativeNftsOwned(newNumOfNativeNftsOwned);

        const newPrice = await nativeNftContract.price();
        setPrice(newPrice);

        const newMaxNativeNftsNum = await nativeNftContract.MAX_SUPPLY();
        setMaxNativeNftsNum(newMaxNativeNftsNum);

        const newMaxMintNum = await nativeNftContract.MAX_MINT_AMOUNT();
        console.log('newMaxMintNum', newMaxNativeNftsNum)
        setMaxMintNum(newMaxMintNum);

        const newMaxNativeNftsMintedNum = await nativeNftContract.totalSupply();
        setNativeNftsMintedNum(newMaxNativeNftsMintedNum);
      }
    })()
  }, [nativeNftContract, signerAddr])

  // KEEP ARRAY OF NativeNfts OWNED UPDATED
  useEffect(() => {
    (async () => {
      if (!!nativeNftContractConn) {
        try {
          setProgressFetchNativeNfts(true);
          const newNativeNftsOwnedSerialized = await nativeNftContractConn.getTokensOfOwner();
          console.log('newNativeNftsOwnedSerialized', newNativeNftsOwnedSerialized)
          const newNativeNftsOwned: NativeNftDisplay[] = await Promise.all(newNativeNftsOwnedSerialized.map(async (nftOwned) => (
            await axios.get(nftOwned.tokenUri).then(meta => (
              {
                tokenId: nftOwned.tokenId,
                name: meta.data.name,
                description: meta.data.description,
                attributes: meta.data.attributes,
                image: meta.data.image,
                price: nftOwned.price,
                owner: nftOwned.owner,
                status: nftOwned.status,
              }
            ))
          )));
          setNativeNftsOwned(newNativeNftsOwned);
        } catch (e) {
          dev.error(e);
          toast({
            title: "ERROR",
            description: "Could not fetch your NativeNfts! Please try again later.",
            status: "error"
          })
        } finally {
          setProgressFetchNativeNfts(false);
        }
      }
    })()
  }, [numOfNativeNftsOwned, nativeNftContractConn, toast])

  // Function to mint new NativeNft
  const mintNativeNft = useCallback(async (mintAmount: BigNumber) => {
    if (isConnected && !!nativeNftContractConn) {
      try {
        setProgressMintNativeNft(true);

        const txnCreateNativeNft = await nativeNftContractConn.createNFT(
          mintAmount,
          {
            value: ethers.utils.parseEther((0.1 * Number(mintAmount.toString())).toString()),
            gasLimit: 150000 * Number(mintAmount.toString())
          }
        );
        await txnCreateNativeNft.wait();
        setNumOfNativeNftsOwned((prev) => prev.add(mintAmount));
        setNativeNftsMintedNum((prev) => prev.add(mintAmount));
        toast({
          title: "MINTED",
          description: "You have successfully minted a NativeNft!",
          status: "success"
        })

      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR",
          description: "An unexpected error occured while trying to purchase!",
          status: "error"
        })
      } finally {
        setProgressMintNativeNft(false);
      }
    } else {
      toast({
        title: "WALLET NOT CONNECTED",
        description: "You need to connect your wallet first before purchasing!",
        status: "error"
      })
    }
  }, [nativeNftContractConn, isConnected, toast])

  // Function to put NativeNft for sale
  const putForSale = useCallback(async (tokenId: BigNumber, priceMatic: number | string) => {
    if (!!nativeNftContractConn) {
      try {
        setProgressSell(true);
        const price = ethers.utils.parseEther(priceMatic.toString());
        const txn = await nativeNftContractConn.putForSale(tokenId, price);
        await txn.wait();
        setNativeNftsOwned((prevNativeNftsOwned) => (
          prevNativeNftsOwned.map((prevNativeNftOwned) => (
            prevNativeNftOwned.tokenId.eq(tokenId) ? { ...prevNativeNftOwned, status: NFT_STATUS.FOR_SALE, price } : prevNativeNftOwned
          ))
        ));
        toast({
          title: "ON SALE",
          description: "Your NativeNft has been listed for sale now!",
          status: "success"
        });
      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR",
          description: "An unexpected error occured while trying to purchase!",
          status: "error"
        })
      } finally {
        setProgressSell(false);
      }
    }
  }, [nativeNftContractConn, toast])

  // Function to cancel NativeNft sale
  const cancelSale = useCallback(async (tokenId: BigNumber) => {
    if (!!nativeNftContractConn) {
      try {
        setProgressCancel(true);
        const txn = await nativeNftContractConn.cancelSale(tokenId);
        await txn.wait();
        setNativeNftsOwned((prevNativeNftsOwned) => (
          prevNativeNftsOwned.map((prevNativeNftOwned) => (
            prevNativeNftOwned.tokenId.eq(tokenId) ? { ...prevNativeNftOwned, status: NFT_STATUS.NOT_FOR_SALE } : prevNativeNftOwned
          ))
        ));
        toast({
          title: "CANCELLED",
          description: "Your NativeNft has been de-listed for sale.",
          status: "success"
        });
      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR",
          description: "An unexpected error occured while trying to cancel!",
          status: "error"
        })
      } finally {
        setProgressCancel(false);
      }
    }
  }, [nativeNftContractConn, toast])

  // Function to cancel NativeNft sale
  const buyNativeNftForSale = useCallback(async (NativeNft: NativeNftDisplay) => {
    if (!!nativeNftContractConn) {
      try {
        setProgressBuy(true);
        const txn = await nativeNftContractConn.buy(NativeNft.tokenId, { value: NativeNft.price });
        await txn.wait();
        setNativeNftsForSaleByOthers((prevNativeNftsForSaleByOthers) => prevNativeNftsForSaleByOthers.filter((prevNativeNftForSaleByOthers) => !prevNativeNftForSaleByOthers.tokenId.eq(NativeNft.tokenId)));
        setNativeNftsOwned((prevNativeNftsOwned) => ([...prevNativeNftsOwned, { ...NativeNft, status: NFT_STATUS.NOT_FOR_SALE }]));
        toast({
          title: "SUCCESSFULLY BOUGHT",
          description: "This NativeNft is now yours!",
          status: "success"
        });
      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR",
          description: "An unexpected error occured while trying to purchase!",
          status: "error"
        })
      } finally {
        setProgressBuy(false);
      }
    }
  }, [nativeNftContractConn, toast])

  // Function to cancel NativeNft sale
  const setAllNativeNftsForSaleByOthers = useCallback(async () => {
    if (!!nativeNftContractConn) {
      try {
        setProgressGetAllNativeNftsForSaleByOthers(true);
        const newNativeNftsForSaleSerialized: Array<{ tokenId: BigNumber, tokenUri: string, price: BigNumber, owner: string, status: any }> = await nativeNftContractConn.getAllNftsForSale();
        const newNativeNftsForSaleByOthers: Array<NativeNftDisplay> = newNativeNftsForSaleSerialized
          .filter((newNativeNftForSale) => !isStringsEqualCaseInsensitive(newNativeNftForSale.owner, signerAddr))
          .map((newNativeNftForSaleByOthers) => ({
            tokenId: newNativeNftForSaleByOthers.tokenId,
            owner: newNativeNftForSaleByOthers.owner,
            price: newNativeNftForSaleByOthers.price,
            status: newNativeNftForSaleByOthers.status,
            ...(JSON.parse((Buffer.from(newNativeNftForSaleByOthers.tokenUri.split("base64,")[1], "base64")).toString()))
          }));
        setNativeNftsForSaleByOthers(newNativeNftsForSaleByOthers);
      } catch (e) {
        dev.error(e);
        toast({
          title: "ERROR",
          description: "An unexpected error occured while trying to get listed NativeNfts!",
          status: "error"
        })
      } finally {
        setProgressGetAllNativeNftsForSaleByOthers(false);
      }
    }
  }, [nativeNftContractConn, toast, signerAddr])

  return (
    <NativeNftContext.Provider value={{
      mintNativeNft,
      progressMintNativeNft,
      numOfNativeNftsOwned,
      nativeNftsOwned,
      progressFetchNativeNfts,
      price,
      maxNativeNftsNum,
      maxMintNum,
      nativeNftMintedsNum,
      progressSell,
      putForSale,
      cancelSale,
      progressCancel,
      nativeNftsForSaleByOthers,
      progressGetAllNativeNftsForSaleByOthers,
      setAllNativeNftsForSaleByOthers,
      progressBuy,
      buyNativeNftForSale,
      nativeNftContract,
      nativeNftContractConn
    }}>
      {children}
    </NativeNftContext.Provider>
  )
}