import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { MARKETPLACE_ABI } from "../../utils/abi";
import NftSingle from "./NftSingle";
import { NftData } from "../../utils/types";

import {
  MARKETPLACE_ADDR,
  SPACEKITTY_ADDR,
  SPACEKITTYIMGIPFS_ADDR,
  SPACEOWLS_ADDR,
  SPACEOWLIMGIPFS_ADDR,
  DRAGONDOODLE_ADDR,
  DRAGONDOODLEIMGIPFS_ADDR,
  DOODNFT_ADDR,
  DOODCATIMGIPFS_ADDR,
  DEDNFT_ADDR,
  DEDDOODIMGIPFS_ADDR,
  ELEMENTOWLS_ADDR,
  ELEMENTOWLSIMGIPFS_ADDR,
  ELEMENTDOGS_ADDR,
  ELEMENTDOGSIMGIPFS_ADDR,
  ELEMENTOCTOPUS_ADDR,
  ELEMENTOCTOPUSIMGIPFS_ADDR,
  QAF_ADDR,
  QAFIMGIPFS_ADDR,
  ROYALRATS_ADDR,
  ROYALRATSIMGIPFS_ADDR,
  CLASSICALCATS_ADDR,
  CLASSICALCATSIMGIPFS_ADDR,
  ANCIENTALIENS_ADDR,
  ANCIENTALIENSIMGIPFS_ADDR,
  PRIMORDIALPLANETOIDS_ADDR,
  PLANETOIDSIMGIPFS_ADDR,
  BADBUDDIES_ADDR,
  BADBUDDIESIMGIPFS_ADDR,
  BADBUDDIES3_ADDR,
  BADBUDDIES3IMGIPFS_ADDR,
  BADBUDDIES2IMGIPFS_ADDR,
} from "../../utils/config";


const ethers = require("ethers");

