import { ReactNode, useCallback, useRef, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertDialogFooter, Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Image, Input, Skeleton, Text, Tooltip, useTheme, useToast, Center, HStack } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { BiPurchaseTagAlt as SellIcon } from "react-icons/bi";
import { MdOutlineCancelPresentation as CancelIcon } from "react-icons/md";
import { NativeNft } from "../../types/nativeNft";
import { NFT_STATUS } from "../../utils/enums";
import useNativeNftContract from "../../hooks/useNftContract";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";


export default function SellBox() {
  const { nativeNftsOwned } = useNativeNftContract();
  const color = useColor();
  const fs = useFontSize();
  return (
    <Box as="section" marginTop={{ base: "4", md: "12" }}>
      <Heading fontSize={fs.lg} color={color.mainText} textAlign="center">Sell your NativeNfts</Heading>
      <HStack alignItems={'start'} spacing={'200px'} padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" flexDirection={{ base: "column", md: "row" }} flexWrap="nowrap">
        <ListGrid title="Unlisted" nativeNftsToDisplay={nativeNftsOwned.filter((ownedNft) => ownedNft.status === NFT_STATUS.NOT_FOR_SALE)} type="not-sell" />
        <Center height='700px'>
          <Divider orientation='vertical' border='2px solid' />
        </Center>
        <ListGrid title="For sale" nativeNftsToDisplay={nativeNftsOwned.filter((ownedNft) => ownedNft.status === NFT_STATUS.FOR_SALE)} type="sell" />
      </HStack>
    </Box>
  )
}

const ListGrid = ({ nativeNftsToDisplay, title, type }: { nativeNftsToDisplay: Array<NativeNft>, title: string, type: "sell" | "not-sell" }) => {
  const {
    progressFetchNativeNfts,
    putForSale,
    progressSell,
    cancelSale,
    progressCancel,
    nativeNftContractConn
  } = useNativeNftContract();
  const theme = useTheme();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [sellAmount, setSellAmount] = useState<string>("0");
  const [nftSelected, setNftSelected] = useState<NativeNft | null>(null);
  const toast = useToast();
  const color = useColor();
  const fs = useFontSize();
  // Handles closing sell dialog
  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
  }, [])

  // Handles confirming sale
  const handleSellButtonClick = useCallback(async () => {
    if (!!nativeNftContractConn) {
      const sellAmountNum = parseFloat(sellAmount);
      if (!isNaN(sellAmountNum) && sellAmountNum >= 0) {
        await putForSale(nftSelected?.tokenId as BigNumber, sellAmount);
        setSellAmount("0");
        handleCloseDialog();
      } else {
        toast({
          title: "ERROR",
          description: "Invalid price set! Please check and try again.",
          status: "error"
        })
      }
    }
  }, [nativeNftContractConn, sellAmount, nftSelected, toast])

  // Handles cancelling sale
  const handleCancelButtonClick = useCallback(async () => {
    if (!!nativeNftContractConn) {
      await cancelSale(nftSelected?.tokenId as BigNumber);
      handleCloseDialog();
    }
  }, [nativeNftContractConn, nftSelected, toast])

  return (
    <Box as="section" position="relative" width={{ base: "full", md: "50%" }} padding={{ base: "2", md: "4" }}>

      <Heading color={color.tabText} fontSize={fs.lg} textAlign="center" marginTop={{ base: "2", md: "unset" }}>{title}</Heading>

      <Text marginTop={{ base: "4", md: "2" }} textAlign="center">
        {nativeNftsToDisplay.length === 0 ?
          "No data to display!" :
          `${nativeNftsToDisplay.length} NFTs here.`
        }
      </Text>

      <Box display="grid" marginTop="6" columnGap="4" rowGap="12" gridTemplateColumns={{ base: `repeat(2, minmax(${theme.space["16"]}, 1fr))`, md: `repeat(3, minmax(${theme.space["16"]}, 1fr))` }}>
        {progressFetchNativeNfts ?
          Array(3).fill(0).map((_, i) => (
            <Square key={i}>
              <Skeleton width="full" height="full" flexGrow={1} position="absolute" inset="0" />
            </Square>
          )) :
          nativeNftsToDisplay.map((nft) => (
            <Box key={nft.tokenId.toString()} width="full" position="relative">
              <Tooltip aria-label={type === "not-sell" ? `Previous listed price was ${ethers.utils.formatEther(nft.price)} MATIC` : `Currently listed for ${ethers.utils.formatEther(nft.price)} MATIC`} label={type === "not-sell" ? "Previous listed price" : "Currently listed for"} placement="top">
                <Text textAlign="center" userSelect="none">{ethers.utils.formatEther(nft.price)} MATIC</Text>
              </Tooltip>
              <Image src={nft.image} alt={`${title} - WOOFY token number ${nft.tokenId}`} marginTop="2" width="full" />
              <Button colorScheme="brand" width="full" borderRadius="0" leftIcon={type === "not-sell" ? <SellIcon /> : <CancelIcon />} isLoading={(type === "not-sell" ? progressSell : progressCancel) && nftSelected?.tokenId.eq(nft.tokenId)} loadingText={type === "not-sell" ? "Selling" : "Cancelling"} onClick={() => {
                setNftSelected(nft);
                setSellAmount(ethers.utils.formatEther(nft.price));
                setDialogVisible(true);
              }}>{type === "not-sell" ? "Sell" : "Cancel"}</Button>
            </Box>
          ))
        }
      </Box>

      <AlertDialog isOpen={dialogVisible} onClose={handleCloseDialog} leastDestructiveRef={cancelButtonRef} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>

            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {type === "not-sell" ? "Put WOOFY for sale" : "De-list WOOFY from sale"}
            </AlertDialogHeader>

            <AlertDialogBody>

              {type === "not-sell" &&
                <FormControl>
                  <FormLabel>Selling price</FormLabel>
                  <Input focusBorderColor="brand.500" value={sellAmount} onChange={(e) => { setSellAmount(e.target.value) }} type="number" placeholder="XX.XX (MATIC)" />
                  <FormHelperText>Set the price <i>(in MATIC)</i> you want to sell this WOOFY for.</FormHelperText>
                </FormControl>
              }
              {!!nftSelected &&
                <Text fontStyle="italic" marginTop={type === "not-sell" ? "2" : "0"} fontSize="sm" fontWeight="600">{type === "not-sell" ? "Previously set" : "Listed for"}: {ethers.utils.formatEther(nftSelected?.price as BigNumber)} MATIC</Text>
              }
            </AlertDialogBody>

            <AlertDialogFooter gap="4">
              <Button ref={cancelButtonRef} onClick={handleCloseDialog}>Cancel</Button>
              <Button colorScheme="brand" onClick={type === "not-sell" ? handleSellButtonClick : handleCancelButtonClick} isLoading={type === "not-sell" ? progressSell : progressCancel} loadingText={type === "not-sell" ? "Listing" : "De-listing"}>{type === "not-sell" ? "List for sale" : "De-list from sale"}</Button>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Box >
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