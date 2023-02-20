import { Link } from "react-router-dom";
import { Alert, AlertIcon, Box, Grid, GridItem, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import useMarketplaceContract from "../../hooks/useMarketplaceContract"
import { useEthConnection } from "../../context/EthConnectionProvider";
import { Marketplace } from "../../typechain-types";
import { decodeMetadataUri, getIpfsFileUri } from "../../utils/nft";
import Collection from "../../components/Card/CollectionCard";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";

export function Collections() {
  const tabTextColor = useColorModeValue("black", "brand");
  const { allNftCollections, allNftCollectionsAuthored, allNftCollectionsWhereSignerOwnsTokens, allNftCollectionsWhereTokenOnSale } = useMarketplaceContract();
  const { isConnected } = useEthConnection();
  const color = useColor();
  const fs = useFontSize();

  return (

    <Tabs colorScheme={tabTextColor}>
      <TabList marginBottom="2" paddingX={{ base: "0", lg: "16" }} marginTop="8" color={color.mainText}>
        <Tab minWidth={{ base: "auto", lg: "24" }} _selected={{ color: color.tabText }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "md", md: "lg" }}>All</Tab>
        <Tab minWidth={{ base: "auto", lg: "24" }} _selected={{ color: color.tabText }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "md", md: "lg" }}>Authored</Tab>
        <Tab minWidth={{ base: "auto", lg: "24" }} _selected={{ color: color.tabText }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "md", md: "lg" }}>Owned</Tab>
        <Tab minWidth={{ base: "auto", lg: "24" }} _selected={{ color: color.tabText }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected} fontSize={{ base: "md", md: "lg" }}>Sale</Tab>
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
      maxWidth="5xl"
      marginX={'155px'}
      gap={'15px'}
      templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
    >
      {collections.map((collection) => (
        <GridItem colSpan={1}>
          <Collection
            collection={collection}
          />
        </GridItem>
      ))}
    </Grid>
  )
}