const NftGrid = () => {
  const { account } = useWeb3React();

  const [getDataLoading, setGetDataLoading] = useState(false);
  const [marketplaceArrary, setMarketplaceArray] = useState<Array<NftData>>([]);

  const [marketplaceRecentlyfilterArray, setMarketPlaceRecentlyFilterArray] = useState<Array<NftData>>([]);
  const [marketplaceSearchfilterArray, setMarketPlaceSearchFilterArray] = useState<Array<NftData>>([]);
  const [marketplaceCollectionfilterArray, setMarketPlaceCollectionFilterArray] = useState<Array<NftData>>([]);
  const [marketplaceAZfilterArray, setMarketPlaceAZFilterArray] = useState<Array<NftData>>([]);
  const [marketplaceZAfilterArray, setMarketPlaceZAFilterArray] = useState<Array<NftData>>([]);
  const [nftNameSearchState, setNftNameSearchState] = useState(false);
  const [nftCollectionsearchState, setNftCollectionSearchState] =
    useState(false);
  const [nftSortAZ, setNftSortAZ] = useState(false);
  const [nftSortZA, setNftSortZA] = useState(false);
  const [nftSortRecently, setNftSortRecently] = useState(false);
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const marketPlaceContract = new ethers.Contract(
    MARKETPLACE_ADDR,
    MARKETPLACE_ABI,
    Signer
  );

  const getNftData = async () => {
    setGetDataLoading(true);
    let nftArrary: NftData[] = [];
    await marketPlaceContract.fetchMarketItems().then((data: any) => {
      for (let i = 0; i < data.length; i++) {
        nftArrary.push({
          itemId: Number(data[i].itemId),
          nftName:
            data[i].nftContract === SPACEKITTY_ADDR
              ? "SpaceKitty # " + Number(data[i].tokenId)
              : data[i].nftContract === SPACEOWLS_ADDR
                ? "SpaceOwls # " + Number(data[i].tokenId)
                : data[i].nftContract === DRAGONDOODLE_ADDR
                  ? "Dragon Doodles # " + Number(data[i].tokenId)
                  : data[i].nftContract === DOODNFT_ADDR
                    ? "DoodCats # " + Number(data[i].tokenId)
                    : data[i].nftContract === DEDNFT_ADDR
                      ? "DedDoods # " + Number(data[i].tokenId)
                      : data[i].nftContract === ELEMENTOWLS_ADDR
                        ? "ElementOwls # " + Number(data[i].tokenId)
                        : data[i].nftContract === ELEMENTDOGS_ADDR
                          ? "ElementDogs # " + Number(data[i].tokenId)
                          : data[i].nftContract === ELEMENTOCTOPUS_ADDR
                            ? "ElementOctopus # " + Number(data[i].tokenId)
                            : data[i].nftContract === QAF_ADDR
                              ? "QAF # " + Number(data[i].tokenId)
                              : data[i].nftContract === ROYALRATS_ADDR
                                ? "Royal Rats # " + Number(data[i].tokenId)
                                : data[i].nftContract === CLASSICALCATS_ADDR
                                  ? "The Classical Cats # " + Number(data[i].tokenId)
                                  : data[i].nftContract === ANCIENTALIENS_ADDR
                                    ? "The Ancient Aliens # " + Number(data[i].tokenId)
                                    : data[i].nftContract === PRIMORDIALPLANETOIDS_ADDR
                                      ? "The Primordial Planetoids # " + Number(data[i].tokenId)
                                      : data[i].nftContract === BADBUDDIES_ADDR
                                        ? "Bad Buddies # " + Number(data[i].tokenId)
                                        : data[i].nftContract === BADBUDDIES3_ADDR
                                          ? "Bad Buddies3 # " + Number(data[i].tokenId)
                                          : "Bad Buddies2 # " + Number(data[i].tokenId),
          nftImgUrl:
            data[i].nftContract === SPACEKITTY_ADDR
              ? `${SPACEKITTYIMGIPFS_ADDR}/${Number(
                data[i].tokenId
              )}.png`
              : data[i].nftContract === SPACEOWLS_ADDR
                ? `${SPACEOWLIMGIPFS_ADDR}/${Number(
                  data[i].tokenId
                )}.png`
                : data[i].nftContract === DRAGONDOODLE_ADDR
                  ? `${DRAGONDOODLEIMGIPFS_ADDR}/${Number(
                    data[i].tokenId
                  )}.png`
                  : data[i].nftContract === DOODNFT_ADDR
                    ? `${DOODCATIMGIPFS_ADDR}/${Number(data[i].tokenId)}.png`
                    : data[i].nftContract === DEDNFT_ADDR
                      ? `${DEDDOODIMGIPFS_ADDR}/${Number(data[i].tokenId)}.png`
                      : data[i].nftContract === ELEMENTOWLS_ADDR
                        ? `${ELEMENTOWLSIMGIPFS_ADDR}/${Number(
                          data[i].tokenId
                        )}.png`
                        : data[i].nftContract === ELEMENTDOGS_ADDR
                          ? `${ELEMENTDOGSIMGIPFS_ADDR}/${Number(
                            data[i].tokenId
                          )}.png`
                          : data[i].nftContract === ELEMENTOCTOPUS_ADDR
                            ? `${ELEMENTOCTOPUSIMGIPFS_ADDR}/${Number(
                              data[i].tokenId
                            )}.png`
                            : data[i].nftContract === QAF_ADDR
                              ? `${QAFIMGIPFS_ADDR}/${Number(data[i].tokenId)}.jpg`
                              : data[i].nftContract === ROYALRATS_ADDR
                                ? `${ROYALRATSIMGIPFS_ADDR}/${Number(
                                  data[i].tokenId
                                )}.jpg`
                                : data[i].nftContract === CLASSICALCATS_ADDR
                                  ? `${CLASSICALCATSIMGIPFS_ADDR}/${Number(
                                    data[i].tokenId
                                  )}.jpg`
                                  : data[i].nftContract === ANCIENTALIENS_ADDR
                                    ? `${ANCIENTALIENSIMGIPFS_ADDR}/${Number(
                                      data[i].tokenId
                                    )}.jpg`
                                    : data[i].nftContract === PRIMORDIALPLANETOIDS_ADDR
                                      ? `${PLANETOIDSIMGIPFS_ADDR}/${Number(
                                        data[i].tokenId
                                      )}.jpg`
                                      : data[i].nftContract === BADBUDDIES_ADDR
                                        ? `${BADBUDDIESIMGIPFS_ADDR}/${Number(
                                          data[i].tokenId
                                        )}.png`
                                        : data[i].nftContract === BADBUDDIES3_ADDR
                                          ? `${BADBUDDIES3IMGIPFS_ADDR}/${Number(
                                            data[i].tokenId
                                          )}.png`
                                          : `${BADBUDDIES2IMGIPFS_ADDR}/${Number(
                                            data[i].tokenId
                                          )}.png`,
          nftContract: data[i].nftContract.toString(),
          priceAsset: data[i].priceAsset.toString(),
          tokenId: Number(data[i].tokenId),
          seller: data[i].seller.toString(),
          buyer: data[i].buyer.toString(),
          price: parseFloat(
            ethers.utils.formatEther(data[i].price.toString())
          ).toFixed(2),
          listedTime: Number(data[i].listedTime),
          isSold: data.isSold,
        });
      }
    });
    let filterArray = [];
    filterArray = nftArrary.sort((a, b) =>
      a.nftName.toLowerCase() > b.nftName.toLowerCase() ? 1 : -1
    );
    setMarketplaceArray(filterArray);
    setGetDataLoading(false);
  };

  useEffect(() => {
    account && getNftData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const nftNameFilter = (searchNft: string) => {
    let filterArray = [];
    filterArray = marketplaceArrary.filter((marketArray) =>
      marketArray.nftName.toLowerCase().includes(searchNft.toLowerCase())
        ? marketplaceArrary
        : searchNft === ""
          ? marketplaceArrary
          : ""
    );
    setMarketPlaceSearchFilterArray(filterArray);
    setNftNameSearchState(true);
    setNftCollectionSearchState(false);
    setNftSortAZ(false);
    setNftSortRecently(false);
    setNftSortZA(false);
  };

  const nftCollectionFilter = (searchNft: string) => {
    setMarketPlaceCollectionFilterArray([]);
    let filterArray = [];
    filterArray = marketplaceArrary.filter((marketArray) =>
      marketArray.nftName.toLowerCase().includes(searchNft.toLowerCase())
        ? marketplaceArrary
        : searchNft === "All NFTs"
          ? marketplaceArrary
          : ""
    );
    setMarketPlaceCollectionFilterArray(filterArray);
    setNftCollectionSearchState(true);
    setNftSortRecently(false);
    setNftNameSearchState(false);
    setNftSortZA(false);
    setNftSortAZ(false);
  };

  const nftSortbyAZ = (searchNft: string) => {
    let filterArray = [];
    if (searchNft === "Sort(A - Z)") {
      filterArray = marketplaceArrary.sort((a, b) =>
        a.nftName.toLowerCase() > b.nftName.toLowerCase() ? 1 : -1
      );
      setMarketPlaceAZFilterArray(filterArray);
      setNftSortAZ(true);
      setNftSortRecently(false);
      setNftSortZA(false);
      setNftCollectionSearchState(false);
      setNftNameSearchState(false);
    } else if (searchNft === "Sort(Z - A)") {
      filterArray = marketplaceArrary.sort((a, b) =>
        a.nftName.toLowerCase() < b.nftName.toLowerCase() ? 1 : -1
      );
      setMarketPlaceZAFilterArray(filterArray);
      setNftSortZA(true);
      setNftSortRecently(false);
      setNftSortAZ(false);
      setNftCollectionSearchState(false);
      setNftNameSearchState(false);
    } else if (searchNft === "Recently Items") {
      console.log(marketplaceArrary);
      filterArray = marketplaceArrary.sort((a, b) =>
        a.listedTime < b.listedTime ? 1 : -1
      );
      setMarketPlaceRecentlyFilterArray(filterArray);
      setNftSortRecently(true);
      setNftSortZA(false);
      setNftSortAZ(false);
      setNftCollectionSearchState(false);
      setNftNameSearchState(false);
    }
  };

  return (
    <section className="mt-5 py-15 sm:mt-10 sm:py-10">
      <div className="text-center">
        <p
          className="dark:text-white
                        font-bold
                        font-general-medium
                        mb-1 sm:text-4xl
                        text-2xl
                        text-ternary-dark
                        ">
          Buying Collections
        </p>
      </div>

      <div className="mt-7 sm:mt-7">
        <h3
          className="font-general-regular 
                      text-center text-ternary-dark
                      dark:text-white
                      text-md
                      sm:text-xl
                      mb-10
                      font-bold
                      ">
          Search nfts by name or filter by collection
        </h3>
        <div
          className=" 
                        sm:flex
                        sm:w-full
                        border-b border-primary-light
                        dark:border-gray-700
                        justify-between
                        pb-3
                        gap-3
                        ">
          <div className="flex gap-2 sm:w-1/4 w-full">
            <span
              className="
                          sm:block
                          bg-primary-light
                          dark:bg-ternary-dark
                          p-2.5
                          shadow-sm
                          rounded-xl
                          cursor-pointer
                          ">
              <SearchIcon className="dark:text-white h-5 text-ternary-dark w-5"></SearchIcon>
            </span>
            <input
              className="font-general-medium 
                          w-full
                          pl-3
                          pr-1
                          sm:px-4
                          py-2
                          border 
                          dark:border-ternary-dark  
                          rounded-lg
                          text-sm
                          sm:text-md
                          bg-secondary-light
                          dark:bg-ternary-dark
                          text-primary-dark
                          dark:text-white
                          focus:outline-none
                          "
              id="nftSearch"
              name="nftSearch"
              type="search"
              placeholder="Search NFTs"
              aria-label="Name"
              onChange={(e) => nftNameFilter(e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-3 sm:justify-end sm:mt-0 sm:w-3/4">
            <select
              className="font-general-medium 
                  sm:px-6
                  py-2
                  border 
                  border-gray-200
                  dark:border-ternary-dark
                  rounded-lg
                  text-sm
                  sm:text-md
                  dark:font-medium
                  bg-secondary-light
                  text-ternary-dark
                  dark:bg-ternary-dark
                  dark:text-white
                  outline-none
                  mx-1
            "
              onChange={(e) => nftCollectionFilter(e.target.value)}>
              <option className="sm:text-md text-normal">All NFTs </option>
              <option className="sm:text-md text-normal">SpaceKitty </option>
              <option className="sm:text-md text-normal">SpaceOwls </option>
              <option className="sm:text-md text-normal">
                Dragon Doodles{" "}
              </option>
              <option className="sm:text-md text-normal">DoodCats </option>
              <option className="sm:text-md text-normal">DedDoods </option>
              <option className="sm:text-md text-normal">ElementOwls </option>
              <option className="sm:text-md text-normal">ElementDogs </option>
              <option className="sm:text-md text-normal">
                ElementOctopus{" "}
              </option>
              <option className="sm:text-md text-normal">QAF </option>
              <option className="sm:text-md text-normal">Royal Rats </option>
              <option className="sm:text-md text-normal">
                The Classical Cats{" "}
              </option>
              <option className="sm:text-md text-normal">
                The Ancient Aliens{" "}
              </option>
              <option className="sm:text-md text-normal">
                The Primordial Planetoids{" "}
              </option>
              <option className="sm:text-md text-normal">Bad Buddies </option>
              <option className="sm:text-md text-normal">Bad Buddies2 </option>
              <option className="sm:text-md text-normal">Bad Buddies3 </option>
            </select>

            <select
              className="font-general-medium 
                  sm:px-6
                  py-2
                  border 
                  border-gray-200
                  dark:border-ternary-dark
                  rounded-lg
                  text-sm
                  sm:text-md
                  dark:font-medium
                  bg-secondary-light
                  text-ternary-dark
                  dark:bg-ternary-dark
                  dark:text-white
                  outline-none
            "
              onChange={(e) => nftSortbyAZ(e.target.value)}>
              <option className="sm:text-md text-sm">Sort(A - Z)</option>
              <option className="sm:text-md text-sm">Sort(Z - A)</option>
              <option className="sm:text-md text-sm">Recently Items</option>
            </select>
          </div>
        </div>
      </div>

      {account ? (
        <>
          {getDataLoading ? (
            <div className="flex justify-center mt-10 w-full">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {marketplaceArrary.length !== 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 mt-6 p-3 sm:gap-10 sm:grid-cols-3">
                  {nftNameSearchState ? (
                    <>
                      {" "}
                      {marketplaceSearchfilterArray.map((nftArray, index) => (
                        <NftSingle
                          key={index}
                          title={nftArray.nftName}
                          image={nftArray.nftImgUrl}
                          price={nftArray.price}
                          contractAddress={nftArray.nftContract}
                          priceAsset={nftArray.priceAsset}
                          tokenId={nftArray.tokenId} category={undefined} />
                      ))}
                    </>
                  ) : nftCollectionsearchState ? (
                    <>
                      {" "}
                      {marketplaceCollectionfilterArray.map(
                        (nftArray, index) => (
                          <NftSingle
                            key={index}
                            title={nftArray.nftName}
                            image={nftArray.nftImgUrl}
                            price={nftArray.price}
                            contractAddress={nftArray.nftContract}
                            priceAsset={nftArray.priceAsset}
                            tokenId={nftArray.tokenId} category={undefined} />
                        )
                      )}
                    </>
                  ) : nftSortAZ ? (
                    <>
                      {" "}
                      {marketplaceAZfilterArray.map((nftArray, index) => (
                        <NftSingle
                          key={index}
                          title={nftArray.nftName}
                          image={nftArray.nftImgUrl}
                          price={nftArray.price}
                          contractAddress={nftArray.nftContract}
                          priceAsset={nftArray.priceAsset}
                          tokenId={nftArray.tokenId} category={undefined} />
                      ))}
                    </>
                  ) : nftSortZA ? (
                    <>
                      {" "}
                      {marketplaceZAfilterArray.map((nftArray, index) => (
                        <NftSingle
                          key={index}
                          title={nftArray.nftName}
                          image={nftArray.nftImgUrl}
                          price={nftArray.price}
                          contractAddress={nftArray.nftContract}
                          priceAsset={nftArray.priceAsset}
                          tokenId={nftArray.tokenId} category={undefined} />
                      ))}
                    </>
                  ) : nftSortRecently ? (
                    <>
                      {" "}
                      {marketplaceRecentlyfilterArray.map((nftArray, index) => (
                        <NftSingle
                          key={index}
                          title={nftArray.nftName}
                          image={nftArray.nftImgUrl}
                          price={nftArray.price}
                          contractAddress={nftArray.nftContract}
                          priceAsset={nftArray.priceAsset}
                          tokenId={nftArray.tokenId} category={undefined} />
                      ))}
                    </>
                  ) : (
                    <>
                      {" "}
                      {marketplaceArrary.map((nftArray, index) => (
                        <NftSingle
                          key={index}
                          title={nftArray.nftName}
                          image={nftArray.nftImgUrl}
                          price={nftArray.price}
                          contractAddress={nftArray.nftContract}
                          priceAsset={nftArray.priceAsset}
                          tokenId={nftArray.tokenId} category={undefined} />
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.9,
                    delay: 0.1,
                  }}
                  className="font-general-regular 
                      text-center text-ternary-dark
                      dark:text-white
                      text-xs
                      sm:text-xs
                      pt-5
                      sm:pt-20
                      font-bold
                      ">
                  Nothing to show...
                </motion.h1>
              )}
            </>
          )}
        </>
      ) : (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.1,
          }}
          className="font-general-regular 
                      text-center text-ternary-dark
                      dark:text-white
                      text-xs
                      sm:text-xs
                      pt-5
                      sm:pt-20
                      font-bold
                      ">
          Please Connect wallet
        </motion.h1>
      )}
    </section>
  );
};

export default NftGrid;
