import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Image, Input, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { MdLibraryAdd as AddNftIcon } from "react-icons/md";
import { FaExternalLinkAlt as LinkIcon } from "react-icons/fa";
import useAuction from "../../hooks/useAuction";
import { useEthConnection } from "../../context/EthConnectionProvider";
import useNativeNftContract from "../../hooks/useNftContract";
import MintNftDialog from "../Nft/MintDialog";
import { AuctionData as IAuction } from "../../types/auction"
import { isStringsEqualCaseInsensitive } from "../../utils/string";

interface AuctionProps {
  auctionData: IAuction;
}

export function AuctionBox({ auctionData }: AuctionProps) {
  const { signerAddr } = useEthConnection();
  const {
    active,
    bid,
    resolve,
    progressActive,
    progressBid,
    progressResolve,

  } = useAuction(auctionData);
  const putNftForSaleCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const [nftForSaleAmount, setNftForSaleAmount] = useState<string>("");
  const [nftSelected, setNftSelected] = useState<IAuction>();

  return (
    <Box as="main" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto">
      <Heading size="3xl" marginTop="4" fontFamily={'Zen Tokyo Zoo'}>
        {auctionData.auctionContractAddr + ':' + auctionData.nftId}
      </Heading>
      <Text marginTop="10" fontSize="sm" fontWeight="500">
        <Text as="span" fontWeight="800">ADDRESS: </Text>{auctionData.auctionContractAddr}
      </Text>
      <Text fontSize="sm" fontWeight="500">
        <Text as="span" fontWeight="800">AUTHOR: </Text>
        {auctionData.author}
        {isStringsEqualCaseInsensitive(auctionData.author, signerAddr) && <Text as="span" fontWeight="800"> (YOU)</Text>}
      </Text>
      <Text marginTop="5">
        {(auctionData.endTime).toString()}
      </Text>
      {isStringsEqualCaseInsensitive(signerAddr, auctionData.author) &&
        <Box >
          <Flex justifyContent='center'>
            <Button rightIcon={<AddNftIcon size="24" />} display="flex" justifyContent="center" alignItems="center" onClick={() => { active() }} isLoading={progressActive} loadingText="Minting">
              Active
            </Button>
          </Flex >
          <Text textAlign="center" fontWeight="500" fontSize="sm" marginTop="2">
            Only you (the auction author) can do this
          </Text>
        </Box>
      }
    </Box >
  )
}
