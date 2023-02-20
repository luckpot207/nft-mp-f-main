import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Image, Input, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { MdLibraryAdd as AddNftIcon } from "react-icons/md";
import { FaExternalLinkAlt as LinkIcon } from "react-icons/fa";
import useNftCollection from "../../hooks/useNftCollection";
import { useEthConnection } from "../../context/EthConnectionProvider";
import useNativeNftContract from "../../hooks/useNftContract";
import MintNftDialog from "../Nft/MintDialog";
import { Nft, NftCollection as INftCollection } from "../../types/nft"
import { getIpfsFileUri, getNftStatus, NftStatus } from "../../utils/nft";
import { isStringsEqualCaseInsensitive } from "../../utils/string";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";

interface NftCollection {
  nftCollection: INftCollection;
}

export function NftCollection({ nftCollection: nftCollectionInitital }: NftCollection) {
  const color = useColor();
  const fs = useFontSize();
  const textSecondryColor = useColorModeValue("gray.400", "gray.400");
  const backgroundColor = useColorModeValue("gray.700", "white");
  const { signerAddr } = useEthConnection();
  const [putNftForSaleDialogVisible, setPutNftForSaleDialogVisible] = useState<boolean>(false);
  const {
    buyNft,
    cancelSaleNft,
    nftCollection,
    progressBuy,
    progressCancel,
    progressSale,
    putForSaleNft,
    progressMint,
    mintNft
  } = useNftCollection(nftCollectionInitital, setPutNftForSaleDialogVisible);
  const putNftForSaleCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const [nftForSaleAmount, setNftForSaleAmount] = useState<string>("");
  const [nftSelected, setNftSelected] = useState<Nft>();
  const [mintNftDialogVisible, setMintNftDialogVisible] = useState<boolean>(false);
  const { numOfNativeNftsOwned } = useNativeNftContract();

  return (
    <Flex as="main" marginTop={'100px'} paddingX={"210px"} flexDirection={'column'} alignItems={'center'}  >
      <Text fontSize={fs.xl} fontFamily={'Poppins'} fontWeight={'700'} bgGradient={'linear-gradient(180deg, #F8E329 0%, rgba(235, 144, 38, 0.5) 100%)'} bgClip={'text'}>
        {nftCollection.name} <Text as="span" fontWeight="500" fontSize="4xl">({nftCollection.symbol})</Text>
      </Text>
      <Grid
        marginTop={'106px'}
        templateColumns={'repeat(3, 1fr)'}
      >
        <GridItem
          paddingX={'24px'}
          color={color.mainText}
          colSpan={2}
          fontSize={fs.smd}
          fontWeight={'500'}
          wordBreak="break-word"
        >
          <Flex flexDirection={'column'} wordBreak="break-word" alignItems={'start'}>
            <Text color={color.label}>
              ADDRESS:
            </Text>
            <Text marginTop={'10px'}>
              {nftCollection.nftContractAddr}
            </Text>
            <Text marginTop={'24px'} color={color.label}>AUTHOR: </Text>
            <Text marginTop={'10px'}>
              {nftCollection.author}
              {isStringsEqualCaseInsensitive(nftCollection.author, signerAddr) && <Text as="span" width={'100%'} fontWeight="500" textAlign={'end'}> (YOU)</Text>}
            </Text>
            <Text width={'100%'} fontSize={fs.sm} marginTop="20px" color={color.subText} textAlign={'start'}>
              {nftCollection.description}
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          fontSize={fs.smd}
          color={color.mainText}
        >
          <Grid gap="6" templateRows={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}>
            {nftCollection.nftsInCollection.map((nft) => {
              const nftStatus = getNftStatus(signerAddr, nft);
              return (
                <GridItem key={nft.tokenId.toString()} as="figure" width="full" wordBreak="break-word" display="flex" flexDirection="column">
                  <Image alt={`${nft.tokenUri.name} NFT - ${nft.tokenUri.description}`} src={getIpfsFileUri(nft.tokenUri.image as string)} width="full" fallback={<Skeleton width="full" height="20rem" />} />
                  <Box padding="4" flexGrow="1" backgroundColor={backgroundColor}>
                    <Heading as="figcaption" color={color.mainText} fontFamily='Zen Tokyo Zoo'>{nft.tokenUri.name}</Heading>
                    <Text fontWeight="700" fontSize="sm" color={textSecondryColor}>Owner: {nft.tokenOwner}</Text>
                    <Text marginTop="2" color={color.mainText}>{nft.tokenUri.description}</Text>
                  </Box>
                  <Button borderRadius={0} width="full" colorScheme="brand" disabled={(nftStatus === NftStatus.OWN_NOT_FOR_SALE || nftStatus === NftStatus.OWN_FOR_SALE) ? false : (nftStatus === NftStatus.NOT_OWN_NOT_FOR_SALE ? true : (BigNumber.from(nft.tokenId).eq(nftSelected?.tokenId ?? "-1") && (progressBuy || progressCancel || progressSale)))} onClick={async () => {
                    setNftSelected(nft);
                    switch (nftStatus) {
                      case NftStatus.OWN_FOR_SALE:
                        await cancelSaleNft(nft.tokenId);
                        break;
                      case NftStatus.OWN_NOT_FOR_SALE:
                        setPutNftForSaleDialogVisible(true);
                        break;
                      case NftStatus.NOT_OWN_FOR_SALE:
                        await buyNft(nft.tokenId);
                        break;
                    }
                  }} isLoading={BigNumber.from(nft.tokenId).eq(nftSelected?.tokenId ?? "-1") && (progressBuy || progressCancel || progressSale)}>
                    {nftStatus === NftStatus.OWN_FOR_SALE ? "Cancel" : (nftStatus === NftStatus.OWN_NOT_FOR_SALE ? "Sell" : "Buy")}
                  </Button>
                  <Text width="full" padding="2" textAlign="center" backgroundColor={nftStatus === NftStatus.NOT_OWN_NOT_FOR_SALE ? "gray.500" : (nftStatus === NftStatus.OWN_FOR_SALE ? "green.500" : "blue.400")} color="white">
                    {nftStatus === NftStatus.OWN_FOR_SALE ? "Owned; listed for sale" : (nftStatus === NftStatus.OWN_NOT_FOR_SALE ? "Owned; not for sale" : (nftStatus === NftStatus.NOT_OWN_FOR_SALE ? "On sale" : "Not for sale"))}
                    {(nftStatus === NftStatus.OWN_FOR_SALE || nftStatus === NftStatus.NOT_OWN_FOR_SALE) && ` - ${ethers.utils.formatEther(nft.tokenPrice)} MATIC`}
                  </Text>
                </GridItem>
              )
            })}
          </Grid>
        </GridItem>
      </Grid>

      {isStringsEqualCaseInsensitive(signerAddr, nftCollection.author) &&
        <Box marginTop={'63px'} color={color.subText}>
          <Flex alignItems={'end'} flexDirection={'column'}>
            <Text textAlign="center" fontWeight="500" fontSize="sm" marginTop="2">
              Only you (the collection author) can do this
            </Text>
            <Button marginTop={'10px'} color={color.mainText} maxWidth={'120px'} rightIcon={<AddNftIcon size="24" />} background={color.button2} display="flex" justifyContent="center" alignItems="center" onClick={() => { setMintNftDialogVisible(true) }} isLoading={progressMint} loadingText="Minting">
              Mint
            </Button>

          </Flex >
          <MintNftDialog mintNftDialogVisible={mintNftDialogVisible} setMintNftDialogVisible={setMintNftDialogVisible} progressMint={progressMint} mintNft={mintNft} />
        </Box>
      }


      {/* PUT FOR SALE DIALOG */}
      <AlertDialog isOpen={putNftForSaleDialogVisible} onClose={() => { setPutNftForSaleDialogVisible(false); }} leastDestructiveRef={putNftForSaleCloseButtonRef} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>

            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Put NFT for sale
            </AlertDialogHeader>

            <AlertDialogBody>

              <FormControl isRequired>
                <FormLabel>Selling price</FormLabel>
                <Input min="0" focusBorderColor="brand.500" value={nftForSaleAmount} onChange={(e) => { setNftForSaleAmount(e.target.value) }} type="number" placeholder="XX.XX (MATIC)" />
                <FormHelperText>Current marketplace commission: {3 - (numOfNativeNftsOwned.toNumber() * 0.05)}%</FormHelperText>
                <Link to="/mint"><a>
                  <Text marginTop="2" fontStyle="italic" fontWeight="600" fontSize="sm" color="brand.500">Buy more WOOFY tokens to decrease marketplace commission <LinkIcon display="inline" /></Text>
                </a></Link>
              </FormControl>

            </AlertDialogBody>

            <AlertDialogFooter gap="4">
              <Button ref={putNftForSaleCloseButtonRef} onClick={() => { setPutNftForSaleDialogVisible(false); }}>Close</Button>
              <Button colorScheme="brand" onClick={() => { putForSaleNft(nftSelected?.tokenId ?? "-1", nftForSaleAmount) }} isLoading={progressSale} loadingText="Putting for sale" disabled={progressSale || (nftForSaleAmount === "")}>
                Put for sale
              </Button>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Flex >
  )
}
