import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Contract, ethers } from "ethers";
import { Marketplace, NFT } from "../typechain-types";
import { NftCollection as INftCollection } from "../types/nft";
import { decodeMetadataUri } from "../utils/nft";
import { NFTIMPLEMENT_ABI } from "../utils/abi";
import { NftCollection, NftCollectionSkeleton } from "../components/Collection";
import { POLYGON_MUMBAI_RPC_URL } from "../utils/config";

let provider: ethers.providers.JsonRpcProvider;
if (process.env.NODE_ENV === "development") {
  provider = new ethers.providers.JsonRpcProvider(POLYGON_MUMBAI_RPC_URL);
} else {
  provider = new ethers.providers.JsonRpcProvider(POLYGON_MUMBAI_RPC_URL);
}

export default function Collection() {
  const params = useParams();
  const [collection, setCollection] = useState<INftCollection>();

  const getCollections = async (contractAddress: string) => {
    const nftContractAddr: string = contractAddress;
    const nftContract: NFT = new Contract(nftContractAddr, NFTIMPLEMENT_ABI, provider) as NFT;
    const nftsUnstruct = await nftContract.getAllNfts();

    const [name, symbol, description, author] = await Promise.all([
      nftContract.name(),
      nftContract.symbol(),
      nftContract.description(),
      nftContract.authorAddr()
    ]);

    const nftCollection: INftCollection = {
      name,
      symbol,
      description,
      author,
      nftContractAddr,
      nftsInCollection: nftsUnstruct[0].map((tokenId, index) => ({
        tokenId: tokenId.toString(),
        tokenUri: decodeMetadataUri(nftsUnstruct[1][index]),
        tokenOwner: nftsUnstruct[2][index],
        tokenPrice: nftsUnstruct[3][index].toString()
      }))
    }
    setCollection(nftCollection);
  }

  useEffect(() => {
    if (params.contractAddress) getCollections(params.contractAddress);
  }, [params.contractAddress])
  return (
    <>
      {
        collection ? (
          <NftCollection nftCollection={collection} />
        ) : (
          <NftCollectionSkeleton />
        )
      }
    </>
  )
}