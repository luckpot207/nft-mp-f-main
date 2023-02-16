import { Link } from "react-router-dom";
import { Alert, AlertIcon, Box, Grid, GridItem, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import useMarketplaceContract from "../../hooks/useMarketplaceContract"
import { useEthConnection } from "../../context/EthConnectionProvider";
import { Marketplace } from "../../typechain-types";
import { decodeMetadataUri, getIpfsFileUri } from "../../utils/nft";

export function Auctions() {
  const tabTextColor = useColorModeValue("black", "brand");
  const { allNftCollections, allNftCollectionsAuthored, allNftCollectionsWhereSignerOwnsTokens, allNftCollectionsWhereTokenOnSale } = useMarketplaceContract();
  const { isConnected } = useEthConnection();

  return (

    <Tabs colorScheme={tabTextColor}>
      <TabList marginBottom="2" paddingX={{ base: "0", md: "16" }} marginTop="8">
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "sm", md: "md" }}>All</Tab>
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "sm", md: "md" }}>Authored</Tab>
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "sm", md: "md" }}>Owned</Tab>
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "sm", md: "md" }}>Sale</Tab>
      </TabList>

      {!isConnected ?
        <Alert colorScheme="brand" textAlign="center" status="warning" variant="solid">
          <AlertIcon />
          Your wallet needs to be connected to see the NFT collections!
        </Alert> :
        <>
          <TabPanels>
            <TabPanel>
              <NftCollections collections={allNftCollections} />
            </TabPanel>
            <TabPanel>
              <NftCollections collections={allNftCollectionsAuthored} />
            </TabPanel>
            <TabPanel>
              <NftCollections collections={allNftCollectionsWhereSignerOwnsTokens} />
            </TabPanel>
            <TabPanel>
              <NftCollections collections={allNftCollectionsWhereTokenOnSale} />
            </TabPanel>
          </TabPanels>
        </>
      }
    </Tabs>
  )
}

// Component for collections display
interface NftCollections {
  collections: Array<Marketplace.NftCollectionStructOutput>;
}
const NftCollections = ({ collections }: NftCollections) => {
  return (
    <Grid
      as="main"
      padding={{ base: "4", md: "8" }}
      maxWidth="5xl"
      marginX="auto"
      gap="6"
      templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
    >
      {collections.map((collection) => (
        <GridItem key={collection.nftContractAddr} as="figure" width="full" backgroundColor="white" wordBreak="break-word">
          <Link to={`/collection/${collection.nftContractAddr}`}><a>
            {collection.nftsInCollection.length > 0 ? (
              <Image alt={`${collection.name} NFT Collection - ${collection.description}`} src={getIpfsFileUri(decodeMetadataUri(collection.nftsInCollection[0].metadataUri).image as string)} width="full" />
            ) : null}
            <Box padding="4">
              <Heading as="figcaption" color="black">{collection.name}</Heading>
              <Text color="blackAlpha.500" fontWeight="700" fontSize="sm" fontStyle="italic">Author: {collection.author}</Text>
              <Text color="black" marginTop="2">{collection.description}</Text>
            </Box>
          </a></Link>
        </GridItem>
      ))}
    </Grid>
  )
}