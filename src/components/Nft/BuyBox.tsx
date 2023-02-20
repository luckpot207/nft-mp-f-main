import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Image, Skeleton, Text, Tooltip, useTheme, useToast } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { BiPurchaseTagAlt as BuyIcon } from "react-icons/bi";
import { useEthConnection } from "../../context/EthConnectionProvider";
import useNativeNftContract from "../../hooks/useNftContract";
import { NativeNft } from "../../types/nativeNft";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";


export default function BuyBox() {
  const { nativeNftsForSaleByOthers } = useNativeNftContract();
  const { isConnected } = useEthConnection();
  const color = useColor();
  const fs = useFontSize();
  return (
    <>
      {isConnected &&
        <>
          <Box as="section" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" marginTop="2">

            <Heading fontSize={fs.xl} color={color.mainText} textAlign="center" marginTop={{ base: "2", md: "unset" }}>Buy NativeNfts</Heading>

            <Text marginTop={{ base: "4", md: "2" }} textAlign="center">
              {nativeNftsForSaleByOthers.length === 0 ?
                "No nfts are listed for sale by others" :
                `${nativeNftsForSaleByOthers.length} NFTs are on sale by others.`
              }
            </Text>

            <BuyNftsForSaleGrid />

          </Box>
        </>
      }
    </>
  )
}

const BuyNftsForSaleGrid = () => {
  const {
    progressGetAllNativeNftsForSaleByOthers,
    nativeNftsForSaleByOthers,
    buyNativeNftForSale,
    progressBuy,
    nativeNftContractConn
  } = useNativeNftContract();
  const theme = useTheme();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [woofySelected, setWoofySelected] = useState<NativeNft | null>(null);
  const toast = useToast();

  // Handles closing sell dialog
  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
  }, [])

  // Handles confirming sale
  const handleBuyButtonClick = useCallback(async () => {
    if (!!nativeNftContractConn) {
      await buyNativeNftForSale(woofySelected as NativeNft);
      handleCloseDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeNftContractConn, woofySelected, toast])

  return (
    <Box as="section" position="relative" width="full" padding={{ base: "2", md: "4" }} marginTop="6">

      <Box display="grid" marginTop="6" columnGap="4" rowGap="12" gridTemplateColumns={{ base: `repeat(2, minmax(${theme.space["16"]}, 1fr))`, md: `repeat(3, minmax(${theme.space["16"]}, 1fr))` }}>
        {progressGetAllNativeNftsForSaleByOthers ?
          Array(3).fill(0).map((_, i) => (
            <Square key={i}>
              <Skeleton width="full" height="full" flexGrow={1} position="absolute" inset="0" />
            </Square>
          )) :
          nativeNftsForSaleByOthers.map((woofyForSaleByOthers) => (
            <Box key={woofyForSaleByOthers.tokenId.toString()} width="full" position="relative">
              <Tooltip label="Price this WOOFY is selling for; non-negotiable." placement="top">
                <Text position="absolute" top="6" right="6" fontSize="lg" userSelect="none" color="black">{ethers.utils.formatEther(woofyForSaleByOthers.price)} MATIC</Text>
              </Tooltip>
              <Image src={`https://ipfs.io/ipfs/${woofyForSaleByOthers.image?.split("ipfs://")[1]}`} alt={`WOOFY token number ${woofyForSaleByOthers.tokenId}`} marginTop="2" width="full" />
              <Button colorScheme="brand" width="full" borderRadius="0" leftIcon={<BuyIcon />} isLoading={progressBuy && woofySelected?.tokenId.eq(woofyForSaleByOthers.tokenId)} loadingText="Buying" onClick={() => {
                setWoofySelected(woofyForSaleByOthers);
                setDialogVisible(true);
              }}>Buy</Button>
            </Box>
          ))
        }
      </Box>

      <AlertDialog isOpen={dialogVisible} onClose={handleCloseDialog} leastDestructiveRef={cancelButtonRef} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>

            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Buy WOOFY
            </AlertDialogHeader>

            <AlertDialogBody>
              {!!woofySelected &&
                <Text>Purchase this WOOFY for {ethers.utils.formatEther(woofySelected?.price as BigNumber)} MATIC ?</Text>
              }
            </AlertDialogBody>

            <AlertDialogFooter gap="4">
              <Button ref={cancelButtonRef} onClick={handleCloseDialog}>Cancel</Button>
              <Button colorScheme="brand" onClick={handleBuyButtonClick} isLoading={progressBuy} loadingText="Buying">Buy</Button>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Box>
  )
}

const Square = ({ children }: { children: ReactNode }) => {
  return (
    <Box position="relative">
      <Box marginTop="100%" />
      {children}
    </Box>
  )
}