import { Box, Button, Divider, Flex, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { ReactNode, useState } from "react";
import { BiPurchaseTagAlt as BuyIcon } from "react-icons/bi";
import { useEthConnection } from "../../context/EthConnectionProvider";
import useNativeNftContract from "../../hooks/useNftContract";
import logo from "../../assets/images/mint-logo.gif";

export default function Mint() {
  const {
    mintNativeNft,
    progressMintNativeNft,
    nativeNftsOwned,
    numOfNativeNftsOwned,
    progressFetchNativeNfts,
    maxNativeNftsNum,
    maxMintNum,
    nativeNftMintedsNum
  } = useNativeNftContract();
  const { isConnected } = useEthConnection();
  const [mintNum, setMintNum] = useState<number>(1);
  const highlightColor = useColorModeValue("black", "brand.500");

  return (
    <>
      {/* Mint NativeNft section */}
      <Flex as="section" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" flexDirection={{ base: "column", md: "row" }} flexWrap="nowrap">

        {/* NFT base image */}
        <Box position="relative" height={{ base: "40vh", md: "full" }} width={{ base: "full", md: "50%" }} padding={{ base: "2", md: "4" }} display="flex" alignItems="center" justifyContent="start">
          <Image
            src={logo}
            alt="NFT image of NativeNft"
            objectFit="contain"
            width={{ base: "full", md: "75%" }}
            height={{ base: "full", md: "auto" }}
            maxWidth={{ base: "auto", md: "350px" }}
            fallback={<Skeleton height="full" width="full" />}
            border='5px solid'
          />
        </Box>

        {/* Purchase and NFTs owned section */}
        <Box as="main" position="relative" minHeight={{ base: "auto", md: "full" }} width={{ base: "full", md: "50%" }} padding={{ base: "2", md: "4" }}>

          {/* Purchase */}
          <Heading size="3xl" textAlign={{ base: "center", md: "start" }}>Mint your NativeNft</Heading>
          <Text marginTop="6"><b>NativeNft</b> is a wonderful token</Text>
          <Text marginTop="6"> It has the superpower of bestowing good luck. Mint your NativeNft token and see your day instantly brighten!</Text>
          <Text color={highlightColor} marginTop="6" fontWeight={700}>Each NativeNft token you own decreases marketplace commission rate by 0.05% when making a sale!</Text>
          <Text marginTop="6" color={highlightColor} fontStyle="italic">There is an upper limit to the total number of NativeNfts that can be minted, after which the only way to get more NativeNfts is to buy them from people who have put theirs for sale!</Text>
          <Text fontSize="2xl" fontWeight={800} marginTop="6" textAlign={{ base: "center", md: "start" }}>1 NFT = 0.1 MATIC</Text>

          <Flex flexWrap="wrap" alignItems="center" gap={{ base: "4", md: "2" }} marginTop={{ base: "4", md: "2" }} width="fit-content" marginX={{ base: "auto", md: "unset" }} flexDirection={{ base: "column", md: "row" }}>
            <NumberInput value={mintNum} max={Number(maxMintNum.toString())} min={1} clampValueOnBlur={false} onChange={(val) => setMintNum(Number(val))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button leftIcon={<BuyIcon size="24" />} aria-label="Buy NativeNft for 0.1 matic" marginX={{ base: "auto", md: "unset" }} display="flex" onClick={() => mintNativeNft(BigNumber.from(mintNum))} isLoading={progressMintNativeNft} loadingText="Minting" disabled={isConnected && maxNativeNftsNum.eq(nativeNftMintedsNum)} width="fit-content">MINT</Button>

            {isConnected &&
              <Text fontSize="md" color={highlightColor} textAlign={{ base: "center", md: "start" }}>{maxNativeNftsNum.sub(nativeNftMintedsNum).toString()} out of {maxNativeNftsNum.toString()} remaining!</Text>
            }
          </Flex>
        </Box>
      </Flex>

      {/* NativeNfts owned section */}
      {isConnected &&
        <>
          <Divider marginY={{ base: "6", md: "unset" }} />
          <Box as="section" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" marginTop="2">
            <Heading size="3xl" textAlign="center" marginTop={{ base: "2", md: "unset" }}>Your NativeNfts</Heading>

            <Text marginTop={{ base: "4", md: "2" }} textAlign="center">
              {numOfNativeNftsOwned.isZero() ?
                "You don't own any NativeNfts yet!" :
                `You own ${numOfNativeNftsOwned.toString()}/${maxNativeNftsNum.toString()} NativeNfts.`
              }
            </Text>

            <Flex marginTop="6" paddingBottom="6" flexWrap="wrap">
              {progressFetchNativeNfts ?
                Array(3).fill(0).map((_, i) => (
                  <Square key={i}>
                    <Skeleton width="full" height="full" flexGrow={1} />
                  </Square>
                )) :
                nativeNftsOwned.map(({ image, tokenId, price }) => (
                  <Square key={tokenId.toString()}>
                    <Image src={`https://ipfs.io/ipfs/${image.split("ipfs://")[1]}`} alt={`NativeNft token number ${tokenId}, owned by you`} height="full" width="full" />
                    <Text position="absolute" top="4" right="6" color="gray.800">{ethers.utils.formatEther(price)} MATIC</Text>
                  </Square>
                ))
              }
            </Flex>
          </Box>
        </>
      }
    </>
  )
}

const Square = ({ children }: { children: ReactNode }) => {
  return (
    <Box position="relative" width="full" maxWidth={{ base: "full", sm: "50%", md: "33.33%" }}>
      <Box marginTop="100%" />
      <Box position="absolute" inset="2">
        {children}
      </Box>
    </Box>
  )
}