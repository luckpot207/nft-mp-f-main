import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Contract, ethers } from "ethers";
import { Auction } from "../../typechain-types";
import { AuctionData as IAuction } from "../../types/auction";
import { decodeMetadataUri } from "../../utils/nft";
import { AUCTIONIMPLEMENT_ABI } from "../../utils/abi";
import { NftCollectionSkeleton } from "../Collection";
import { AuctionBox } from "./AuctionBox";
import { POLYGON_MUMBAI_RPC_URL } from "../../utils/config";

let provider: ethers.providers.JsonRpcProvider;
if (process.env.NODE_ENV === "development") {
    provider = new ethers.providers.JsonRpcProvider(POLYGON_MUMBAI_RPC_URL);
} else {
    provider = new ethers.providers.JsonRpcProvider(POLYGON_MUMBAI_RPC_URL);
}

export function AuctionBoard() {
    const params = useParams();
    const [auctionData, setAuctionData] = useState<IAuction>();

    const getAuctionData = async (contractAddress: string) => {
        const auctionContractAddr: string = contractAddress;
        const nftContract: Auction = new Contract(auctionContractAddr, AUCTIONIMPLEMENT_ABI, provider) as Auction;

        const [nftId, highestBidder, highestBid, endTime, isActive, author] = await Promise.all([
            nftContract.nftId(),
            nftContract.highestBidder(),
            nftContract.highestBid(),
            nftContract.endTime(),
            nftContract.isActive(),
            nftContract.authorAddr(),
        ]);

        const auction: IAuction = {
            author,
            auctionContractAddr,
            nftId,
            highestBidder,
            highestBid,
            endTime,
            isActive
        }
        setAuctionData(auction);
    }

    useEffect(() => {
        if (params.contractAddress) getAuctionData(params.contractAddress);
    }, [params.contractAddress])
    return (
        <>
            {
                auctionData ? (
                    <AuctionBox auctionData={auctionData} />
                ) : (
                    <NftCollectionSkeleton />
                )
            }
        </>
    )
}